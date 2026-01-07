import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CURRICULUM } from '../constants';
import { Level } from '../types';

const Roadmap: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Ai', 'Computer Error', 'Specialized', 'Social Media', 'It Support'];

  const filteredCurriculum = selectedCategory === 'All'
    ? CURRICULUM
    : CURRICULUM.filter(level => level.category === selectedCategory);

  const handleLevelClick = (levelId: number) => {
    navigate(`/level/${levelId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Premium Hero Section */}
      <section className="relative bg-slate-950 text-white py-24 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-slate-800/30 to-slate-900/30 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full mb-8 border border-white/10">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-blue-200 tracking-wide">ELEVATE YOUR SKILLS</span>
          </div>

          <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-violet-600 bg-clip-text text-transparent">
              Build your future, step by step.
            </span>
          </h3>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
            ကွန်ပျူတာ အခြေခံမှစတင်ပြီး ကျွမ်းကျင်သူအဆင့်ထိ လေ့လာနိုင်မည့် စနစ်တကျရေးဆွဲထားသော သင်ရိုးညွှန်းတမ်း
          </p>
          
          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/level/1')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                Begin Your Journey
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
          </div>
          
     
        </div>
      </section>

    

      {/* Curriculum Grid */}
      <section className="py-20 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Your Learning Path</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">A meticulously designed curriculum to take you from foundational concepts to advanced expertise</p>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p className="text-slate-500 text-sm">
                Showing {filteredCurriculum.length} of {CURRICULUM.length} courses
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCurriculum.map((level: Level) => {
              return (
                <div
                  key={level.id}
                  onClick={() => handleLevelClick(level.id)}
                  className="group relative p-8 bg-gradient-to-br from-slate-900 to-slate-800/50 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  {/* Premium Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Level Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/30">
                        {level.id}
                      </div>
                      <div className="flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                        <span className="text-sm font-medium">Begin</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Level Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {level.title}
                    </h3>

                    {/* Topics Preview */}
                    <div className="space-y-3 mb-6">
                      {level.topics.slice(0, 3).map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                          <span className="text-slate-400">{topic}</span>
                        </div>
                      ))}
                      {level.topics.length > 3 && (
                        <div className="text-slate-500 text-sm font-medium pl-5">
                          +{level.topics.length - 3} more topics
                        </div>
                      )}
                    </div>

                    {/* AI Features */}
                    <div className="flex flex-wrap gap-2">
                      {level.aiFeatures.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/5 text-slate-300 text-xs font-medium rounded-full border border-white/10"
                        >
                          {feature.type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Premium Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/20 transition-colors duration-500 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
    
    </div>
  );
};

export default Roadmap;

