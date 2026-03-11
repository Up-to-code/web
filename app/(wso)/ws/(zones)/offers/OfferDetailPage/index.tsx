"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OfferMarketplaceItem } from "../mockData";
import { deleteMockOffer, MOCK_PROJECTS } from "../mockData";
import { ArrowLeft, Trash2, CheckCircle, Send, MapPin, Home, Bed, Bath, Ruler, DollarSign, User, Tag, MessageCircle, Building2 } from "lucide-react";

export default function OfferDetailPage({ offer }: { offer: OfferMarketplaceItem }) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showApplyConfirm, setShowApplyConfirm] = useState(false);
  const [applied, setApplied] = useState(false);

  const linkedProject = offer.projectRefId ? MOCK_PROJECTS.find(p => p.id === offer.projectRefId) : null;

  const handleDelete = () => {
    deleteMockOffer(offer.id);
    router.push("/ws/offers");
  };

  const handleApply = () => {
    setApplied(true);
    setShowApplyConfirm(false);
  };

  const KIND_LABELS: Record<string, string> = {
    developer: "عرض مطور عقاري",
    broker: "عرض وسيط عقاري",
    client: "طلب عميل مباشر",
    inbox: "فرصة ربط عاجلة",
  };

  return (
    <div className="flex min-h-full flex-col pb-32">
      <div className="px-6 py-6 lg:px-8 lg:py-8 grid gap-6">

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-3 border border-slate-200 bg-white p-4 items-center justify-between">
          <button
            onClick={() => router.push("/ws/offers")}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للسوق
          </button>
          <div className="flex gap-2 flex-wrap">
            {!applied ? (
              <button
                onClick={() => setShowApplyConfirm(true)}
                className="flex items-center gap-2 bg-blue-600 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-slate-950 transition"
              >
                <Send className="h-3.5 w-3.5" />
                أريد التقديم على هذا العرض
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-6 py-3 text-xs font-black uppercase tracking-widest text-emerald-700">
                <CheckCircle className="h-3.5 w-3.5" />
                تم إرسال طلبك بنجاح
              </div>
            )}
            <button
              onClick={() => router.push("/ws/offers/inbox")}
              className="flex items-center gap-2 border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-700 hover:border-blue-600 hover:text-blue-600 transition"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              مراسلة
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 border border-red-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              حذف
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

          {/* Property Details */}
          <div className="grid gap-6">
            {/* Hero Image */}
            <div className="border border-slate-200 overflow-hidden">
              <div className="h-72 lg:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${offer.image})` }} />
            </div>

            {/* Property Specs Grid */}
            <div className="border border-slate-200 bg-white p-6">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Home className="h-3.5 w-3.5" /> مواصفات الأصل العقاري
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center border border-slate-100 bg-slate-50 p-4">
                  <Home className="h-5 w-5 text-slate-400 mb-2" />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">النوع</div>
                  <div className="text-sm font-black text-slate-950 mt-1">{offer.propertyType}</div>
                </div>
                <div className="flex flex-col items-center text-center border border-slate-100 bg-slate-50 p-4">
                  <Bed className="h-5 w-5 text-slate-400 mb-2" />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">الغرف</div>
                  <div className="text-sm font-black text-slate-950 mt-1">{offer.project.rooms}</div>
                </div>
                <div className="flex flex-col items-center text-center border border-slate-100 bg-slate-50 p-4">
                  <Bath className="h-5 w-5 text-slate-400 mb-2" />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">الحمامات</div>
                  <div className="text-sm font-black text-slate-950 mt-1">{offer.project.baths}</div>
                </div>
                <div className="flex flex-col items-center text-center border border-slate-100 bg-slate-50 p-4">
                  <Ruler className="h-5 w-5 text-slate-400 mb-2" />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">المساحة</div>
                  <div className="text-sm font-black text-slate-950 mt-1">{offer.project.area}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border border-slate-200 bg-white p-6">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">وصف العرض</div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">{offer.summary}</p>
            </div>

            {/* Linked Project Card */}
            {linkedProject && (
              <div className="border border-blue-200 bg-blue-50/30 p-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5" /> المشروع المرتبط بالعرض
                </div>
                <div className="flex flex-col sm:flex-row bg-white border border-slate-200">
                  <div className="sm:w-48 h-48 sm:h-auto bg-cover bg-center shrink-0 border-b sm:border-b-0 sm:border-l border-slate-100" style={{ backgroundImage: `url(${linkedProject.image})` }} />
                  <div className="p-5 flex-1 flex flex-col justify-center">
                    <div className="text-lg font-black text-slate-950 mb-1">{linkedProject.name}</div>
                    <div className="text-xs font-bold text-slate-500 mb-3">{linkedProject.location} • {linkedProject.type}</div>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">{linkedProject.description}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Unit Details */}
            {offer.unit && (
              <div className="border border-slate-200 bg-white p-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">تفاصيل الوحدة المحددة</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div><span className="text-[10px] font-black text-slate-400 uppercase block">الرمز</span><span className="text-sm font-black text-slate-950">{offer.unit.label}</span></div>
                  <div><span className="text-[10px] font-black text-slate-400 uppercase block">الغرف</span><span className="text-sm font-black text-slate-950">{offer.unit.bedrooms}</span></div>
                  <div><span className="text-[10px] font-black text-slate-400 uppercase block">الحمامات</span><span className="text-sm font-black text-slate-950">{offer.unit.bathrooms}</span></div>
                  <div><span className="text-[10px] font-black text-slate-400 uppercase block">السعر</span><span className="text-sm font-black text-blue-600">{offer.unit.priceLabel}</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info Panels */}
          <aside className="space-y-4">
            {/* Price */}
            <section className="border border-slate-200 bg-white p-6 border-r-4 border-r-blue-600">
              <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1"><DollarSign className="h-3 w-3" /> السعر المطروح</div>
              <div className="mt-2 text-2xl font-black text-slate-950">{offer.priceLabel}</div>
            </section>

            {/* Location */}
            <section className="border border-slate-200 bg-white p-6">
              <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1"><MapPin className="h-3 w-3" /> الموقع</div>
              <div className="mt-2 text-base font-black text-slate-950">{offer.location}</div>
            </section>

            {/* Owner */}
            <section className="border border-slate-200 bg-white p-6">
              <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1"><User className="h-3 w-3" /> صاحب العرض</div>
              <div className="mt-2 text-base font-black text-slate-950">{offer.ownerLabel}</div>
            </section>

            {/* Kind */}
            <section className="border border-slate-200 bg-white p-6">
              <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1"><Tag className="h-3 w-3" /> تصنيف العرض</div>
              <div className="mt-2 text-sm font-black text-slate-900">{KIND_LABELS[offer.kind]}</div>
            </section>

            {/* Demand */}
            {offer.demandLabel && (
              <section className="border border-blue-200 bg-blue-50 p-6">
                <div className="text-[10px] font-black tracking-widest text-blue-600 uppercase">حالة الطلب</div>
                <div className="mt-2 text-sm font-black text-blue-800">{offer.demandLabel}</div>
              </section>
            )}

            {/* Broker */}
            {offer.broker && (
              <section className="border border-slate-200 bg-white p-6">
                <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">الوسيط المرتبط</div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-950 text-white flex items-center justify-center text-sm font-black shrink-0">
                    {offer.broker.avatarLabel}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-950">{offer.broker.name}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{offer.broker.title}</div>
                  </div>
                </div>
              </section>
            )}

            {/* CTA */}
            {!applied && (
              <button
                onClick={() => setShowApplyConfirm(true)}
                className="w-full bg-blue-600 px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-slate-950 transition flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                تقديم طلب مشاركة
              </button>
            )}
          </aside>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white border border-slate-200 p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-black text-slate-950 mb-2">تأكيد حذف العرض</h3>
            <p className="text-sm font-medium text-slate-500 mb-6">سيتم حذف &ldquo;{offer.title}&rdquo; بشكل نهائي.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-600 px-5 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-red-700 transition">نعم، حذف</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 border border-slate-200 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowApplyConfirm(false)}>
          <div className="bg-white border border-slate-200 p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-black text-slate-950 mb-2">تأكيد التقديم على العرض</h3>
            <p className="text-sm font-medium text-slate-500 mb-2">ستقوم بإرسال طلب مشاركة في هذا العرض:</p>
            <div className="border border-slate-100 bg-slate-50 p-4 my-4">
              <div className="text-base font-black text-slate-950">{offer.title}</div>
              <div className="text-xs font-bold text-slate-500 mt-1">{offer.location} • {offer.priceLabel}</div>
            </div>
            <p className="text-xs font-bold text-slate-400 mb-6">سيتم إرسال الطلب إلى صاحب العرض ({offer.ownerLabel}) للمراجعة والرد.</p>
            <div className="flex gap-3">
              <button onClick={handleApply} className="flex-1 bg-blue-600 px-5 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-slate-950 transition">نعم، إرسال الطلب</button>
              <button onClick={() => setShowApplyConfirm(false)} className="flex-1 border border-slate-200 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
