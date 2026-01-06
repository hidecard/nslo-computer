
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (view: 'roadmap') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate?.('roadmap')}
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-indigo-200 shadow-lg group-hover:scale-105 transition-standard">
              N
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight tracking-tight">NSLO Portal</h1>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Myanmar ICT Roadmap</p>
            </div>
          </div>
          
          {/* Navigation links removed as per request */}

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate?.('roadmap')}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-standard shadow-lg shadow-indigo-100 active:scale-95"
            >
              Start Learning
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-slate-200 rounded-lg" />
             <p className="text-slate-500 text-sm font-medium">© 2024 NSLO Computer Myanmar</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-standard">Privacy Policy</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-standard">Terms of Service</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-standard">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
