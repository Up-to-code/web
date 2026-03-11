"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMockOffer, MOCK_PROJECTS } from "../mockData";
import { ImagePlus, Plus, MapPin, DollarSign, Home, FileText, ArrowLeft, Building2, User, ChevronDown, Check } from "lucide-react";

export default function CreateOfferPage() {
  const router = useRouter();
  
  const [offerScenario, setOfferScenario] = useState<"developer" | "broker-project" | "broker-client">("developer");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Custom dropdown click outside handler
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    propertyType: "شقة",
    rooms: "",
    baths: "",
    area: "",
    location: "",
    city: "الرياض",
    price: "",
    summary: "",
    commission: "",
  });

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsDropdownOpen(false);
    
    // Auto-fill SOME info optionally, but NOT the title or summary, as requested. 
    // The user explicitly said: "title and description are our description for the offer, and they're separate from the project"
    const proj = MOCK_PROJECTS.find(p => p.id === projectId);
    if (proj) {
      setFormData(prev => ({
        ...prev,
        price: proj.expectedPrice,
        location: proj.location.split("،")[0],
        city: proj.location.split("،")[1]?.trim() || "الرياض",
        propertyType: proj.type.includes("شقق") ? "شقة" : proj.type.includes("فلل") ? "فلة" : "تاون هاوس",
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.price.trim()) return;

    const activeProject = MOCK_PROJECTS.find(p => p.id === selectedProjectId);

    addMockOffer({
      id: `offer-${Date.now()}`,
      title: formData.title,
      kind: offerScenario === "broker-client" ? "client" : offerScenario === "developer" ? "developer" : "broker",
      image: activeProject?.image || "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      location: `${formData.location}، ${formData.city}`,
      priceLabel: `${formData.price} ر.س`,
      propertyType: formData.propertyType,
      ownerLabel: "حسابي",
      summary: formData.summary,
      project: {
        id: activeProject?.id || `project-${Date.now()}`,
        title: activeProject?.name || "عقار غير محدد",
        rooms: formData.rooms || "4",
        baths: formData.baths || "3",
        area: formData.area || "250",
      },
      projectRefId: activeProject?.id, // Store ref to pull the full project card in detail page
      unit: null,
      broker: null,
      demandLabel: null,
    });

    router.push("/ws/offers");
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const requiresProjectSelection = offerScenario === "developer" || offerScenario === "broker-project";
  const activeSelectedProject = MOCK_PROJECTS.find(p => p.id === selectedProjectId);

  return (
    <div className="flex min-h-full flex-col pb-32">
      <div className="px-6 py-6 lg:px-8 lg:py-8 grid gap-10 max-w-3xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
          <button 
            onClick={() => router.push("/ws/offers")}
            className="h-12 w-12 border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-950">إنشاء فرصة جديدة</h1>
            <p className="text-xs font-bold text-slate-500 mt-1">اطرح عرضاً استثمارياً جديداً للمشاركين في السوق التجاري</p>
          </div>
        </div>

        {/* سيناريو العرض */}
        <div className="grid gap-3">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">1. حدد صفتك ونوع العرض</div>
          <div className="grid sm:grid-cols-3 gap-3">
            <button
              onClick={() => { setOfferScenario("developer"); setSelectedProjectId(""); }}
              className={`p-5 text-right border transition ${
                offerScenario === "developer"
                  ? "bg-slate-950 text-white border-slate-950 shadow-md"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-950"
              }`}
            >
              <Building2 className={`h-6 w-6 mb-4 ${offerScenario === "developer" ? "text-blue-400" : "text-slate-400"}`} />
              <div className="text-sm font-black mb-1">جهة تطوير</div>
              <div className={`text-[10px] font-bold leading-relaxed ${offerScenario === "developer" ? "text-slate-300" : "text-slate-500"}`}>
                تسويق مشروع بالكامل للوسطاء والمستثمرين للتقديم عليه
              </div>
            </button>
            <button
              onClick={() => { setOfferScenario("broker-project"); setSelectedProjectId(""); }}
              className={`p-5 text-right border transition ${
                offerScenario === "broker-project"
                  ? "bg-slate-950 text-white border-slate-950 shadow-md"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-950"
              }`}
            >
              <Home className={`h-6 w-6 mb-4 ${offerScenario === "broker-project" ? "text-blue-400" : "text-slate-400"}`} />
              <div className="text-sm font-black mb-1">تسويق أصل</div>
              <div className={`text-[10px] font-bold leading-relaxed ${offerScenario === "broker-project" ? "text-slate-300" : "text-slate-500"}`}>
                عرض عقار محدد من المحفظة لجذب مشترين محتملين
              </div>
            </button>
            <button
              onClick={() => { setOfferScenario("broker-client"); setSelectedProjectId(""); }}
              className={`p-5 text-right border transition ${
                offerScenario === "broker-client"
                  ? "bg-slate-950 text-white border-slate-950 shadow-md"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-950"
              }`}
            >
              <User className={`h-6 w-6 mb-4 ${offerScenario === "broker-client" ? "text-blue-400" : "text-slate-400"}`} />
              <div className="text-sm font-black mb-1">طلب شراء</div>
              <div className={`text-[10px] font-bold leading-relaxed ${offerScenario === "broker-client" ? "text-slate-300" : "text-slate-500"}`}>
                نشر احتياجات عميل جاهز للحصول على أفضل الخيارات
              </div>
            </button>
          </div>
        </div>

        {/* Custom Project Selection Dropdown */}
        {requiresProjectSelection && (
          <div className="grid gap-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5" /> 2. ركن الأصل العقاري المعروض
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full text-right bg-white transition flex flex-col items-start ${
                  activeSelectedProject 
                    ? "border-2 border-blue-600 shadow-md p-0" 
                    : "border-2 border-dashed border-slate-300 hover:border-blue-400 p-6 items-center justify-center min-h-32 bg-slate-50/50"
                }`}
              >
                {!activeSelectedProject ? (
                  <div className="flex flex-col items-center gap-3 w-full">
                    <Plus className="h-6 w-6 text-slate-400" />
                    <span className="text-sm font-black text-slate-600">انقر لاختيار المشروع من المحفظة...</span>
                  </div>
                ) : (
                  <div className="flex w-full">
                    <div className="w-40 h-auto min-h-32 bg-cover bg-center shrink-0 border-l border-slate-100" style={{ backgroundImage: `url(${activeSelectedProject.image})` }} />
                    <div className="p-5 flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-lg font-black text-slate-950">{activeSelectedProject.name}</div>
                        <div className="text-xs font-black text-blue-600 flex items-center gap-1">تغيير <ChevronDown className="h-3 w-3" /></div>
                      </div>
                      <div className="text-xs font-bold text-slate-500 mb-3">{activeSelectedProject.location} • {activeSelectedProject.type}</div>
                      <p className="text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">{activeSelectedProject.description}</p>
                    </div>
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-[102%] left-0 right-0 z-50 bg-white border border-slate-200 shadow-xl max-h-96 overflow-y-auto">
                  <div className="sticky top-0 bg-slate-50 border-b border-slate-200 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500">
                    مشاريع المحفظة المتاحة للربط
                  </div>
                  {MOCK_PROJECTS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleProjectSelect(p.id)}
                      className={`w-full text-right flex items-stretch border-b border-slate-100 transition hover:bg-blue-50/50 ${selectedProjectId === p.id ? "bg-blue-50/30" : ""}`}
                    >
                      <div className="w-32 h-28 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${p.image})` }} />
                      <div className="p-4 flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-black text-slate-950">{p.name}</div>
                          {selectedProjectId === p.id && <Check className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 mb-2">{p.location} • {p.type}</div>
                        <div className="text-xs font-medium text-slate-600 line-clamp-1">{p.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {!selectedProjectId && (
              <p className="text-[10px] font-bold text-red-500">مطلوب: تذكر تحديد المشروع الذي يشمله هذا العرض كأصل رئيسي.</p>
            )}
          </div>
        )}

        {/* تفاصيل العرض نفسه */}
        <div className="grid gap-6">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {requiresProjectSelection ? "3" : "2"}. تفاصيل الإعلان عن العرض والتسعير
          </div>
          
          <div className="border border-slate-200 bg-white p-6 grid gap-6">
            
            {/* Title & Desc */}
            <div className="grid gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                  عنوان الفرصة المطروحة للتداول
                </label>
                <input
                  type="text"
                  placeholder="مثال: فرصة استثمارية وحصرية للوسطاء لتسويق المجمع..."
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full border-b-2 border-slate-200 bg-transparent py-3 text-lg font-black text-slate-950 placeholder:text-slate-300 focus:border-blue-600 outline-none transition"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                  رسالة العرض / الشروط والأحكام
                </label>
                <textarea
                  rows={4}
                  placeholder="اكتب التسهيلات، خطط الدفع المتاحة، الحوافز، واشتراطات العمولة التفصيلية الخاصة بهذا العرض ليتعرف عليها الوسطاء المتقدمين..."
                  value={formData.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-900 leading-relaxed resize-none outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                  القيمة المالية {offerScenario === "broker-client" ? "للميزانية" : "المستهدفة"}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">SAR</span>
                  <input 
                    type="text" 
                    placeholder="2,500,000" 
                    value={formData.price} 
                    onChange={(e) => updateField("price", e.target.value)}
                    className="w-full border border-slate-200 bg-white p-4 text-base font-black text-slate-950 outline-none focus:ring-1 focus:ring-blue-600 transition pl-12" 
                  />
                </div>
              </div>
              {offerScenario !== "developer" && (
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                    نسبة العمولة المطروحة للشركاء
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">%</span>
                    <input 
                      type="text" 
                      placeholder="2.5" 
                      value={formData.commission} 
                      onChange={(e) => updateField("commission", e.target.value)}
                      className="w-full border border-slate-200 bg-white p-4 text-base font-black text-slate-950 outline-none focus:ring-1 focus:ring-blue-600 transition pl-12" 
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Manual Specs (Only for Client Requests) */}
            {!requiresProjectSelection && (
              <div className="border-t border-slate-100 pt-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Home className="h-3.5 w-3.5" /> مواصفات العقار المطلوب
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">النوع</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => updateField("propertyType", e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 p-3 text-xs font-black text-slate-950 outline-none appearance-none cursor-pointer"
                    >
                      <option>شقة</option><option>فلة</option><option>أرض</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">المدينة</label>
                    <select value={formData.city} onChange={(e) => updateField("city", e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 p-3 text-xs font-black text-slate-950 outline-none appearance-none cursor-pointer">
                      <option>الرياض</option><option>جدة</option><option>الدمام</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">الأحياء المرجوة</label>
                    <input type="text" placeholder="حطين، الملقا..." value={formData.location} onChange={(e) => updateField("location", e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 p-3 text-xs font-black text-slate-950 outline-none focus:ring-1 focus:ring-blue-600 transition" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={requiresProjectSelection && !selectedProjectId}
            className={`w-full py-5 text-sm font-black uppercase tracking-[0.2em] transition flex items-center justify-center gap-2 ${
              requiresProjectSelection && !selectedProjectId
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-slate-950"
            }`}
          >
            نشر العرض واعتماده للعموم
          </button>
        </div>
      </div>
    </div>
  );
}
