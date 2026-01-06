
import React, { useState, useEffect, useRef } from 'react';
import { generateTypingText } from '../services/geminiService';

interface KeyConfig {
  label: string;
  width?: string;
  shiftLabel?: string;
  isSpecial?: boolean;
}

const EN_LAYOUT: KeyConfig[][] = [
  [
    { label: '`', shiftLabel: '~' }, { label: '1', shiftLabel: '!' }, { label: '2', shiftLabel: '@' }, { label: '3', shiftLabel: '#' }, { label: '4', shiftLabel: '$' }, { label: '5', shiftLabel: '%' }, { label: '6', shiftLabel: '^' }, { label: '7', shiftLabel: '&' }, { label: '8', shiftLabel: '*' }, { label: '9', shiftLabel: '(' }, { label: '0', shiftLabel: ')' }, { label: '-', shiftLabel: '_' }, { label: '=', shiftLabel: '+' }, { label: 'Bksp', width: 'w-12 md:w-20', isSpecial: true }
  ],
  [
    { label: 'Tab', width: 'w-10 md:w-14', isSpecial: true }, { label: 'q' }, { label: 'w' }, { label: 'e' }, { label: 'r' }, { label: 't' }, { label: 'y' }, { label: 'u' }, { label: 'i' }, { label: 'o' }, { label: 'p' }, { label: '[', shiftLabel: '{' }, { label: ']', shiftLabel: '}' }, { label: '\\', shiftLabel: '|' }
  ],
  [
    { label: 'Caps', width: 'w-12 md:w-16', isSpecial: true }, { label: 'a' }, { label: 's' }, { label: 'd' }, { label: 'f' }, { label: 'g' }, { label: 'h' }, { label: 'j' }, { label: 'k' }, { label: 'l' }, { label: ';', shiftLabel: ':' }, { label: "'", shiftLabel: '"' }, { label: 'Enter', width: 'w-14 md:w-20', isSpecial: true }
  ],
  [
    { label: 'Shift', width: 'w-14 md:w-24', isSpecial: true }, { label: 'z' }, { label: 'x' }, { label: 'c' }, { label: 'v' }, { label: 'b' }, { label: 'n' }, { label: 'm' }, { label: ',', shiftLabel: '<' }, { label: '.', shiftLabel: '>' }, { label: '/', shiftLabel: '?' }, { label: 'Shift', width: 'w-14 md:w-24', isSpecial: true }
  ],
  [
    { label: 'Ctrl', width: 'w-10', isSpecial: true }, { label: 'Win', isSpecial: true }, { label: 'Alt', isSpecial: true }, { label: ' ', width: 'w-32 md:w-64', isSpecial: true }, { label: 'Alt', isSpecial: true }, { label: 'Fn', isSpecial: true }, { label: 'Ctrl', width: 'w-10', isSpecial: true }
  ]
];

