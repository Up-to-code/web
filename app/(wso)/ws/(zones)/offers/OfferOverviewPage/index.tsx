"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OfferMarketplaceItem } from "../mockData";
import { deleteMockOffer } from "../mockData";
import Link from "next/link";
import { ArrowLeft, Trash2, Eye, Plus, Filter } from "lucide-react";

type OfferKindFilter = "all" | "developer" | "broker" | "client" | "inbox";

export default function OfferOverviewPage({ items: initialItems }: { items: OfferMarketplaceItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [activeFilter, setActiveFilter] = useState<OfferKindFilter>("all");
  const [deleteTarget, setDeleteTarget] = useState<OfferMarketplaceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items
    .filter((item) => activeFilter === "all" || item.kind === activeFilter)
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.project.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
    });

  const handleDelete = (offer: OfferMarketplaceItem) => {
    deleteMockOffer(offer.id);
    setItems((prev) => prev.filter((i) => i.id !== offer.id));
    setDeleteTarget(null);
  };

  const FILTERS: { id: OfferKindFilter; label: string }[] = [
    { id: "all", label: "جميع العروض" },
    { id: "developer", label: "المطورين" },
    { id: "broker", label: "الوسطاء" },
    { id: "client", label: "العملاء" },
    { id: "inbox", label: "صندوق الربط" },
  ];

  const KIND_LABELS: Record<string, string> = {
    developer: "عرض مطور",
    broker: "تعاون وسيط",
    client: "طلب عميل",
    inbox: "مهمة ربط",
  };

  return (
    <div className="flex min-h-full flex-col pb-32">
      <div className="px-6 py-6 lg:px-8 lg:py-8 grid gap-6">

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-3 text-xs font-black uppercase tracking-widest transition ${
                  activeFilter === f.id
                    ? "bg-slate-950 text-white"
                    : "bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-950 hover:bg-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1 lg:min-w-[260px]">
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث في العروض..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 outline-none py-3 pr-12 pl-4 text-sm font-bold text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex justify-between items-center bg-blue-50/50 border border-blue-100 p-4">
          <div className="flex gap-2">
            <Link
              href="/ws/offers/create"
              className="bg-blue-600 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-slate-950 transition flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              طرح عرض جديد
            </Link>
          </div>
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-4 py-2">
            {filteredItems.length} عرض متاح
          </div>
        </div>

        {/* Offer Cards List */}
        <div className="flex flex-col border border-slate-200 bg-white w-full">
          {filteredItems.length === 0 && (
            <div className="p-16 text-center">
              <div className="text-sm font-black text-slate-400">لا توجد عروض مطابقة لبحثك.</div>
            </div>
          )}
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              className={`group flex flex-col gap-6 p-6 transition hover:bg-slate-50 md:flex-row md:items-start md:justify-between ${
                index !== filteredItems.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-3 relative">
                <div className="flex items-center gap-3">
                  <Link href={`/ws/offers/${item.id}`} className="text-xl font-black text-slate-950 truncate transition-colors hover:text-blue-600">
                    {item.title}
                  </Link>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 bg-slate-50 px-3 py-1 shrink-0">
                    {KIND_LABELS[item.kind] || item.kind}
                  </div>
                  {item.demandLabel && (
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1 shrink-0 hidden lg:block">
                      {item.demandLabel}
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-3xl">
                  <span className="font-bold text-slate-900 border-b border-slate-200 pb-0.5">{item.project.title}</span> • {item.summary}
                </p>
                <div className="mt-2 flex flex-wrap gap-6 items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">السعر</span>
                    <span className="text-sm font-black text-slate-950 mt-1">{item.priceLabel}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-100 hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">المساحة</span>
                    <span className="text-sm font-black text-slate-950 mt-1">{item.project.area}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-100 hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">الموقع</span>
                    <span className="text-sm font-black text-slate-950 mt-1">{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end w-full md:w-auto mt-4 md:mt-0">
                {item.broker && (
                  <div className="text-xs font-bold text-slate-500">
                    الوسيط: <span className="font-black text-slate-900">{item.broker.name}</span>
                  </div>
                )}
                <div className="flex gap-2 w-full md:w-auto">
                  <Link
                    href={`/ws/offers/${item.id}`}
                    className="flex items-center justify-center gap-2 flex-1 md:flex-initial border border-slate-200 bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    استعراض
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="flex items-center justify-center gap-2 border border-red-200 bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setDeleteTarget(null)}>
          <div className="bg-white border border-slate-200 p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-black text-slate-950 mb-2">تأكيد حذف العرض</h3>
            <p className="text-sm font-medium text-slate-500 mb-6">
              سيتم حذف <span className="font-black text-slate-900">&ldquo;{deleteTarget.title}&rdquo;</span> نهائياً. لا يمكن التراجع.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteTarget)}
                className="flex-1 bg-red-600 px-5 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-red-700 transition"
              >
                نعم، حذف نهائي
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-slate-200 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
