import React from 'react';

interface SupportProps {
  onNavigate: (view: string) => void;
}

const Support: React.FC<SupportProps> = ({ onNavigate }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 animate-slide-up">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4">Support Us</h1>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-[40px] p-6 sm:p-8 md:p-12 shadow-sm border border-slate-200">
        {/* Support Message */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">NSLO ကို ထောက်ပံ့ပေးခြင်းဖြင့်</h2>
            <p className="text-base sm:text-lg myanmar-text">မြန်မာလူငယ်များ၏ အနာဂတ်ကို အတူဖန်တီးလိုက်ပါ။</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Wave Money */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Wave Money</h3>
            <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6 bg-white rounded-2xl p-3 sm:p-4 border border-slate-200">
              <img src="/wavemoney.jpg" alt="Wave Money QR Code" className="w-full h-full object-contain rounded-xl" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-2">ဖုန်းနံပါတ်</p>
            <p className="text-base sm:text-lg font-bold text-slate-900">09 758 430 371</p>
          </div>

          {/* KPay */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">KPay</h3>
            <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6 bg-white rounded-2xl p-3 sm:p-4 border border-slate-200">
              <img src="/kpay.jpg" alt="KPay QR Code" className="w-full h-full object-contain rounded-xl" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-2">ဖုန်းနံပါတ်</p>
            <p className="text-base sm:text-lg font-bold text-slate-900">09 446 941 632</p>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="bg-indigo-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-indigo-200 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-3 sm:mb-4">ကျေးဇူးတင်ပါသည်!</h3>
          <p className="text-sm sm:text-base text-indigo-800 myanmar-text leading-relaxed">
            သင့်ပံ့ပိုးမှုသည် NSLO Computer ကို မြန်မာလူငယ်များအတွက် အခမဲ့ နည်းပညာပေးခြင်းနှင့် အလုပ်အကိုင် လမ်းညွှန်ခြင်း ဝန်ဆောင်မှုများ ဆက်လက် ပေးနိုင်ရန် အထောက်အကူ ဖြစ်ပါသည်။
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-6 sm:pt-8 border-t border-slate-200 mt-8 sm:mt-10">
          <button
            onClick={() => onNavigate('roadmap')}
            className="bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-indigo-700 transition-standard shadow-xl shadow-indigo-100 active:scale-95 text-sm sm:text-base"
          >
            Start Learning
          </button>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 sm:mt-4 myanmar-text">သင်ခန်းစာများကို စတင်လေ့လာကြရအောင်</p>
        </div>
      </div>
    </section>
  );
};

export default Support;

