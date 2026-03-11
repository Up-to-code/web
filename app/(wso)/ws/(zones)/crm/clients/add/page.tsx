"use client";

import { useState } from "react";
import { UserPlus, MapPin, Home, DollarSign } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ZonePageIntro from "../../../../_components/ZoneShell/ZonePageIntro";
import { getCrmMockData, type CrmClientRecord } from "../../mockData";

export default function AddClientPage() {
  const router = useRouter();
  const { brokers, projects } = getCrmMockData();
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    budget: "",
    preference: "",
    projectId: "",
    brokerId: "",
  });

  const selectedProject = projects.find((p) => p.id === formState.projectId);
  const selectedBroker = brokers.find((b) => b.id === formState.brokerId);

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="إدارة العملاء"
        title="إضافة عميل جديد"
        description="أنشئ ملف عميل جديد وربطه بمشروع ووسيط إن وجد."
      />

      <div className="px-6 py-6 lg:px-8 lg:py-8 max-w-2xl">
        <form className="bg-white p-8 border border-slate-200 space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="h-16 w-16 bg-emerald-50 flex items-center justify-center text-emerald-600">
              <UserPlus className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">بيانات العميل</h3>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">معلومات أساسية للتواصل</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">اسم العميل</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="مثال: أحمد محمد"
                className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">رقم الهاتف</label>
              <input
                type="tel"
                value={formState.phone}
                onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="05xxxxxxxx"
                className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">الميزانية المتوقعة</label>
              <div className="relative">
                <input
                  type="text"
                  value={formState.budget}
                  onChange={(e) => setFormState((prev) => ({ ...prev, budget: e.target.value }))}
                  placeholder="مثال: حتى 2 مليون"
                  className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
                />
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">الاهتمام العقاري</label>
              <div className="relative">
                <input
                  type="text"
                  value={formState.preference}
                  onChange={(e) => setFormState((prev) => ({ ...prev, preference: e.target.value }))}
                  placeholder="مثال: شقة 3 غرف north"
                  className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
                />
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">الروابط والعلاقات</h4>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">المشروع المرتبط</label>
                <select
                  value={formState.projectId}
                  onChange={(e) => setFormState((prev) => ({ ...prev, projectId: e.target.value }))}
                  className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition appearance-none"
                >
                  <option value="">اختر مشروع...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title} - {project.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">الوسيط المسؤول</label>
                <select
                  value={formState.brokerId}
                  onChange={(e) => setFormState((prev) => ({ ...prev, brokerId: e.target.value }))}
                  className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition appearance-none"
                >
                  <option value="">اختر وسيط...</option>
                  {brokers.map((broker) => (
                    <option key={broker.id} value={broker.id}>
                      {broker.name} - {broker.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedProject && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-xs font-black uppercase tracking-widest text-blue-600 mb-1">المشروع المختار</div>
                <div className="text-sm font-bold text-slate-900">{selectedProject.title}</div>
                <div className="text-xs text-slate-500">{selectedProject.location}</div>
              </div>
            )}

            {selectedBroker && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">الوسيط المختار</div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-emerald-100">
                    {selectedBroker.avatarImage ? (
                      <img src={selectedBroker.avatarImage} alt={selectedBroker.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-emerald-600 font-black">
                        {selectedBroker.avatarLabel}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{selectedBroker.name}</div>
                    <div className="text-xs text-slate-500">{selectedBroker.title}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                console.log("Saving Client:", formState);
                router.push("/ws/crm/clients");
              }}
              className="flex-1 bg-slate-950 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-blue-600 transition"
            >
              حفظ العميل
            </button>
            <Link
              href="/ws/crm/clients"
              className="flex-1 bg-white border border-slate-200 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 hover:border-blue-600 transition text-center shadow-sm"
            >
              إلغاء
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
