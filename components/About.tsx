import React from 'react';

interface AboutProps {
  onNavigate: (view: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 animate-slide-up">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4">About Our Founder</h1>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-[40px] p-6 sm:p-8 md:p-12 shadow-sm border border-slate-200">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white">
            <img src="/profile.jpg" alt="Arkar Yan" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Arkar Yan</h2>
            <p className="text-indigo-600 font-semibold text-base sm:text-lg mb-4">Programming Instructor & Project Manager</p>
            <div className="flex flex-col gap-1 sm:gap-2 text-sm text-slate-600 px-4">
              <p><strong>သင်ကြားရေးအတွေ့အကြုံ:</strong> 9+ နှစ်</p>
              <p><strong>Project များ:</strong> 200+</p>
              <p><strong>Contact:</strong> arkaryan.info@gmail.com | 09758430371</p>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="mb-10 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">About Me</h3>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-600 myanmar-text space-y-3 sm:space-y-4">
            <p>ကျွန်ုပ်ရဲ့ နည်းပညာခရီးစဉ်က 2014 ခုနှစ် မှာ Computer လောကကို စတင်လေ့လာခြင်းကနေ စတင်ခဲ့တာပါ။</p>
            <p>2022 မှ 2024 အတွင်း <strong>Power Agri</strong> ကို တည်ထောင်ခဲ့ပြီး Web Design, Branding Service များလည်း လုပ်ကိုင်ခဲ့ပါတယ်။</p>
            <p>2022 ခုနှစ် မှာ <strong>k Square</strong> ကို Founder & CEO အဖြစ် တည်ထောင်ပြီး Software Development Project များကို ဦးဆောင်လုပ်ကိုင်ခဲ့ပါတယ်။</p>
            <p>2017 မှ ယနေ့အချိန်အထိ (9+ နှစ်) Programming Instructor အဖြစ် သင်ကြားပေးခဲ့ပြီး Theory နဲ့ Practical ကို ချိတ်ဆက်သင်ကြားခြင်းကို အထူးအလေးထားလုပ်ဆောင်ပါတယ်။</p>
            <p>2024 ခုနှစ်ကနေ ယနေ့အချိန်အထိ <strong>YHA Computer</strong> မှာ Programming Instructor & Project Manager အဖြစ် လုပ်ကိုင်နေပြီး Next.js, React.js, Node.js, Laravel, Flutter, Python စသည့် Technology များကို သင်ကြားပေးနေပါတယ်။</p>
            <p>ယနေ့အချိန်မှာ ကျွန်ုပ်သည် Full-Stack Web Developer & Instructor အဖြစ် လုပ်ကိုင်နေပြီး 200+ Project များကို ဆက်လက်လုပ်ဆောင်နေပါတယ်။</p>
          </div>
        </div>

        {/* Why NSLO Computer */}
        <div className="mb-10 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">ဘာကြောင့် NSLO ကို ဖန်တီးခဲ့တာလဲ</h3>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-600 myanmar-text space-y-3 sm:space-y-4">
            <p><strong>NSLO Computer</strong> ကို ဖန်တီးရခြင်းမှာ အဓိကရည်ရွယ်ချက်မှာ <strong>ကွန်ပျူတာ အခြေခံမှစတင်ပြီး ကျွမ်းကျင်သူအဆင့်ထိ စနစ်တကျ လေ့လာနိုင်မည့် သင်ရိုးညွှန်းတမ်းကို မြန်မာဘာသာဖြင့်ပံ့ပိုးပေးရန်</strong> ဖြစ်ပါတယ်။</p>

            <h4 className="text-lg sm:text-xl font-semibold text-slate-800 mt-6 sm:mt-8 mb-3 sm:mb-4">အဓိကရည်ရွယ်ချက်များ</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                <h5 className="font-semibold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">1. အခြေခံအဆင့်</h5>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>• ICT Foundation, Windows, Internet</li>
                  <li>• Microsoft Office</li>
                  <li>• အခြေခံနည်းပညာများ</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                <h5 className="font-semibold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">2. Intermediate & Advanced</h5>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>• AI Tools, Windows OS Mastery</li>
                  <li>• IT Support, Automation</li>
                  <li>• အဆင့်မြင့်နည်းပညာများ</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                <h5 className="font-semibold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">3. Specialized Knowledge</h5>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>• Social Media Management</li>
                  <li>• Online Safety, Freelancing</li>
                  <li>• IT Career Development</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                <h5 className="font-semibold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">4. Practical Learning</h5>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>• တကယ်အသုံးချနိုင်သော</li>
                  <li>• troubleshooting နည်းများ</li>
                  <li>• Project-based Learning</li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-indigo-200 mt-6 sm:mt-8">
              <h5 className="font-semibold text-indigo-800 mb-2">5. မြန်မာဘာသာဖြင့် လေ့လာနိုင်စေရန်</h5>
              <p className="text-indigo-700 text-sm sm:text-base">နည်းပညာသင်ယူမှုကို မြန်မာဘာသာဖြင့် အရိုးရှင်းပြီး နားလည်လွယ်စေရန်</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-6 sm:pt-8 border-t border-slate-200">
          <button
            onClick={() => onNavigate('roadmap')}
            className="bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-indigo-700 transition-standard shadow-xl shadow-indigo-100 active:scale-95 text-sm sm:text-base"
          >
            View Lessons
          </button>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 sm:mt-4 myanmar-text">သင်ခန်းစာများကို စတင်လေ့လာကြရအောင်</p>
        </div>
      </div>
    </section>
  );
};

export default About;

