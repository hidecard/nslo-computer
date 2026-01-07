
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (view: 'roadmap' | 'about' | 'support') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
              onClick={() => onNavigate?.('roadmap')}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-indigo-200 shadow-lg group-hover:scale-105 transition-standard">
                N
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-slate-900 leading-tight tracking-tight text-sm sm:text-base truncate">NSLO</h1>
                <p className="text-[9px] sm:text-[10px] text-indigo-600 font-bold uppercase tracking-wider hidden sm:block">Never Stop Learning Online</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => onNavigate?.('about')}
                className="text-slate-600 hover:text-indigo-600 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-50 transition-standard active:scale-95"
              >
                About Us
              </button>
              <button
                onClick={() => onNavigate?.('support')}
                className="text-slate-600 hover:text-indigo-600 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-50 transition-standard active:scale-95"
              >
                Support Us
              </button>
              <button
                onClick={() => onNavigate?.('roadmap')}
                className="bg-indigo-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-indigo-700 transition-standard shadow-lg shadow-indigo-100 active:scale-95"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-slate-400">N</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">© 2024 NSLO ( Never Stop Learning Online )</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
