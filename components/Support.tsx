import React from 'react';

interface SupportProps {
  onNavigate: (view: string) => void;
}

const Support: React.FC<SupportProps> = ({ onNavigate }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 animate-slide-up">
      <div className="text-center mb-12">
        
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Support & Contact</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">We're here to help! Choose a payment method and reach out to us.</p>
      </div>

      {/* Payment Methods */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* KPay */}
          <div className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">KPay</h3>
                <p className="text-slate-400 text-sm">Mobile Banking</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className="text-slate-400 text-sm mb-2">Account Number</p>
              <p className="text-amber-400 font-mono text-xl">09758430371</p>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Instant transfer available</span>
            </div>
          </div>

          {/* Wave Money */}
          <div className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Wave Money</h3>
                <p className="text-slate-400 text-sm">Mobile Banking</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className="text-slate-400 text-sm mb-2">Account Number</p>
              <p className="text-amber-400 font-mono text-xl">09758430371</p>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Instant transfer available</span>
            </div>
          </div>
        </div>

  
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Contact Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Email Us</p>
                <p className="text-white font-medium">arkaryan.info@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Call Us</p>
                <p className="text-white font-medium">09758430371</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default Support;

