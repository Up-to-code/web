"use client";

import { useState } from "react";
import * as saudiArabiaExports from "@svg-maps/saudi-arabia";
const saudiArabia = saudiArabiaExports.default || saudiArabiaExports;

import ZonePageIntro from "../../_components/ZoneShell/ZonePageIntro";
import { cn } from "@/lib/utils";
import { MapPin, TrendingUp, BarChart4, MoveRight, ArrowUpRight, Search, Activity, Box, Filter } from "lucide-react";

// Mock Data for the redesigned dashboard
const HOTTEST_CITIES = [
  { city: "الرياض", growth: "+14.2%", volume: "12,450", demand: "مرتفع جداً", retailFriendly: 92 },
  { city: "جدة", growth: "+8.5%", volume: "8,200", demand: "مرتفع", retailFriendly: 85 },
  { city: "الدمام", growth: "+5.1%", volume: "4,100", demand: "متوسط", retailFriendly: 78 },
  { city: "مكة المكرمة", growth: "+11.3%", volume: "6,800", demand: "مرتفع", retailFriendly: 65 },
];

const HOTTEST_AREAS = [
  { area: "حطين", city: "الرياض", pricePerSqm: "11,200", dom: 45, type: "أراضي سكنية" },
  { area: "الملقا", city: "الرياض", pricePerSqm: "10,500", dom: 42, type: "شقق فاخرة" },
  { area: "أبحر الشمالية", city: "جدة", pricePerSqm: "9,400", dom: 55, type: "فلل حديثة" },
  { area: "الشاطئ", city: "الدمام", pricePerSqm: "7,800", dom: 60, type: "تجاري / ضيافة" },
  { area: "الياسمين", city: "الرياض", pricePerSqm: "8,900", dom: 38, type: "شقق فاخرة" },
];

const MARKET_ACTIVITY = [
  { id: 1, type: "بيع فلة", details: "مساحة 450م² - زاوية", location: "النرجس, الرياض", value: "3,200,000", time: "قبل 15 دقيقة" },
  { id: 2, type: "إيجار تجاري", details: "معرض بمساحة 200م²", location: "طريق الملك فهد, الرياض", value: "450,000/سنوياً", time: "قبل 45 دقيقة" },
  { id: 3, type: "بيع أرض", details: "مساحة 900م² - تجاري", location: "الشراع, جدة", value: "4,100,000", time: "قبل ساعتين" },
  { id: 4, type: "بيع شقة", details: "مساحة 140م² - دور علوي", location: "الملقا, الرياض", value: "1,150,000", time: "قبل 3 ساعات" },
];

