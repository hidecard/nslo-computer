
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
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2">Quiz Finished!</h3>
        <p className="text-slate-600 mb-6">You scored {score} out of {questions.length}</p>
        <button 
          onClick={onComplete}
          className="bg-indigo-600 text-white px-8 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
        >
          Return to Lesson
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Question {currentIdx + 1} of {questions.length}</span>
        <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-slate-800 mb-6 myanmar-text leading-relaxed">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all myanmar-text ${
              selected === idx 
                ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${
                selected === idx ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </div>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-xl mb-6 myanmar-text text-sm ${
          selected === currentQuestion.correctAnswer ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <p className="font-bold mb-1">
            {selected === currentQuestion.correctAnswer ? 'မှန်ကန်ပါတယ်!' : 'မှားယွင်းနေပါတယ်!'}
          </p>
          {currentQuestion.explanation}
        </div>
      )}

      <div className="flex justify-end">
        {!showExplanation && selected !== null && (
          <button 
            onClick={() => setShowExplanation(true)}
            className="bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-700 transition-all"
          >
            Check Answer
          </button>
        )}
        {showExplanation && (
          <button 
            onClick={handleNext}
            className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            {currentIdx === questions.length - 1 ? 'Finish' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
