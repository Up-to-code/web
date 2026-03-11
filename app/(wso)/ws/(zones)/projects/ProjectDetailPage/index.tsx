"use client";

import { useState } from "react";
import Link from "next/link";
import PropertyCard from "../../../_components/Visuals/PropertyCard";
import type { WorkspaceProject } from "../mockData";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import AgBrokerAssignmentModal, { type ModalBroker } from "@/components/shared/ag-aui/AgBrokerAssignmentModal";
import BrokerPresenceChip from "../../../_components/Visuals/BrokerPresenceChip";
import { UserPlus, Users, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WHY:   Project detail should feel like a real property detail surface with full broker management.
 * WHAT:  Renders one project's hero card plus broker relationship and publication context.
 *        Integrates the AgBrokerAssignmentModal for adding, searching, and inviting brokers.
 * HOW:   Reuses the shared property card and adds a rich operations panel with live broker state.
 */

// All the brokers available in the system (mock roster)
const SYSTEM_BROKERS: ModalBroker[] = [
  {
    id: "broker-sara",
    name: "سارة العتيبي",
    avatarLabel: "س",
    title: "وسيط استثماري أول",
    city: "الرياض",
    email: "sara.otebi@anan.sa",
    avatarImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
    state: "client-linked",
  },
  {
    id: "broker-hamad",
    name: "حمد الحربي",
    avatarLabel: "ح",
    title: "وسيط مشاريع",
    city: "الرياض",
    email: "hamad.harbi@anan.sa",
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
    state: "qualified",
  },
  {
    id: "broker-rawan",
    name: "روان السبيعي",
    avatarLabel: "ر",
    title: "وسيط فلل فاخرة",
    city: "الرياض",
    email: "rawan.subaie@anan.sa",
    avatarImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=320&q=80",
    state: "qualified",
  },
  {
    id: "broker-fahad",
    name: "فهد الشمري",
    avatarLabel: "ف",
    title: "وسيط ميداني",
    city: "الرياض",
    email: "fahad.shamri@anan.sa",
    avatarImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
    state: "idle",
  },
  {
    id: "broker-nora",
    name: "نورة المطيري",
    avatarLabel: "ن",
    title: "وسيط عقاري",
    city: "جدة",
    email: "nora.mutairi@anan.sa",
    state: "idle",
  },
  {
    id: "broker-khalid",
    name: "خالد العنزي",
    avatarLabel: "خ",
    title: "مستشار عقاري",
    city: "الدمام",
    email: "khalid.anazi@anan.sa",
    state: "qualified",
  },
];

export default function ProjectDetailPage({ project }: { project: WorkspaceProject }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [assignedIds, setAssignedIds] = useState<Set<string>>(
    new Set(project.brokers.map((b) => b.id))
  );

  function handleAssign(brokerId: string) {
    setAssignedIds((prev) => new Set([...prev, brokerId]));
  }

  function handleRemove(brokerId: string) {
    setAssignedIds((prev) => {
      const next = new Set(prev);
      next.delete(brokerId);
      return next;
    });
  }

  function handleInvite(email: string) {
    // In a real app this would call an API
    console.log("Inviting broker via email:", email);
  }

  const rosterWithState: ModalBroker[] = SYSTEM_BROKERS.map((b) => ({
    ...b,
    alreadyAssigned: assignedIds.has(b.id),
  }));

  const assignedBrokers = project.brokers.filter((b) => assignedIds.has(b.id));
  const extraAssignedIds = [...assignedIds].filter(
    (id) => !project.brokers.find((b) => b.id === id)
  );
  const extraBrokers = extraAssignedIds
    .map((id) => SYSTEM_BROKERS.find((b) => b.id === id))
    .filter(Boolean) as ModalBroker[];

  return (
    <div className="flex min-h-full flex-col pb-12">
      <ZonePageIntro eyebrow="تفاصيل المشروع" title={project.title} description={project.summary} />

      <div className="grid gap-8 px-6 py-6 lg:grid-cols-[1fr_0.4fr] lg:px-8 lg:py-8">
        {/* LEFT: Project card + units */}
        <div className="space-y-8">
          <PropertyCard
            image={project.image}
            title={project.title}
            location={project.location}
            priceLabel={project.priceLabel}
            summary={project.summary}
            specs={[
              { label: "الغرف", value: project.specs.rooms },
              { label: "الحمامات", value: project.specs.baths },
              { label: "المساحة", value: project.specs.area },
              { label: "الحالة", value: project.specs.status },
            ]}
            brokers={project.brokers}
            density="flexible"
          />

          {/* Broker chips strip from project card — clickable */}
          {assignedIds.size > 0 && (
            <section className="border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 hover:text-slate-950 transition"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  إدارة الوسطاء
                  <ChevronRight className="h-3 w-3" />
                </button>
                <h2 className="text-xl font-black text-slate-950">الوسطاء المرتبطون</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {assignedBrokers.map((broker) => (
                  <div key={broker.id} className="relative">
                    <BrokerPresenceChip broker={broker} className="w-full" />
                    <button
                      type="button"
                      onClick={() => handleRemove(broker.id)}
                      title="إزالة من المشروع"
                      className="absolute top-1.5 left-1.5 h-5 w-5 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:border-red-400 hover:text-red-500 transition z-30"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {extraBrokers.map((broker) => (
                  <div key={broker.id} className="relative group">
                    <div className="inline-flex items-center gap-3 border border-slate-200 bg-slate-50 px-3 py-2.5 w-full">
                      <div className="h-10 w-10 shrink-0 bg-slate-200 flex items-center justify-center">
                        {broker.avatarImage ? (
                          <img
                            src={broker.avatarImage}
                            alt={broker.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-black text-slate-500">{broker.avatarLabel}</span>
                        )}
                      </div>
                      <div className="flex-1 text-right">
                        <div className="text-xs font-black text-slate-900">{broker.name}</div>
                        <div className="text-[10px] font-bold text-slate-400">{broker.title}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(broker.id)}
                      title="إزالة من المشروع"
                      className="absolute top-1.5 left-1.5 h-5 w-5 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:border-red-400 hover:text-red-500 transition z-30"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Units */}
          <section className="border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-950 mb-6">الوحدات المعروضة</h2>
            {project.units.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {project.units.map((unit) => (
                  <div
                    key={unit.id}
                    className="border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-slate-900 border-b-2 border-slate-900 pb-1">
                        {unit.label}
                      </span>
                      <span className="text-xs font-black tracking-widest text-blue-700 bg-blue-50 px-2 py-1">
                        {unit.priceLabel}
                      </span>
                    </div>
                    <div className="flex gap-4 text-[10px] font-bold text-slate-500 tracking-widest">
                      <span>{unit.bedrooms} نوم</span>
                      <span>{unit.bathrooms} دورة</span>
                      <span>{unit.area}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm font-bold text-slate-500">لا توجد وحدات مفصلة حالياً.</div>
            )}
          </section>
        </div>

        {/* RIGHT: Operations sidebar */}
        <aside className="space-y-6">
          {/* Publication status */}
          <section className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6">
            <div className="text-xs font-black tracking-[0.22em] text-blue-700">حالة النشر</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-2xl font-black text-slate-950">
                {project.publicationState === "published"
                  ? "منشور"
                  : project.publicationState === "draft"
                    ? "مسودة"
                    : "مؤرشف"}
              </div>
              <button className="text-[10px] font-black tracking-widest uppercase border-b-2 border-slate-300 text-slate-500 hover:text-slate-900 hover:border-slate-900 transition pb-0.5">
                تغيير
              </button>
            </div>
          </section>

          {/* Broker Management Panel */}
          <section className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "text-xs font-black px-2 py-0.5",
                    assignedIds.size > 0
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  {assignedIds.size}
                </div>
                <div className="text-xs font-black tracking-[0.22em] text-blue-700">الوسطاء المرتبطين</div>
              </div>

              {/* Compact broker rows */}
              <div className="space-y-2">
                {[...project.brokers.filter((b) => assignedIds.has(b.id)), ...extraBrokers.slice(0, 3)].map(
                  (broker) => (
                    <div
                      key={broker.id}
                      className="flex items-center justify-between border border-slate-100 bg-white p-3 hover:border-blue-200 transition"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleRemove(broker.id)}
                          className="h-6 w-6 flex items-center justify-center text-slate-300 hover:text-red-500 transition"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        <span className={cn(
                          "text-[9px] font-black border px-1.5 py-0.5",
                          "state" in broker && broker.state === "client-linked"
                            ? "text-blue-700 bg-blue-50 border-blue-200"
                            : "state" in broker && broker.state === "qualified"
                              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                              : "text-slate-500 bg-slate-50 border-slate-200"
                        )}>
                          {"state" in broker && broker.state === "client-linked"
                            ? "مرتبط"
                            : "state" in broker && broker.state === "qualified"
                              ? "مؤهل"
                              : "متاح"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900">{broker.name}</span>
                          <span className="text-[9px] font-bold text-slate-400">{"title" in broker ? broker.title : ""}</span>
                        </div>
                        <div className="h-8 w-8 flex-shrink-0 bg-slate-100 flex items-center justify-center overflow-hidden">
                          {"avatarImage" in broker && broker.avatarImage ? (
                            <img src={broker.avatarImage} alt={broker.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-[10px] font-black text-slate-400">{broker.avatarLabel}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}

                {assignedIds.size === 0 && (
                  <div className="text-xs font-medium leading-7 text-slate-500 text-center py-4">
                    لا يوجد أي وسيط مرتبط بهذا المشروع حالياً.
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-4 grid gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 border-2 border-blue-600 bg-blue-600 p-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-slate-950 hover:border-slate-950"
              >
                <UserPlus className="h-4 w-4" />
                إضافة أو دعوة وسيط
              </button>
              <Link
                href="/ws/crm/brokers"
                className="flex w-full items-center justify-center gap-2 border border-slate-200 bg-white p-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 transition hover:border-blue-600 hover:text-blue-600"
              >
                <Users className="h-4 w-4" />
                قائمة كل الوسطاء
              </Link>
            </div>
          </section>
        </aside>
      </div>

      {/* Broker Assignment Modal */}
      <AgBrokerAssignmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={project.title}
        brokers={rosterWithState}
        onAssign={handleAssign}
        onInvite={handleInvite}
      />
    </div>
  );
}