const MY_LAYOUT: KeyConfig[][] = [
  [
    { label: '`', shiftLabel: '~' }, { label: '၁', shiftLabel: '!' }, { label: '၂', shiftLabel: '@' }, { label: '၃', shiftLabel: '#' }, { label: '၄', shiftLabel: '$' }, { label: '၅', shiftLabel: '%' }, { label: '၆', shiftLabel: '^' }, { label: '၇', shiftLabel: '&' }, { label: '၈', shiftLabel: '*' }, { label: '၉', shiftLabel: '(' }, { label: '၀', shiftLabel: ')' }, { label: '-', shiftLabel: '_' }, { label: '=', shiftLabel: '+' }, { label: 'Bksp', width: 'w-12 md:w-20', isSpecial: true }
  ],
  [
    { label: 'Tab', width: 'w-10 md:w-14', isSpecial: true }, { label: 'ဆ', shiftLabel: 'ဈ' }, { label: 'တ', shiftLabel: 'ဝ' }, { label: 'န', shiftLabel: 'ဣ' }, { label: 'မ', shiftLabel: 'ဤ' }, { label: 'အ', shiftLabel: 'ဧ' }, { label: 'ပ', shiftLabel: 'ဥ' }, { label: 'က', shiftLabel: 'ဦ' }, { label: 'င', shiftLabel: 'ဧ' }, { label: 'သ', shiftLabel: 'သ' }, { label: 'စ', shiftLabel: 'စ' }, { label: '[', shiftLabel: '{' }, { label: ']', shiftLabel: '}' }, { label: '\\', shiftLabel: '|' }
  ],
  [
    { label: 'Caps', width: 'w-12 md:w-16', isSpecial: true }, { label: 'ေ', shiftLabel: 'ဗ' }, { label: 'ါ', shiftLabel: 'ှ' }, { label: 'ိ', shiftLabel: 'ီ' }, { label: '်', shiftLabel: 'ှ' }, { label: 'ု', shiftLabel: 'ူ' }, { label: 'ွ', shiftLabel: 'ွ' }, { label: 'န', shiftLabel: 'ည' }, { label: 'သ', shiftLabel: 'ဿ' }, { label: 'း', shiftLabel: 'ဒ' }, { label: 'ဒ', shiftLabel: 'ဓ' }, { label: "'", shiftLabel: '"' }, { label: 'Enter', width: 'w-14 md:w-20', isSpecial: true }
  ],
  [
    { label: 'Shift', width: 'w-14 md:w-24', isSpecial: true }, { label: 'ဖ', shiftLabel: 'ဿ' }, { label: 'ထ', shiftLabel: 'ဋ' }, { label: 'ခ', shiftLabel: 'ဌ' }, { label: 'လ', shiftLabel: 'ဠ' }, { label: 'ဘ', shiftLabel: 'ယ' }, { label: 'ည', shiftLabel: 'ဉ' }, { label: 'ာ', shiftLabel: 'ါ' }, { label: '၊', shiftLabel: '၌' }, { label: '။', shiftLabel: '၎င်း' }, { label: '/', shiftLabel: '?' }, { label: 'Shift', width: 'w-14 md:w-24', isSpecial: true }
  ],
  [
    { label: 'Ctrl', width: 'w-10', isSpecial: true }, { label: 'Win', isSpecial: true }, { label: 'Alt', isSpecial: true }, { label: ' ', width: 'w-32 md:w-64', isSpecial: true }, { label: 'Alt', isSpecial: true }, { label: 'Fn', isSpecial: true }, { label: 'Ctrl', width: 'w-10', isSpecial: true }
  ]
];

