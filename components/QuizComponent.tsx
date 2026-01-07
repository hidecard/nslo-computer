import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 p-8 rounded-3xl border border-white/10 text-center shadow-2xl max-w-md mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
          <span className="text-4xl">🎉</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Quiz Finished!</h3>
        <p className="text-slate-400 mb-6">You scored {score} out of {questions.length}</p>
        
        {/* Score Progress Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/10"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={`${(score / questions.length) * 352} 352`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{Math.round((score / questions.length) * 100)}%</span>
          </div>
        </div>
        
        <button 
          onClick={onComplete}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          Return to Lesson
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Question {currentIdx + 1} of {questions.length}</span>
        <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-6 myanmar-text leading-relaxed">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={showExplanation}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all myanmar-text ${
              selected === idx 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-white/10 hover:border-white/30 hover:bg-white/5'
            } ${showExplanation ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold transition-all ${
                selected === idx 
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white' 
                  : 'bg-white/10 text-slate-400'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className={selected === idx ? 'text-white' : 'text-slate-300'}>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-xl mb-6 myanmar-text text-sm ${
          selected === currentQuestion.correctAnswer 
            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {selected === currentQuestion.correctAnswer ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <p className="font-bold">မှန်ကန်ပါတယ်!</p>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <p className="font-bold">မှားယွင်းနေပါတယ်!</p>
              </>
            )}
          </div>
          {currentQuestion.explanation}
        </div>
      )}

      <div className="flex justify-end">
        {!showExplanation && selected !== null && (
          <button 
            onClick={() => setShowExplanation(true)}
            className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/10"
          >
            Check Answer
          </button>
        )}
        {showExplanation && (
          <button 
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            {currentIdx === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;

