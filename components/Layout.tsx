import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/support', label: 'Support' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-indigo-600 font-black text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform">
                N
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-white text-lg">NSLO</h1>
                <p className="text-[10px] text-white/80 font-medium tracking-wider">
                  Never Stop Learning Online
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex">
              <button
                onClick={() => navigate('/')}
                className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/90 hover:scale-105 transition-all shadow-lg"
              >
                Start Learning
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-xl animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive(item.path)
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold text-sm mt-4"
              >
                Start Learning
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* About Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  N
                </div>
                <div>
                  <h3 className="font-bold text-lg">NSLO</h3>
                  <p className="text-xs text-slate-400 tracking-wider">Never Stop Learning Online</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Master computer science fundamentals through interactive lessons, virtual labs, and comprehensive learning paths.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/about')}
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => navigate('/support')}
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Support
                </button>
              </div>
            </div>

            {/* Learn Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Learn</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/')}
                  className="block text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="block text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => navigate('/support')}
                  className="block text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Support
                </button>
                <button
                  onClick={() => navigate('/roadmap')}
                  className="block text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Roadmap
                </button>
              </div>
            </div>

            {/* Connect Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Connect</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Follow us for updates and learning tips.
              </p>
              <div className="flex gap-4">
                {/* Social Media Icons - Placeholder */}
                <a href="#" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Legal Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white text-sm font-medium transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-slate-400 hover:text-white text-sm font-medium transition-colors">
                  Terms of Use
                </a>
                <a href="#" className="block text-slate-400 hover:text-white text-sm font-medium transition-colors">
                  Cookie Policy
                </a>
                <a href="#" className="block text-slate-400 hover:text-white text-sm font-medium transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm">
                © 2024 NSLO (Never Stop Learning Online). All rights reserved.
              </p>
              <p className="text-slate-500 text-xs">
                Empowering learners worldwide with quality computer science education.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

