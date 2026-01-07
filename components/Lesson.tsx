import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CURRICULUM } from '../constants';
import { Level, AIMode, QuizQuestion, ChatMessage } from '../types';
import { generateLessonContent, generateQuiz, askAiTutor } from '../services/geminiService';
import QuizComponent from './QuizComponent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js';

const markdownComponents = {
  table: ({ children, ...props }) => (
    <table className="min-w-full border border-slate-600 rounded-lg overflow-hidden bg-slate-900" {...props}>
      {children}
    </table>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-slate-800" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-slate-700" {...props}>
      {children}
    </tbody>
  ),
  th: ({ children, ...props }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-transparent transition-none" {...props}>
      {children}
    </tr>
  ),
  td: ({ children, ...props }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300" {...props}>
      {children}
    </td>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-white font-bold" {...props}>
      {children}
    </strong>
  ),
};

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
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Lesson not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-950/80 backdrop-blur-lg border-b border-white/5 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(`/level/${levelId}`)}
            className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-4 transition-all text-sm font-medium tracking-wider"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Level {level.id}
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30">
              {parseInt(lessonId || '0')}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{lesson}</h1>
              <p className="text-slate-400">{level.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-16 h-16 relative mb-6">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 font-medium tracking-widest text-xs animate-pulse">Syncing with AI Tutor...</p>
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
            <article className="bg-gradient-to-br from-slate-900 to-slate-800/50 rounded-3xl p-8 md:p-14 border border-white/5 shadow-2xl relative mb-20 overflow-hidden">
              {/* Header Decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/20">Lesson Content</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{lesson}</h1>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  disabled={!aiContent}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all text-sm font-medium ${
                    aiContent
                      ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-blue-500/30'
                      : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF
                </button>
              </div>

              {parsedContent && parsedContent.sections.length > 0 ? (
                <div className="space-y-6">
                  {parsedContent.intro && (
                    <div className="prose prose-invert max-w-none text-slate-300 bg-white/5 p-8 rounded-2xl border border-white/10 italic">
                       <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{parsedContent.intro}</ReactMarkdown>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    {parsedContent.sections.map((sec, idx) => (
                      <div key={idx} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all">
                        <button
                          onClick={() => toggleSection(idx)}
                          className={`w-full flex items-center justify-between px-6 py-5 text-left transition-all ${openSections.includes(idx) ? 'bg-white/10' : 'hover:bg-white/5'}`}
                          >
                          <span className="font-semibold text-white text-lg group-hover:text-blue-400 transition-all">{sec.title}</span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openSections.includes(idx) ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 transition-transform ${openSections.includes(idx) ? 'rotate-180' : ''}`}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {openSections.includes(idx) && (
                          <div className="px-6 py-6 bg-slate-900/50 border-t border-white/5">
                            <div className="prose prose-invert max-w-none text-slate-300">
                              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{sec.body}</ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : aiContent ? (
                <div className="prose prose-invert max-w-none text-slate-300 bg-white/5 p-6 rounded-2xl border border-white/10">
                   <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{aiContent}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center py-32 bg-white/5 rounded-3xl border-2 border-dashed border-white/10">
                  <p className="text-slate-400 font-medium">သင်ခန်းစာ ရှင်းလင်းချက်များ ထွက်ပေါ်လာရန် ခဏစောင့်ပါ။</p>
                </div>
              )}

              {/* AI Features */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">AI Learning Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {level.aiFeatures.map((feat, idx) => (
                    <button
                      key={idx}
                      onClick={() => feat.type === 'QUIZ' ? handleStartQuiz(level.title, lesson) : handleGenerateAI(level.title, lesson, feat.type as AIMode)}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all group"
                    >
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-all">{feat.description}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      {/* Premium AI Tutor Chatbot */}
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[100] flex flex-col items-end gap-4 sm:gap-6 pointer-events-none">
        {isChatOpen && (
          <div className="w-[calc(100vw-2rem)] sm:w-[380px] md:w-[480px] h-[calc(100vh-8rem)] sm:h-[650px] max-h-[85vh] bg-slate-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col pointer-events-auto animate-slide-up">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-lg font-bold text-white">AI</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">NSLO Tutor</h3>
                  <p className="text-[10px] text-blue-400 uppercase font-medium tracking-wider">Always Active</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-slate-950 no-scrollbar">
              {chatHistory.length === 0 && (
                <div className="text-center py-20 px-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                     </svg>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">How can I help you today?</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Ask me anything about this lesson!
                  </p>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                  <div className={`max-w-[85%] px-5 py-4 rounded-2xl text-sm ${
                    msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-tr-none'
                    : 'bg-white/10 text-slate-200 border border-white/10 rounded-tl-none'
                  }`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-5 py-4 rounded-2xl rounded-tl-none flex gap-2 items-center border border-white/10">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 ml-2 uppercase tracking-wider">Generating...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-5 bg-slate-900 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-5 pr-14 py-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  disabled={chatLoading}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className="absolute right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-30 transition-all active:scale-95"
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
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl shadow-blue-500/30 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all pointer-events-auto group relative border-2 border-white/10"
        >
          {isChatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-slate-900 animate-pulse"></span>
            </div>
          )}
          {/* Tooltip */}
          {!isChatOpen && (
            <span className="absolute right-16 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
              AI TUTOR
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Lesson;

