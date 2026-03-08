"use client";

import { motion } from "framer-motion";
import { Minus, MessageCircle, BarChart3, Users2, ChevronRight, LayoutGrid } from "lucide-react";
import ActionRow from "@/components/shared/ActionRow";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import FeatureCardGrid from "@/components/shared/FeatureCardGrid";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/shared/Section";
import SectionLabel from "@/components/shared/SectionLabel";

export default function Home() {
  return (
    <main>
      <Section bg="slate" className="pt-40 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-12 mx-auto"
        >
          <PageHero
            contentClassName="space-y-12"
            badge={
              <div className="flex items-center gap-4 justify-center">
                <Minus className="text-blue-600 h-6 w-6" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  البنية التحتية العقارية في المملكة
                </span>
                <Minus className="text-blue-600 h-6 w-6" />
              </div>
            }
            title={<>عنان: مستقبل <br /><span className="text-blue-600">العقار في السعودية</span></>}
            titleClassName="text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[1.1] tracking-tighter text-slate-900 uppercase"
            description={
              <p>
                استبدل التعقيد في السوق السعودي بدردشة ذكية موحدة. ابحث عن الفرص، موّل مشاريعك، وأغلق صفقاتك في الرياض وجدة وكافة مدن المملكة فوراً.
              </p>
            }
            descriptionClassName="text-xl md:text-2xl font-bold text-slate-600 max-w-2xl mx-auto leading-relaxed border-r-4 border-blue-600 pr-6 text-right"
            actions={
              <ActionRow className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
                <Button href="/signin" variant="primary">ابدأ الوصول المجاني</Button>
                <Button href="/developer" variant="outline">استكشف النظام</Button>
              </ActionRow>
            }
          />
        </motion.div>
      </Section>

      <Section id="buyers" border>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <SectionLabel
              icon={MessageCircle}
              className="inline-flex items-center gap-3 bg-blue-50 px-4 py-2 border-r-4 border-blue-600"
              iconClassName="h-5 w-5 text-blue-600"
              textClassName="text-xs font-black uppercase tracking-widest text-blue-900"
            >
              للمستثمرين في المملكة
            </SectionLabel>
            <h2 className="text-5xl font-black text-slate-900 leading-[1.2]">دردشة واحدة.. <br /><span className="text-blue-600">لإغلاق صفقة استثمارية</span></h2>
            <p className="text-xl text-slate-500 font-bold leading-relaxed">
              سواء كنت تبحث في شمال الرياض أو مشاريع الواجهة البحرية في جدة، وكيلنا الذكي يحلل آلاف الوحدات والتمويلات البنكية المحلية ليعطيك القرار الأفضل.
            </p>
            <FeatureCardGrid
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4"
              items={[
                { title: "مقارنة فورية", description: "تحليل السوق السعودي والأسعار العادلة في ثوانٍ." },
                { title: "تمويل محلي", description: "ربط مباشر مع برامج التمويل العقاري والمدعوم." },
              ]}
            />
            <Button href="/signin" variant="dark">
              ابدأ البحث الآن <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative border-2 border-slate-100 p-8 pt-12 bg-slate-50">
            <div className="bg-white border-2 border-slate-200 h-[500px] relative overflow-hidden flex flex-col uppercase">
              <div className="h-16 bg-slate-900 flex items-center px-6 gap-4">
                <div className="h-8 w-8 rounded-none bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-[10px] font-black">AI</span>
                </div>
                <span className="text-white font-black text-xs uppercase tracking-widest leading-none">ANAN KSA</span>
              </div>
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="bg-slate-100 p-4 max-w-[80%] rounded-none text-sm font-bold text-slate-700 self-start">
                  أهلاً بك، تم تحليل 24 مشروعاً في شمال الرياض بناءً على ميزانيتك.
                </div>
                <div className="bg-slate-900 p-4 max-w-[90%] rounded-none text-sm font-bold text-white self-start space-y-4 border-r-4 border-blue-600">
                  <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                    <span>تحليل التمويل السعودي</span>
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <span className="block text-[10px] uppercase opacity-70">القسط التقريبي</span>
                      <span className="text-xl font-black">١٤,٢٠٠ ريال</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase opacity-70">دعم سكني</span>
                      <span className="text-xl font-black">متاح للطلب</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="dark" id="developers">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1 border-2 border-slate-800 p-8 pt-12 bg-slate-900/50">
            <div className="bg-slate-900 border-2 border-slate-700 h-[500px] p-8 space-y-8 overflow-hidden uppercase">
              <div className="flex justify-between items-center border-b border-slate-800 pb-6">
                <h4 className="text-white font-black uppercase tracking-widest text-xs">KSA Market Pulse</h4>
                <div className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase">Active Analysis</div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <Card
                  variant="dark"
                  title="مؤشر الطلب في الرياض"
                  description="ارتفاع بنسبة ١٢٪ في البحث عن الوحدات الجاهزة."
                />
                <div className="p-6 border border-slate-800 h-48 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <LayoutGrid className="h-8 w-8 text-slate-700 mx-auto" />
                    <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">KSA Demand Map Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-12 order-1 lg:order-2 text-right">
            <SectionLabel
              icon={BarChart3}
              className="inline-flex items-center gap-3 bg-blue-600/10 px-4 py-2 border-r-4 border-blue-500"
              iconClassName="h-5 w-5 text-blue-500"
              textClassName="text-xs font-black uppercase tracking-widest text-blue-400"
            >
              للمطورين العقاريين
            </SectionLabel>
            <h2 className="text-5xl font-black text-white leading-[1.2]">استخبارات <br /><span className="text-blue-500">المشاريع الكبرى</span></h2>
            <p className="text-xl text-slate-400 font-bold leading-relaxed">
              ارفع مشاريعك في بنية عنان التحتية ليتم توزيعها عبر وكلاء الذكاء الاصطناعي للمشترين والمستثمرين في الرياض وجدة والدمام فوراً.
            </p>
            <FeatureCardGrid
              className="grid grid-cols-1 gap-6 pt-4"
              items={[
                {
                  variant: "dark",
                  title: "رؤية السوق الحية",
                  description: "تعرف على ما يبحث عنه المشترون في المملكة الآن وبدقة متناهية.",
                },
              ]}
            />
            <Button href="/developer" variant="primary">
              وزع مشاريعك الآن <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      <Section id="brokers">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <SectionLabel
              icon={Users2}
              className="inline-flex items-center gap-3 bg-slate-100 px-4 py-2 border-r-4 border-slate-900"
              iconClassName="h-5 w-5 text-slate-900"
              textClassName="text-xs font-black uppercase tracking-widest text-slate-900"
            >
              للوسطاء الموثقين
            </SectionLabel>
            <h2 className="text-5xl font-black text-slate-900 leading-[1.2]">شبكة الربط <br /><span className="text-blue-600">بين وسطاء المملكة</span></h2>
            <p className="text-xl text-slate-500 font-bold leading-relaxed">
              منصة الربط الموحدة للوسطاء العقاريين المسجلين في الهيئة العامة للعقار. شارك العروض والطلبات وأغلق صفقاتك بضمان وحماية حقوقك.
            </p>
            <FeatureCardGrid
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4"
              items={[
                { title: "ضمان العمولة", description: "نظام تقني وقانوني يضمن حقوقك في الصفقات المشتركة." },
                { title: "ربط فوري", description: "مطابقة طلبات عملائك مع آلاف العروض الموثقة فوراً." },
              ]}
            />
            <Button href="/broker" variant="dark">
              انضم للشبكة <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative border-2 border-slate-100 p-8 pt-12 bg-white uppercase">
            <div className="bg-slate-50 border-2 border-slate-100 h-[500px] p-6 space-y-8">
              <div className="flex items-center justify-between bg-white p-6 border-b-2 border-blue-600">
                <div className="flex items-center gap-6">
                  <div className="h-10 w-10 bg-slate-100 flex items-center justify-center">
                    <Users2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-slate-900 leading-none">Broker RIYADH</span>
                    <span className="block text-[10px] text-slate-400 mt-1 uppercase">Local Demand</span>
                  </div>
                </div>
                <div className="h-8 w-8 bg-blue-600 flex items-center justify-center">
                  <div className="h-1 w-4 bg-white" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-10 w-10 bg-slate-100 flex items-center justify-center">
                    <Users2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-slate-900 leading-none">Broker JEDDAH</span>
                    <span className="block text-[10px] text-slate-400 mt-1 uppercase">Luxury Offer</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 space-y-8">
                <div className="flex justify-between items-center text-xs font-black">
                  <span className="text-slate-400 uppercase tracking-widest">Safe Settlement</span>
                  <span className="text-blue-600 uppercase tracking-widest">Active</span>
                </div>
                <div className="h-4 bg-slate-100 w-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="slate" className="py-32 border-t-2 border-slate-100">
        <div className="max-w-[1400px] mx-auto space-y-24 text-center">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">بوابة الربط المعتمدة</span>
            <h2 className="text-4xl font-black text-slate-900 uppercase">شركاء البنية التحتية</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="h-12 flex items-center justify-center font-black text-xl tracking-tighter">SAMA_COMPLIANT</div>
            <div className="h-12 flex items-center justify-center font-black text-xl tracking-tighter">GARE_REGESTERED</div>
            <div className="h-12 flex items-center justify-center font-black text-xl tracking-tighter">MUNICIPAL_TECH</div>
            <div className="h-12 flex items-center justify-center font-black text-xl tracking-tighter">ZATCA_BILLING</div>
          </div>
        </div>
      </Section>

      <Section bg="primary" className="py-48 text-center overflow-hidden relative border-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-6xl font-black uppercase leading-tight">جاهز لإغلاق صفقتك <br /> القادمة في الرياض؟</h2>
          <p className="text-xl font-bold opacity-80 max-w-xl mx-auto leading-relaxed">
            انضم إلى مئات المطورين والوسطاء الذين يستخدمون بنية عنان التحتية يومياً للوصول إلى السوق السعودي الحقيقي.
          </p>
          <ActionRow className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
            <Button href="/signin" variant="white" className="border-none px-16 py-6 text-base">ابدأ الآن مجاناً</Button>
            <Button href="/about" variant="outline" className="border-white text-white hover:bg-white/10 px-16 py-6 text-base">تواصل مع الشركاء</Button>
          </ActionRow>
        </div>
      </Section>
    </main>
  );
}
