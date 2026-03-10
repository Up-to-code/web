import { Building2, FileText, IndianRupee, MapPin, Tag, ChevronDown, Plus } from "lucide-react";

export default function AgPropertyForm() {
    return (
        <div className="w-full bg-white p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between   pb-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600">
                        <Plus className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">منشئ الأصول</div>
                        <h3 className="text-sm font-black text-slate-900">إنشاء وحدة عقارية جديدة</h3>
                    </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">الخطوة 1 من 3</div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">اسم العقار</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="مثال: شقة حي الصحافة"
                            className="w-full   bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
                        />
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">السعر (سنوي)</label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full   bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">ر.س</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">الموقع</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="حدد الموقع الجغرافي..."
                        className="w-full   bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">الوصف</label>
                <textarea
                    rows={3}
                    placeholder="أدخل وصفاً تفصيلياً للعقار..."
                    className="w-full   bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition resize-none"
                ></textarea>
            </div>

            <div className="flex items-center gap-4 pt-4  ">
                <button className="flex-1   bg-slate-950 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-blue-600 hover:border-blue-600 transition">
                    حفظ كمسودة
                </button>
                <button className="flex-1   bg-white py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 hover:border-blue-600 transition">
                    استمرار
                </button>
            </div>
        </div>
    );
}
