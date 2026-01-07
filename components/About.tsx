import React from 'react';

interface AboutProps {
  onNavigate: (view: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 animate-slide-up">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full mb-8 border border-white/10">
          <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-blue-200 tracking-wide">OUR STORY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About Our Founder</h1>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl shadow-blue-500/20">
              <img src="/profile.jpg" alt="Arkar Yan" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Arkar Yan</h2>
            <p className="text-blue-400 font-semibold text-lg mb-4">Programming Instructor & Project Manager</p>
            <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>9+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span>200+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>arkaryan.info@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">About Me</h3>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300 myanmar-text space-y-4 leading-relaxed">
            <p>ကျွန်ုပ်ရဲ့ နည်းပညာခရီးစဉ်က 2014 ခုနှစ် မှာ Computer လောကကို စတင်လေ့လာခြင်းကနေ စတင်ခဲ့တာပါ။</p>

            <p>2017 မှ 2024 အတွင်း Freelance Software Developer အဖြစ် လုပ်ကိုင်ခဲ့ပါတယ်။ထို့အပြင် နည်းပညာလုပ်ငန်းအတွေ့အကြုံတွေနဲ့အတူ သင်ကြားရေးဘက်ကိုလည်း ဝင်ရောက်လာခဲ့ပြီး 2017 မှ ယနေ့အချိန်အထိ (9+ နှစ်) Programming Instructor အဖြစ် သင်ကြားပေးခဲ့ပါတယ်။ Online Class Batch ခွဲပေါင်းများစွာနဲ့ ကျောင်းသားများစွာကို သင်ကြားမွေးထုပ်ခဲ့ပြီးဖြစ်ပါတယ်။</p>

            <p>ထို့အပြင် 2022 ခုနှစ် မှာ k Square ကို Founder & CEO အဖြစ် တည်ထောင်ပြီး Software Project များကို ဦးဆောင်လုပ်ကိုင်ခဲ့ပါတယ်။</p>

            <p>2023 ခုနှစ်မှာ Power Agriculture Myanmar ကို တည်ထောင်ခဲ့ပြီး စိုက်ပျိုးရေးဆေးများကိုလဲ ကိုင်ပိုင် Brand Name တစ်ခုနဲ့ ထုပ်လုပ်နိုင်ခဲ့ပါတယ်။</p>

            <p>2024 ခုနှစ်ကနေ ယနေ့အချိန်အထိ YHA Computer မှာ Programming Instructor & Project Manager အဖြစ် လုပ်ကိုင်နေပြီး Next.js, React.js, Express.js, Node.js, MongoDB, Laravel, Vue.js, Flutter & Dart, Python, C#, Web Design & Development, ICT FOUNDATION စသည့် ခေတ်မီ Technology များကို သင်ကြားပေးနေပါတယ်။ ထို့အပြင် Development Project များကိုလည်း ဦးဆောင်လုပ်ကိုင်ကာ သင်တန်းသားများအမှန်တကယ် အသုံးချနိုင်သော အတွေ့အကြုံများ ရရှိစေဖို့ ကြိုးစားနေပါတယ်။</p>

            <p>ယနေ့အချိန်မှာ ကျွန်ုပ်သည် Instructor & Project Manager အဖြစ် လုပ်ကိုင်နေပြီး 200+ အပြီးစီးပြီး / လက်ရှိလုပ်ဆောင်နေဆဲ Project များကို ဆက်လက်လုပ်ဆောင်နေပါတယ်။ 2014 ခုနှစ်က စတင်ခဲ့သော Computer ခရီးစဉ်က ယနေ့မှာ Developer, Instructor နဲ့ Founder အဖြစ် အဆင့်ဆင့် တိုးတက်လာပြီး နည်းပညာအသစ်များကို ဆက်လက်လေ့လာကာ ကိုယ်ပိုင်စွမ်းရည်ကို အမြဲတမ်း တိုးတက်အောင် ကြိုးစားနေပါတယ်။</p>
          </div>
        </div>

        {/* Why NSLO Computer */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">ဘာကြောင့် NSLO ကို ဖန်တီးခဲ့တာလဲ</h3>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300 myanmar-text space-y-4 leading-relaxed">
            <p>NSLO Computer ကို ဖန်တီးရခြင်းမှာ အဓိကရည်ရွယ်ချက်မှာ ကွန်ပျူတာ အခြေခံမှစတင်ပြီး ကျွမ်းကျင်သူအဆင့်ထိ စနစ်တကျ လေ့လာနိုင်မည့် သင်ရိုးညွှန်းတမ်းကို မြန်မာဘာသာဖြင့်ပံ့ပိုးပေးရန် ဖြစ်ပါတယ်။ ဒီ Platform သည် သင်တန်းသားများ၊ လေ့လာသူများ၊ IT စိတ်ဝင်စားသူများအတွက် လက်တွေ့ကျကျ သင်ကြားမှုနှင့် နည်းပညာအသုံးချမှုကို အလွယ်တကူ ရနိုင်စေရန် ရည်ရွယ်ထားပါတယ်။</p>

            <h4 className="text-xl font-semibold text-white mt-8 mb-4">အဓိကရည်ရွယ်ချက်များ</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h5 className="font-semibold text-white mb-2">အခြေခံအဆင့်</h5>
                <ul className="space-y-1 text-slate-400 text-sm">
                  <li>• ICT Foundation, Windows, Internet</li>
                  <li>• Microsoft Office</li>
                  <li>• အခြေခံနည်းပညာများ</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h5 className="font-semibold text-white mb-2">Intermediate & Advanced</h5>
                <ul className="space-y-1 text-slate-400 text-sm">
                  <li>• AI Tools, Windows OS Mastery</li>
                  <li>• IT Support, Automation</li>
                  <li>• အဆင့်မြင့်နည်းပညာများ</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h5 className="font-semibold text-white mb-2">Specialized Knowledge</h5>
                <ul className="space-y-1 text-slate-400 text-sm">
                  <li>• Social Media Management</li>
                  <li>• Online Safety, Freelancing</li>
                  <li>• IT Career Development</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">4</span>
                </div>
                <h5 className="font-semibold text-white mb-2">Practical Learning</h5>
                <ul className="space-y-1 text-slate-400 text-sm">
                  <li>• တကယ်အသုံးချနိုင်သော</li>
                  <li>• troubleshooting နည်းများ</li>
                  <li>• Project-based Learning</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-400 mb-2">5. မြန်မာဘာသာဖြင့် လေ့လာနိုင်စေရန်</h5>
                  <p className="text-slate-300">နည်းပညာသင်ယူမှုကို မြန်မာဘာသာဖြင့် အရိုးရှင်းပြီး နားလည်လွယ်စေရန်</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8 border-t border-white/10">
          <button
            onClick={() => onNavigate('roadmap')}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Learning Journey
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <p className="text-slate-500 text-sm mt-4 myanmar-text">သင်ခန်းစာများကို စတင်လေ့လာကြရအောင်</p>
        </div>
      </div>
    </section>
  );
};

export default About;

