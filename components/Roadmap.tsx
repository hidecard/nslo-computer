import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CURRICULUM } from '../constants';
import { Level } from '../types';

const Roadmap: React.FC = () => {
  const navigate = useNavigate();

  const handleLevelClick = (levelId: number) => {
    navigate(`/level/${levelId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-12 px-4 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tight">
            NSLO Computer Learning
          </h1>
          <p className="text-base sm:text-xl md:text-2xl opacity-90 font-medium max-w-3xl mx-auto leading-relaxed">
            Master computer science fundamentals through interactive lessons, AI-powered tutoring, and hands-on projects
          </p>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section className="py-12 px-4 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4">Learning Roadmap</h2>
            <p className="text-sm sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Follow our structured curriculum designed to take you from beginner to advanced computer science concepts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CURRICULUM.map((level: Level) => {
              return (
                <div
                  key={level.id}
                  onClick={() => handleLevelClick(level.id)}
                  className="group relative bg-white rounded-2xl sm:rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer hover:border-indigo-300"
                >
                  {/* Level Badge */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-lg sm:text-lg bg-indigo-600 text-white">
                      {level.id}
                    </div>
                  </div>

                  {/* Level Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 group-hover:text-indigo-600 transition-colors">
                    {level.title}
                  </h3>

                  {/* Topics Preview */}
                  <div className="space-y-2 mb-4 sm:mb-6">
                    {level.topics.slice(0, 3).map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-600 truncate">{topic}</span>
                      </div>
                    ))}
                    {level.topics.length > 3 && (
                      <div className="text-xs sm:text-sm text-slate-400 font-medium">
                        +{level.topics.length - 3} more topics
                      </div>
                    )}
                  </div>

                  {/* AI Features */}
                  <div className="flex flex-wrap gap-2">
                    {level.aiFeatures.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider"
                      >
                        {feature.type}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-[32px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 mb-2">{CURRICULUM.length}</div>
              <div className="text-sm sm:text-base text-slate-600 font-medium">Learning Levels</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-purple-600 mb-2">
                {CURRICULUM.reduce((acc, level) => acc + level.topics.length, 0)}
              </div>
              <div className="text-sm sm:text-base text-slate-600 font-medium">Topics Covered</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roadmap;

