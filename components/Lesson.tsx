import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CURRICULUM } from '../constants';
import { Level, AIMode, QuizQuestion, ChatMessage } from '../types';
import { generateLessonContent, generateQuiz, askAiTutor } from '../services/geminiService';
import QuizComponent from './QuizComponent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js';

const Lesson: React.FC = () => {
  const { levelId, lessonId } = useParams<{ levelId: string; lessonId: string }>();
  const navigate = useNavigate();
  const level = CURRICULUM.find(l => l.id === parseInt(levelId || '0'));
  const lesson = level?.topics[parseInt(lessonId || '0') - 1];

  const [aiContent, setAiContent] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([]);

  // AI Tutor State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, chatLoading, isChatOpen]);

  useEffect(() => {
    if (level && lesson) {
      handleGenerateAI(level.title, lesson, level.aiFeatures[0].type as AIMode);
    }
  }, [level, lesson]);

  const handleGenerateAI = async (levelTitle: string, topic: string, mode: AIMode) => {
    setLoading(true);
    setAiContent(null);
    setQuizQuestions(null);
    setOpenSections([0]);

    try {
      const content = await generateLessonContent(levelTitle, topic, mode);
      setAiContent(content || 'Failed to generate content.');
    } catch (error) {
      setAiContent('An error occurred while generating content.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async (levelTitle: string, topic: string) => {
    setLoading(true);
    setQuizQuestions(null);
    setAiContent(null);
    try {
      const questions = await generateQuiz(levelTitle, topic);
      setQuizQuestions(questions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !level || !lesson || !aiContent || chatLoading) return;

    const userText = chatInput;
    setChatInput('');
    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', text: userText }];
    setChatHistory(newHistory);
    setChatLoading(true);

    try {
      const response = await askAiTutor(
        level.title,
        lesson,
        aiContent,
        userText,
        chatHistory
      );
      if (response) {
        setChatHistory([...newHistory, { role: 'model', text: response }]);
      }
    } catch (error) {
      setChatHistory([...newHistory, { role: 'model', text: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const parseSections = (content: string) => {
    if (!content) return { intro: '', sections: [] };
    const parts = content.split('###');
    const intro = parts[0].trim();
    const sections = parts.slice(1).map(p => {
      const lines = p.split('\n');
      return {
        title: lines[0].trim(),
        body: lines.slice(1).join('\n').trim()
      };
    });
    return { intro, sections };
  };

  const handleDownloadPDF = () => {
    if (!aiContent || !lesson) return;

    // Create a temporary container for AI content only
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      padding: 15px;
      background: white;
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      color: #000000;
      line-height: 1.4;
      page-break-inside: avoid;
    `;

    // Add topic title
    const titleElement = document.createElement('h1');
    titleElement.textContent = lesson;
    titleElement.style.cssText = `
      font-size: 18pt;
      font-weight: bold;
      color: #000000;
      margin-bottom: 20px;
      text-align: center;
      border-bottom: 2px solid #000000;
      padding-bottom: 10px;
    `;
    tempContainer.appendChild(titleElement);

    // Add AI-generated content
    const contentContainer = document.createElement('div');
    contentContainer.style.cssText = `
      font-size: 11pt;
      color: #000000;
      line-height: 1.4;
    `;

    // Helper function to clean markdown formatting and handle tables
    const cleanMarkdown = (text: string) => {
      // Handle tables first - convert markdown tables to HTML
      const tableRegex = /\|(.+)\|[\r\n]+\|[-:| ]+\|[\r\n]+((?:\|.+\|[\r\n]+)+)/g;
      let processedText = text.replace(tableRegex, (match, headerRow, bodyRows) => {
        const headers = headerRow.split('|').map(h => h.trim()).filter(h => h);
        const body = bodyRows.trim().split('\n').map(row =>
          row.split('|').map(cell => cell.trim()).filter(cell => cell)
        );

        let html = '<table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10pt;">';

        // Add header
        html += '<thead><tr>';
        headers.forEach(header => {
          html += `<th style="border: 1px solid #000; padding: 8px; background-color: #f0f0f0; font-weight: bold;">${header}</th>`;
        });
        html += '</tr></thead>';

        // Add body
        html += '<tbody>';
        body.forEach(row => {
          html += '<tr>';
          row.forEach(cell => {
            html += `<td style="border: 1px solid #000; padding: 8px;">${cell}</td>`;
          });
          html += '</tr>';
        });
        html += '</tbody></table>';

        return html;
      });

      // Clean other markdown formatting
      processedText = processedText
        .replace(/^##\s*/gm, '') // Remove ## headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold** formatting
        .replace(/\*(.*?)\*/g, '$1') // Remove *italic* formatting
        .replace(/^\*\s*/gm, '') // Remove bullet points
        .replace(/^- /gm, '') // Remove dash bullet points
        .trim();

      return processedText;
    };

    if (parsedContent && parsedContent.sections.length > 0) {
      // Add intro if exists
      if (parsedContent.intro) {
        const introElement = document.createElement('div');
        introElement.style.cssText = `
          background: #f8fafc;
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 32px;
          border: 1px solid #e2e8f0;
          font-style: italic;
        `;
        introElement.textContent = cleanMarkdown(parsedContent.intro);
        contentContainer.appendChild(introElement);
      }

      // Add sections
      parsedContent.sections.forEach((sec, index) => {
        const sectionElement = document.createElement('div');
        sectionElement.style.cssText = `
          margin-bottom: 15px;
          page-break-inside: avoid;
        `;

        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = `${index + 1}. ${cleanMarkdown(sec.title)}`;
        sectionTitle.style.cssText = `
          font-size: 14pt;
          font-weight: bold;
          color: #000000;
          margin: 0 0 8px 0;
          padding: 0;
        `;
        sectionElement.appendChild(sectionTitle);

        const sectionBody = document.createElement('div');
        sectionBody.style.cssText = `
          margin-left: 15px;
          line-height: 1.4;
          margin-bottom: 10px;
          page-break-inside: avoid;
        `;
        sectionBody.innerHTML = cleanMarkdown(sec.body);
        sectionElement.appendChild(sectionBody);

        contentContainer.appendChild(sectionElement);
      });
    } else if (aiContent) {
      // Add direct AI content
      const contentElement = document.createElement('div');
      contentElement.style.cssText = `
        background: white;
        padding: 24px;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        line-height: 1.7;
      `;
      contentElement.innerHTML = cleanMarkdown(aiContent);
      contentContainer.appendChild(contentElement);
    }

    tempContainer.appendChild(contentContainer);

    // Add to DOM temporarily for PDF generation
    document.body.appendChild(tempContainer);

    const opt = {
      margin: 0.2,
      filename: `${lesson.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4' as const, orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(tempContainer).save().then(() => {
      // Clean up temporary element
      document.body.removeChild(tempContainer);
    });
  };

  const parsedContent = aiContent ? parseSections(aiContent) : null;

  if (!level || !lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(`/level/${levelId}`)}
            className="group flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-4 transition-standard text-sm font-bold uppercase tracking-widest"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-standard" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Level {level.id}
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">
              {parseInt(lessonId || '0')}
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">{lesson}</h1>
              <p className="text-slate-600">{level.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-16 h-16 relative mb-6">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Syncing with AI Tutor...</p>
          </div>
        ) : quizQuestions ? (
          <div className="animate-slide-up">
            <QuizComponent
              questions={quizQuestions}
              onComplete={() => setQuizQuestions(null)}
            />
          </div>
        ) : (
          <div className="animate-slide-up">
            <article className="bg-white rounded-[40px] p-8 md:p-14 shadow-sm border border-slate-200 relative mb-20 overflow-hidden lesson-content">
              {/* Header Decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                     <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">Lesson Content</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{lesson}</h1>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  disabled={!aiContent}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-standard text-sm font-bold shadow-sm ${
                    aiContent
                      ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                      : 'bg-slate-50 border border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF
                </button>
              </div>

              {parsedContent && parsedContent.sections.length > 0 ? (
                <div className="space-y-8">
                  {parsedContent.intro && (
                    <div className="prose prose-slate max-w-none text-slate-600 bg-slate-50 p-8 rounded-3xl border border-slate-100 italic">
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>{parsedContent.intro}</ReactMarkdown>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                    {parsedContent.sections.map((sec, idx) => (
                      <div key={idx} className="group border border-slate-200 rounded-3xl overflow-hidden bg-white hover:border-indigo-300 transition-standard">
                        <button
                          onClick={() => toggleSection(idx)}
                          className={`w-full flex items-center justify-between px-8 py-6 text-left transition-standard ${openSections.includes(idx) ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}
                          >
                          <span className="font-extrabold text-slate-900 text-xl group-hover:text-indigo-600 transition-standard">{sec.title}</span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-standard ${openSections.includes(idx) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 transition-transform ${openSections.includes(idx) ? 'rotate-180' : ''}`}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {openSections.includes(idx) && (
                          <div className="px-8 py-8 bg-white border-t border-slate-100">
                            <div className="prose prose-slate max-w-none text-slate-600">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{sec.body}</ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : aiContent ? (
                <div className="prose prose-slate max-w-none text-slate-600 bg-white p-6 rounded-3xl border border-slate-100">
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiContent}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center py-32 bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">သင်ခန်းစာ ရှင်းလင်းချက်များ ထွက်ပေါ်လာရန် ခဏစောင့်ပါ။</p>
                </div>
              )}

              {/* AI Features */}
              <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">AI Learning Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {level.aiFeatures.map((feat, idx) => (
                    <button
                      key={idx}
                      onClick={() => feat.type === 'QUIZ' ? handleStartQuiz(level.title, lesson) : handleGenerateAI(level.title, lesson, feat.type as AIMode)}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-standard group"
                    >
                      <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">{feat.description}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-standard" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      {/* SaaS Style AI Tutor Chatbot */}
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[100] flex flex-col items-end gap-4 sm:gap-6 pointer-events-none">
        {isChatOpen && (
          <div className="w-[calc(100vw-2rem)] sm:w-[380px] md:w-[480px] h-[calc(100vh-8rem)] sm:h-[650px] max-h-[85vh] bg-white rounded-[24px] sm:rounded-[32px] shadow-[0_32px_64px_-12px_rgba(16,24,40,0.2)] border border-slate-200 overflow-hidden flex flex-col pointer-events-auto animate-slide-up">
            <div className="bg-slate-900 px-8 py-6 flex items-center justify-between text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-lg">
                  <span className="text-xl font-black">AI</span>
                </div>
                <div>
                  <h3 className="font-bold text-base">NSLO Tutor</h3>
                  <p className="text-[10px] opacity-60 uppercase font-black tracking-widest text-indigo-400">Always Active</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-standard">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow p-6 space-y-6 overflow-y-auto bg-slate-50/30 no-scrollbar">
              {chatHistory.length === 0 && (
                <div className="text-center py-20 px-8">
                  <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-md border border-slate-100">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                     </svg>
                  </div>
                  <h4 className="text-slate-900 font-extrabold text-lg mb-2">How can I help you today?</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Ask me anything about this lesson!
                  </p>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                  <div className={`max-w-[90%] px-6 py-4 rounded-[24px] text-sm shadow-sm ${
                    msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none font-medium'
                  }`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-4 rounded-[24px] rounded-tl-none shadow-sm border border-slate-200 flex gap-2 items-center">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">Generating...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-[20px] pl-6 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-standard"
                  disabled={chatLoading}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className="absolute right-2 bg-indigo-600 text-white w-10 h-10 rounded-[14px] flex items-center justify-center hover:bg-indigo-700 disabled:opacity-30 transition-standard active:scale-90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-slate-900 rounded-[24px] shadow-2xl flex items-center justify-center text-white hover:bg-black hover:scale-110 active:scale-95 transition-all pointer-events-auto group relative border-4 border-white"
        >
          {isChatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>
          )}
          {/* Tooltip */}
          {!isChatOpen && (
            <span className="absolute right-20 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-standard pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
              AI TUTOR
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Lesson;