export default function WorkspaceMarketPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "cities" | "pricing" | "demand">("overview");
  const [activeRegionId, setActiveRegionId] = useState<string>("sa-ri");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-full flex-col pb-32">
      <ZonePageIntro
        eyebrow="المرصد العقاري"
        title="استخبارات السوق العقاري"
        description="تحليل شامل وفوري للطلب، الأسعار، وأكثر المدن والأحياء نشاطاً لدعم قرارات الاستثمار والتطوير المبنية على البيانات."
      />

      <div className="px-6 py-6 lg:px-8 lg:py-8 grid gap-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-px">
          {[
            { id: "overview", label: "الخريطة والمؤشرات", icon: MapPin },
            { id: "cities", label: "أكثر المدن طلباً", icon: Activity },
            { id: "pricing", label: "تحليل الأسعار القمة", icon: TrendingUp },
            { id: "demand", label: "الأحياء والنشاط الحي", icon: BarChart4 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2",
                  isActive 
                    ? "border-blue-600 text-blue-600 bg-blue-50/50" 
                    : "border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Global Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 border border-slate-200 bg-white p-4">
            <div className="relative flex-1 group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition" />
                <input 
                    type="text"
                    placeholder="ابحث عن مدينة، حي، أو نوع عقار للتحليل السريع..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border-none outline-none py-3 pr-12 pl-4 text-sm font-bold text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-600 transition"
                />
            </div>
            <div className="flex gap-2">
                <select className="bg-slate-50 border-none outline-none py-3 px-6 text-xs font-black uppercase tracking-widest text-slate-600 cursor-pointer hover:bg-slate-100 transition min-w-[140px] text-center appearance-none">
                    <option>الفترة: ٣ أشهر</option>
                    <option>الفترة: ٦ أشهر</option>
                    <option>سنة كاملة</option>
                </select>
                <button className="flex items-center gap-2 bg-slate-950 text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition">
                    <Filter className="h-4 w-4" />
                    تطبيق
                </button>
            </div>
        </div>

        {/* --- TAB CONTENT: OVERVIEW & MAP --- */}
        {activeTab === "overview" && (
            <div className="grid xl:grid-cols-[2fr_1fr] gap-6">
                <div className="border border-slate-200 bg-white p-8 animate-in fade-in duration-500 flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-950">الحرارة الجغرافية (المملكة)</h3>
                            <p className="text-xs font-bold text-slate-500 mt-2">تدرج الألوان يعكس حجم التداول العقاري.</p>
                        </div>
                        <div className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                            بيانات مباشرة
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center bg-slate-50 border border-slate-100 p-8 relative min-h-[400px]">
                        <svg
                            viewBox={saudiArabia.viewBox}
                            aria-label={saudiArabia.label}
                            className="w-full h-full max-h-[500px] fill-white stroke-slate-200 stroke-[1.5px] transition-colors duration-300"
                        >
                            {saudiArabia.locations?.map((location: any) => {
                                const isActive = location.id === activeRegionId;
                                // Mock heat coloring logic based on region ID
                                const isHot = ["sa-ri", "sa-mk", "sa-sh"].includes(location.id);
                                const fillClass = isActive ? "fill-blue-600" : (isHot ? "fill-blue-100" : "fill-white");
                                
                                return (
                                    <path
                                        key={location.id}
                                        id={location.id}
                                        name={location.name}
                                        d={location.path}
                                        onClick={() => setActiveRegionId(location.id)}
                                        className={`cursor-pointer transition-all duration-300 ${fillClass} hover:fill-blue-400 stroke-slate-300 hover:stroke-slate-950`}
                                    >
                                        <title>{location.name}</title>
                                    </path>
                                );
                            })}
                        </svg>
                        
                        {/* Map Overlay Stats */}
                        <div className="absolute bottom-6 right-6 border border-slate-200 bg-white p-4 shadow-sm min-w-[200px]">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">المنطقة النشطة</div>
                            <div className="text-lg font-black text-slate-950">{saudiArabia.locations?.find((l:any) => l.id === activeRegionId)?.name || "الرياض"}</div>
                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500">مؤشر الطلب</span>
                                <span className="text-sm font-black text-blue-600">+14.2%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* KPI Cards */}
                    {[
                        { label: "إجمالي الصفقات", value: "84,210", trend: "+5.4%", isPositive: true },
                        { label: "متوسط قيمة الصفقة", value: "1.2M ر.س", trend: "+2.1%", isPositive: true },
                        { label: "متوسط أيام البيع", value: "48 يوماً", trend: "-12%", isPositive: true }, // Lower is better
                        { label: "الوحدات المعروضة", value: "12,400", trend: "-3.5%", isPositive: false }
                    ].map((kpi, idx) => (
                        <div key={idx} className="border border-slate-200 bg-white p-6 animate-in slide-in-from-right-4" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="flex justify-between items-start mb-4 text-right">
                                <div className={cn("px-2 py-1 text-[10px] font-black tracking-widest border", kpi.isPositive ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100")}>
                                    {kpi.trend}
                                </div>
                                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</h4>
                            </div>
                            <div className="text-3xl font-black text-slate-950 text-left" dir="ltr">{kpi.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- TAB CONTENT: HOTTEST CITIES --- */}
        {activeTab === "cities" && (
            <div className="grid gap-6 animate-in fade-in duration-500 xl:grid-cols-2">
                <div className="border border-slate-200 bg-white p-8">
                    <h3 className="text-lg font-black text-slate-950 mb-2">أكثر المدن طلباً (حجم التداول)</h3>
                    <p className="text-xs font-bold text-slate-500 mb-8">يقيس الحجم الإجمالي للصفقات العقارية المكتملة.</p>
                    
                    <div className="flex flex-col gap-6">
                        {HOTTEST_CITIES.map((city, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 flex-row-reverse">
                                        <div className="text-base font-black text-slate-950">{city.city}</div>
                                        <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1">{city.demand}</div>
                                    </div>
                                    <div className="text-sm font-black text-slate-900" dir="ltr">{city.volume}</div>
                                </div>
                                {/* Simple CSS Bar Chart */}
                                <div className="h-3 w-full bg-slate-50 border border-slate-100 overflow-hidden flex justify-end">
                                    <div 
                                        className="h-full bg-blue-600" 
                                        style={{ width: `${Math.max(20, (parseInt(city.volume.replace(',', '')) / 15000) * 100)}%` }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border border-slate-200 bg-white p-8">
                    <h3 className="text-lg font-black text-slate-950 mb-2">مؤشر التجزئة (Retail Friendly)</h3>
                    <p className="text-xs font-bold text-slate-500 mb-8">يقيس مدى جاهزية وتشبع المدينة بالمساحات التجارية المتجزئة.</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {HOTTEST_CITIES.map((city, i) => (
                            <div key={i} className="border border-slate-100 bg-slate-50 p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-blue-600 transition">
                                <div className="relative flex items-center justify-center">
                                    <svg className="w-24 h-24 transform -rotate-90">
                                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                                        <circle 
                                            cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                            strokeDasharray={251} strokeDashoffset={251 - (251 * city.retailFriendly) / 100}
                                            className="text-blue-600 transition-all duration-1000 ease-out" 
                                        />
                                    </svg>
                                    <div className="absolute text-xl font-black text-slate-950">{city.retailFriendly}%</div>
                                </div>
                                <div className="text-sm font-black text-slate-600">{city.city}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* --- TAB CONTENT: PRICING & AREAS --- */}
        {activeTab === "pricing" && (
            <div className="grid gap-6 animate-in fade-in duration-500">
                <div className="border border-slate-200 bg-white">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-black text-slate-950">أعلى الأحياء سعراً (للمتر المربع)</h3>
                            <p className="text-xs font-bold text-slate-500 mt-1">الأسعار تعتمد على الصفقات الموثقة للوحدات السكنية والتجارية.</p>
                        </div>
                        <button className="text-xs font-black text-blue-600 flex items-center gap-1 hover:text-slate-950 transition">
                            عرض التقرير الكامل <ArrowUpRight className="h-3 w-3" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">الترتيب</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">الحي</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">المدينة</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">متوسط السعر (ر.س/م²)</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">نوع العقار الغالب</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">سرعة البيع (أيام)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {HOTTEST_AREAS.map((area, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition group">
                                        <td className="px-6 py-5 text-sm font-black text-slate-300">#{idx + 1}</td>
                                        <td className="px-6 py-5 text-sm font-black text-slate-950 group-hover:text-blue-600 transition">{area.area}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-600">{area.city}</td>
                                        <td className="px-6 py-5 text-sm font-black text-slate-950" dir="ltr">{area.pricePerSqm}</td>
                                        <td className="px-6 py-5">
                                            <span className="bg-slate-100 text-slate-600 px-3 py-1 text-[10px] font-black tracking-widest">{area.type}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 flex-row-reverse justify-end">
                                                <div className="w-16 h-1.5 bg-slate-100 flex justify-end">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${100 - area.dom}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-600">{area.dom}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* --- TAB CONTENT: DEMAND & LIVE ACTIVITY --- */}
        {activeTab === "demand" && (
            <div className="grid xl:grid-cols-2 gap-6 animate-in fade-in duration-500">
                <div className="border border-slate-200 bg-white flex flex-col">
                    <div className="p-6 border-b border-slate-100 pb-4">
                        <h3 className="text-lg font-black text-slate-950">الأكثر طلباً واحتياجاً (الفجوة السوقية)</h3>
                        <p className="text-xs font-bold text-slate-500 mt-1">يُظهر الفجوة بين حجم الطلب والعرض المتاح لمساعدة المطورين.</p>
                    </div>
                    <div className="p-6 flex-1 flex flex-col gap-8 justify-center">
                        {[
                            { title: "شقق تمليك متوسطة (الرياض - حطين)", gap: 75 },
                            { title: "معارض تجارية (جدة - النهضة)", gap: 60 },
                            { title: "مستودعات لوجستية (الدمام - الخالدية)", gap: 85 },
                            { title: "فلل سكنية مصغرة (مكة - العوالي)", gap: 50 },
                        ].map((item, i) => (
                            <div key={i} className="grid gap-2">
                                <div className="flex justify-between items-end">
                                    <div className="text-sm font-black text-slate-900">{item.title}</div>
                                    <div className="text-xs font-black text-orange-600">عجز {item.gap}%</div>
                                </div>
                                <div className="h-2 w-full bg-slate-50 border border-slate-100 overflow-hidden flex justify-end">
                                    <div 
                                        className="h-full bg-orange-500" 
                                        style={{ width: `${item.gap}%` }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border border-slate-200 bg-white flex flex-col">
                    <div className="p-6 border-b border-slate-100 pb-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-black text-slate-950">النشاط الحي في السوق</h3>
                            <p className="text-xs font-bold text-slate-500 mt-1">أحدث الصفقات والعمليات الموثقة بالزمن الفعلي.</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="p-0 overflow-y-auto max-h-[400px]">
                        <div className="flex flex-col">
                            {MARKET_ACTIVITY.map((activity) => (
                                <div key={activity.id} className="p-6 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer flex justify-between items-center flex-row-reverse">
                                    <div className="flex items-start gap-4 flex-row-reverse text-right">
                                        <div className="w-10 h-10 bg-slate-950 text-white flex items-center justify-center shrink-0">
                                            <Box className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-slate-950">{activity.type}</div>
                                            <div className="text-xs font-bold text-slate-500 mt-1">{activity.details}</div>
                                            <div className="text-[10px] font-black tracking-widest text-slate-400 mt-2 uppercase">{activity.location}</div>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-base font-black text-blue-600" dir="ltr">{activity.value}</div>
                                        <div className="text-[10px] font-black text-slate-400 mt-1">{activity.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}