const HandSVG: React.FC<{ side: 'left' | 'right', activeFingers: string[] }> = ({ side, activeFingers }) => {
  const getFingerStyle = (id: string) => 
    activeFingers.includes(id) ? "fill-indigo-600 stroke-indigo-400" : "fill-slate-100 stroke-slate-200";

  if (side === 'left') {
    return (
      <svg viewBox="0 0 100 120" className="w-full h-auto drop-shadow-sm transition-all duration-300">
        <path d="M20,110 Q40,120 65,105 L78,75 Q80,55 70,45 L35,45 Q25,55 25,75 Z" className="fill-slate-50 stroke-slate-200" strokeWidth="1" />
        <rect x="15" y="45" width="12" height="35" rx="6" className={getFingerStyle("L1")} strokeWidth="1" />
        <rect x="30" y="30" width="12" height="45" rx="6" className={getFingerStyle("L2")} strokeWidth="1" />
        <rect x="45" y="20" width="12" height="50" rx="6" className={getFingerStyle("L3")} strokeWidth="1" />
        <rect x="60" y="30" width="12" height="45" rx="6" className={getFingerStyle("L4")} strokeWidth="1" />
        <rect x="75" y="70" width="25" height="15" rx="7" className={getFingerStyle("L5")} strokeWidth="1" transform="rotate(-35 75 70)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 120" className="w-full h-auto drop-shadow-sm transition-all duration-300">
      <path d="M80,110 Q60,120 35,105 L22,75 Q20,55 30,45 L65,45 Q75,55 75,75 Z" className="fill-slate-50 stroke-slate-200" strokeWidth="1" />
      <rect x="73" y="45" width="12" height="35" rx="6" className={getFingerStyle("R1")} strokeWidth="1" />
      <rect x="58" y="30" width="12" height="45" rx="6" className={getFingerStyle("R2")} strokeWidth="1" />
      <rect x="43" y="20" width="12" height="50" rx="6" className={getFingerStyle("R3")} strokeWidth="1" />
      <rect x="28" y="30" width="12" height="45" rx="6" className={getFingerStyle("R4")} strokeWidth="1" />
      <rect x="0" y="70" width="25" height="15" rx="7" className={getFingerStyle("R5")} strokeWidth="1" transform="rotate(35 25 70)" />
    </svg>
  );
};

const TypingPractice: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'my'>('en');
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(true);
  
  const [errorCount, setErrorCount] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const fallbacks = {
    en: "Learning to type correctly is a foundational skill in computer literacy. Practice daily to improve your speed and accuracy. Modern keyboards are designed for efficiency, allowing you to process information quickly across the digital landscape.",
    my: "ကွန်ပျူတာ နည်းပညာကို ကျွမ်းကျင်စွာ အသုံးပြုနိုင်ရန်အတွက် စာရိုက်ခြင်းသည် အခြေခံအကျဆုံး ကျွမ်းကျင်မှုတစ်ခုဖြစ်သည်။ နေ့စဉ်လေ့ကျင့်ခြင်းဖြင့် သင်၏စာရိုက်နှုန်းနှင့် တိကျမှုကို တိုးတက်စေနိုင်ပါသည်။"
  };

  const loadNewText = async () => {
    setLoading(true);
    try {
      const newText = await generateTypingText(language);
      const cleanedText = newText.replace(/\n/g, ' ').trim();
      setText(cleanedText || fallbacks[language]);
    } catch (error) {
      console.error("Typing text generation error:", error);
      setText(fallbacks[language]);
    } finally {
      setUserInput('');
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
      setIsFinished(false);
      setLoading(false);
      setErrorCount(0);
      setTimeTaken(0);
      setWpmHistory([]);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  };

  useEffect(() => {
    loadNewText();
  }, [language]);

  useEffect(() => {
    let interval: number;
    if (startTime && !isFinished) {
      interval = window.setInterval(() => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        setTimeTaken(Math.round(elapsed));
        
        const words = userInput.length / 5;
        const currentWpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
        setWpm(currentWpm);
        setWpmHistory(prev => [...prev.slice(-29), currentWpm]); 
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isFinished, userInput.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished || loading) return;
    
    const value = e.target.value;
    const oldLength = userInput.length;
    const newLength = value.length;

    if (!startTime && newLength > 0) setStartTime(Date.now());
    
    if (newLength > text.length) return;

    if (newLength > oldLength) {
      const newChar = value[newLength - 1];
      const targetChar = text[newLength - 1];
      if (newChar !== targetChar) {
        setErrorCount(prev => prev + 1);
      }
    }

    setUserInput(value);

    let correctChars = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) correctChars++;
    }
    const acc = value.length > 0 ? (correctChars / value.length) * 100 : 100;
    setAccuracy(Math.round(acc));

    if (value.length === text.length && text.length > 0) {
      setIsFinished(true);
      if (startTime) {
        setTimeTaken(Math.round((Date.now() - startTime) / 1000));
      }
    }
  };

  const currentExpectedChar = text[userInput.length];
  
  const isCharShifted = (char: string) => {
    if (!char) return false;
    if (language === 'en') {
      return /[A-Z!@#$%^&*()_+{}|:"<>?]/.test(char);
    } else {
      const shifted = 'ဈဣဤဧဥဦဿဒဓညဌဠယဉ၌၎င်း';
      return shifted.includes(char);
    }
  };

  const getFingerForChar = (char: string) => {
    if (!char) return null;
    const lower = char.toLowerCase();
    
    const lp = "`1qaz";
    const lr = "2wsx";
    const lm = "3edc";
    const li = "45rtfgvb";
    const ri = "67yuhjnm";
    const rm = "8ik,";
    const rr = "9ol.";
    const rp = "0-=[];'/p\\";
    
    if (lp.includes(lower)) return "L1";
    if (lr.includes(lower)) return "L2";
    if (lm.includes(lower)) return "L3";
    if (li.includes(lower)) return "L4";
    if (char === " ") return "L5"; 
    if (ri.includes(lower)) return "R4";
    if (rm.includes(lower)) return "R3";
    if (rr.includes(lower)) return "R2";
    if (rp.includes(lower)) return "R1";
    
    const myToEn: Record<string, string> = {
      '၁': '1', '၂': '2', '၃': '3', '၄': '4', '၅': '5', '၆': '6', '၇': '7', '၈': '8', '၉': '9', '၀': '0',
      'ဆ': 'q', 'တ': 'w', 'န': 'e', 'မ': 'r', 'အ': 't', 'ပ': 'y', 'က': 'u', 'င': 'i', 'သ': 'o', 'စ': 'p',
      'ေ': 'a', 'ါ': 's', 'ိ': 'd', '်': 'f', 'ု': 'g', 'ွ': 'h', '့': 'j', 'း': 'l', 'ဒ': ';',
      'ဖ': 'z', 'ထ': 'x', 'ခ': 'c', 'လ': 'v', 'ဘ': 'b', 'ည': 'n', 'ာ': 'm', '၊': ',', '။': '.',
    };

    if (myToEn[char]) return getFingerForChar(myToEn[char]);
    
    return null;
  };

  const currentFinger = getFingerForChar(currentExpectedChar);
  const needsShift = isCharShifted(currentExpectedChar);
  
  // Calculate which fingers are active on which hand
  const leftActiveFingers: string[] = [];
  const rightActiveFingers: string[] = [];
  
  if (currentFinger?.startsWith('L')) {
    leftActiveFingers.push(currentFinger);
    if (needsShift) rightActiveFingers.push('R1'); // Right pinky for Shift
  } else if (currentFinger?.startsWith('R')) {
    rightActiveFingers.push(currentFinger);
    if (needsShift) leftActiveFingers.push('L1'); // Left pinky for Shift
  }

  const isCurrentKey = (key: KeyConfig) => {
    if (!currentExpectedChar) return false;
    const char = currentExpectedChar.toLowerCase();
    
    if (currentExpectedChar === ' ' && key.label === ' ') return true;
    if (key.label.toLowerCase() === char) return true;
    if (key.shiftLabel && key.shiftLabel === currentExpectedChar) return true;
    
    return false;
  };

  const layout = language === 'en' ? EN_LAYOUT : MY_LAYOUT;

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto px-4 py-4 md:py-8">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col flex-1 relative">
        
        {/* Statistics Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              ENGLISH
            </button>
            <button 
              onClick={() => setLanguage('my')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all myanmar-text ${language === 'my' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              မြန်မာ
            </button>
          </div>
          
          <div className="flex gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">WPM</p>
              <p className="text-2xl font-black text-indigo-400 leading-none">{wpm}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">ACC</p>
              <p className="text-2xl font-black text-green-400 leading-none">{accuracy}%</p>
            </div>
            <div className="text-center hidden sm:block">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">ERR</p>
              <p className="text-2xl font-black text-red-400 leading-none">{errorCount}</p>
            </div>
          </div>

          <button 
            onClick={loadNewText}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-md active:scale-90 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Lesson Display Area */}
        <div 
          className="relative flex-1 bg-white p-8 md:p-12 overflow-y-auto cursor-text select-none min-h-[250px] flex items-center justify-center"
          onClick={() => inputRef.current?.focus()}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Generating Practice Text...</p>
            </div>
          ) : (
            <div className="max-w-4xl w-full" ref={textContainerRef}>
              <div className="text-2xl md:text-3xl lg:text-4xl myanmar-text leading-relaxed text-slate-400 flex flex-wrap gap-x-1 gap-y-2 md:gap-y-4">
                {text.split('').map((char, i) => {
                  let isCurrent = i === userInput.length;
                  let isTyped = i < userInput.length;
                  let isCorrect = isTyped && userInput[i] === text[i];
                  
                  let charColor = "text-slate-300"; 
                  if (isTyped) {
                    charColor = isCorrect ? "text-slate-900" : "text-red-600 bg-red-100 rounded px-0.5";
                  }

                  return (
                    <span 
                      key={i} 
                      className={`relative inline-block transition-colors duration-100 ${charColor} ${isCurrent ? 'bg-indigo-100 text-indigo-900 rounded px-1 font-black ring-2 ring-indigo-200' : ''}`}
                    >
                      {isCurrent && (
                        <span className="absolute left-0 -bottom-1 w-full h-1 bg-indigo-600 animate-pulse rounded-full" />
                      )}
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
              </div>

              <input 
                ref={inputRef}
                type="text" 
                value={userInput}
                onChange={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="absolute opacity-0 w-0 h-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                autoFocus
              />

              {!isInputFocused && !isFinished && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                  <div className="bg-slate-900 text-white px-8 py-5 rounded-3xl shadow-2xl border border-white/20 flex items-center gap-6 animate-bounce cursor-pointer" onClick={() => inputRef.current?.focus()}>
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                        </svg>
                    </div>
                    <div>
                      <h3 className="font-black text-xl uppercase tracking-tight">Focus Lost</h3>
                      <p className="text-indigo-400 font-bold myanmar-text text-sm">Click to continue practice.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Session Finished View */}
          {isFinished && (
            <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mb-6">
                <span className="text-4xl">🏆</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Well Done!</h2>
              <p className="text-slate-500 mb-10 font-medium text-center">Your typing skills are improving every day.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-12">
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Speed</p>
                  <p className="text-3xl font-black text-indigo-600">{wpm} <span className="text-xs">WPM</span></p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                  <p className="text-3xl font-black text-green-600">{accuracy}%</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Errors</p>
                  <p className="text-3xl font-black text-red-500">{errorCount}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time</p>
                  <p className="text-3xl font-black text-slate-800">{timeTaken}s</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={loadNewText}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  Start Next Lesson
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    setUserInput('');
                    setStartTime(null);
                    setWpm(0);
                    setAccuracy(100);
                    setIsFinished(false);
                    setErrorCount(0);
                    setWpmHistory([]);
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="bg-slate-100 text-slate-700 px-10 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
                >
                  Repeat Practice
                </button>
              </div>
            </div>
          )}
        </div>

        {/* REFINED INTEGRATED KEYBOARD AND HANDS */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 md:p-10 flex flex-col items-center justify-center shrink-0">
          
          <div className="relative w-full max-w-4xl py-4">
            {/* Hand Layer (Behind Keyboard) */}
            <div className="absolute inset-0 flex justify-center pointer-events-none z-0">
               <div className="w-full h-full flex justify-between max-w-3xl opacity-20">
                  <div className="w-64 md:w-80 transform translate-y-16 -translate-x-4 md:-translate-x-12">
                      <HandSVG side="left" activeFingers={leftActiveFingers} />
                  </div>
                  <div className="w-64 md:w-80 transform translate-y-16 translate-x-4 md:translate-x-12">
                      <HandSVG side="right" activeFingers={rightActiveFingers} />
                  </div>
               </div>
            </div>

            {/* Keyboard Layer (Foreground) */}
            <div className="relative z-10 space-y-1 select-none overflow-x-auto no-scrollbar pb-2">
              {layout.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1 min-w-max px-2">
                  {row.map((key, kIdx) => {
                    const isActive = isCurrentKey(key);
                    // Highlight shift key specifically
                    const isLeftShift = needsShift && key.label === 'Shift' && kIdx === 0 && rIdx === 3;
                    const isRightShift = needsShift && key.label === 'Shift' && kIdx !== 0 && rIdx === 3;
                    const isHighlightedShift = (isLeftShift && currentFinger?.startsWith('R')) || (isRightShift && currentFinger?.startsWith('L'));
                    
                    return (
                      <div 
                        key={kIdx}
                        className={`
                          ${key.width || 'w-9 md:w-11'} h-9 md:h-11
                          rounded-xl border-b-4 border-x border-t flex flex-col items-center justify-center font-bold transition-all duration-75
                          ${isActive || isHighlightedShift
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg translate-y-1 border-b-0 scale-105' 
                            : 'border-slate-300 bg-white/90 text-slate-500 shadow-sm backdrop-blur-[1px]'
                          }
                          ${key.isSpecial ? 'text-[8px] md:text-[9px] uppercase tracking-tighter' : 'text-xs md:text-sm'}
                        `}
                      >
                        {key.shiftLabel && (
                          <span className={`text-[8px] md:text-[9px] leading-none mb-0.5 opacity-40 ${language === 'my' ? 'myanmar-text' : ''}`}>
                            {key.shiftLabel}
                          </span>
                        )}
                        <span className={`${language === 'my' ? 'myanmar-text' : ''} leading-none`}>
                          {key.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6 text-slate-400 mt-6 pb-2">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Target Action</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rest Position</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
