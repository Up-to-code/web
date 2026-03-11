"use client";

import { useState } from "react";
import { Mail, Send, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ZonePageIntro from "../../../../_components/ZoneShell/ZonePageIntro";
import { getCrmMockData } from "../../mockData";

export default function InviteBrokerPage() {
  const router = useRouter();
  const { projects } = getCrmMockData();
  const [formState, setFormState] = useState({
    email: "",
    name: "",
    projectId: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    console.log("Inviting Broker:", formState);
    setIsSent(true);
    setTimeout(() => {
      router.push("/ws/crm/brokers");
    }, 2000);
  };

  if (isSent) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">تم إرسال الدعوة</h2>
          <p className="text-slate-500 mb-6">
            تم إرسال دعوة إلى {formState.email} بنجاح. سيتم إشعارك عند قبول الدعوة.
          </p>
          <Link
            href="/ws/crm/brokers"
            className="inline-flex border border-blue-600 bg-blue-600 px-6 py-3 text-xs font-black tracking-[0.18em] text-white transition hover:border-slate-950 hover:bg-slate-950"
          >
            العودة للقائمة
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="علاقات العمل"
        title="دعوة وسيط جديد"
        description="أرسل دعوة إلى وسيط للانضمام إلى شبكة عملك والتعاون في المشاريع."
      />

      <div className="px-6 py-6 lg:px-8 lg:py-8 max-w-2xl">
        <div className="bg-white p-8 border border-slate-200 space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="h-16 w-16 bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Mail className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">دعوة وسيط</h3>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">ارسل رابط دعوة للانضمام</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">اسم الوسيط</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="مثال: خالد محمد"
                className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">البريد الإلكتروني</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="example@email.com"
                className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">المشروع المراد التعاون فيه</label>
            <div className="relative">
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
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">رسالة مخصصة (اختياري)</label>
            <textarea
              rows={3}
              value={formState.message}
              onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="أدخل رسالة توضح تفاصيل التعاون..."
              className="w-full bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition resize-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleSend}
              disabled={!formState.email || !formState.name}
              className="flex-1 bg-slate-950 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إرسال الدعوة
            </button>
            <Link
              href="/ws/crm/brokers"
              className="flex-1 bg-white border border-slate-200 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 hover:border-blue-600 transition text-center shadow-sm"
            >
              إلغاء
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
