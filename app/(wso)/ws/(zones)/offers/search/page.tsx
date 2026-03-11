"use client";

import { useState } from "react";
import Link from "next/link";
import { getOffersMockData } from "../mockData";
import { Search, SlidersHorizontal, MapPin, Home, ArrowLeft, Eye } from "lucide-react";

export default function SearchOffersPage() {
  const allItems = getOffersMockData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCity, setFilterCity] = useState("الكل");
  const [filterType, setFilterType] = useState("الكل");
  const [filterKind, setFilterKind] = useState("الكل");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const filteredItems = allItems.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.project.title.toLowerCase().includes(q) && !item.location.toLowerCase().includes(q)) return false;
    }
    if (filterCity !== "الكل" && !item.location.includes(filterCity)) return false;
    if (filterType !== "الكل" && item.propertyType !== filterType) return false;
    if (filterKind !== "الكل" && item.kind !== filterKind) return false;
    return true;
  });

  return (
    <div className="flex min-h-full flex-col pb-32">
      <div className="px-6 py-6 lg:px-8 lg:py-8 grid gap-6">

        {/* Search & Filters */}
        <div className="border border-slate-200 bg-white p-6 grid gap-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <SlidersHorizontal className="h-3.5 w-3.5" /> فلاتر البحث
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم، الحي، أو المشروع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 py-4 pr-14 pl-4 text-base font-black text-slate-950 focus:bg-white focus:ring-1 focus:ring-blue-600 outline-none transition"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                <MapPin className="h-3 w-3 inline ml-1" /> المدينة
              </label>
              <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-950 outline-none appearance-none cursor-pointer">
                <option>الكل</option>
                <option>الرياض</option>
                <option>جدة</option>
                <option>الدمام</option>
                <option>مكة</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                <Home className="h-3 w-3 inline ml-1" /> نوع العقار
              </label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-950 outline-none appearance-none cursor-pointer">
                <option>الكل</option>
                <option>شقة</option>
                <option>فلة</option>
                <option>تاون هاوس</option>
                <option>دوبلكس</option>
                <option>أرض</option>
                <option>تجاري</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">تصنيف العرض</label>
              <select value={filterKind} onChange={(e) => setFilterKind(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-950 outline-none appearance-none cursor-pointer">
                <option>الكل</option>
                <option value="developer">عرض مطور</option>
                <option value="broker">عرض وسيط</option>
                <option value="client">طلب عميل</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">نطاق السعر</label>
              <div className="flex gap-2">
                <input type="text" placeholder="من" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                  className="w-1/2 border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-950 outline-none focus:ring-1 focus:ring-blue-600" />
                <input type="text" placeholder="إلى" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                  className="w-1/2 border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-950 outline-none focus:ring-1 focus:ring-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
          {filteredItems.length} نتيجة
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Link key={item.id} href={`/ws/offers/${item.id}`} className="block group">
              <div className="border border-slate-200 bg-white overflow-hidden hover:border-blue-600 transition">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="p-5 grid gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-950 truncate flex-1 group-hover:text-blue-600 transition">{item.title}</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 shrink-0">
                      {item.kind === "developer" ? "مطور" : item.kind === "broker" ? "وسيط" : "عميل"}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 line-clamp-2">{item.summary}</p>
                  <div className="flex justify-between items-end pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">السعر</div>
                      <div className="text-sm font-black text-slate-950">{item.priceLabel}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">الموقع</div>
                      <div className="text-sm font-black text-slate-700">{item.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="border border-dashed border-slate-300 bg-slate-50 p-16 text-center">
            <div className="text-sm font-black text-slate-400">لا توجد عروض مطابقة لفلاترك الحالية.</div>
            <div className="text-xs font-bold text-slate-400 mt-2">جرب تعديل الفلاتر أو مسح البحث.</div>
          </div>
        )}
      </div>
    </div>
  );
}
