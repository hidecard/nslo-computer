import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Courses' },
    { path: '/about', label: 'About' },
    { path: '/support', label: 'Support' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Premium Header */}
      <header className="bg-slate-950/80 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                N
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-white text-lg">NSLO</h1>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider">
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-white/5 text-blue-400'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Start Learning
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
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
          <div className="md:hidden bg-slate-950 border-t border-white/5">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/5 text-blue-400'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <button
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-400 font-medium hover:text-white hover:bg-white/5 rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-lg font-medium"
                >
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30">
                N
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">NSLO</h3>
                <p className="text-[8px] text-slate-500 font-medium tracking-wider">
                  Never Stop Learning Online
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 max-w-md mx-auto">
              Empowering learners worldwide with quality computer science education.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <button onClick={() => navigate('/')} className="text-slate-400 hover:text-blue-400 text-xs transition-colors">Courses</button>
              <button onClick={() => navigate('/')} className="text-slate-400 hover:text-blue-400 text-xs transition-colors">All Courses</button>
              <button onClick={() => navigate('/about')} className="text-slate-400 hover:text-blue-400 text-xs transition-colors">About</button>
              <button onClick={() => navigate('/support')} className="text-slate-400 hover:text-blue-400 text-xs transition-colors">Support</button>
            </div>
            <div className="border-t border-white/5 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-slate-500 text-xs">
                  © 2024 NSLO. All rights reserved.
                </p>
                <p className="text-slate-600 text-xs">
                  Made with care for learners everywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

