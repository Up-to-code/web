"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";
import BrandEmptyState from "../../../_components/WorkspaceBrand/BrandEmptyState";
import FilterChipBar from "../../../_components/Visuals/FilterChipBar";
import PersonCard from "../../../_components/Visuals/PersonCard";
import type { UnitReference } from "../../../_lib/entities";
import {
  addCrmClient,
  updateCrmClient,
  type CrmClientRecord,
  type CrmProjectReference,
  type PipelineStage,
} from "../mockData";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";

type PipelineWorkspaceProps = {
  initialClients: CrmClientRecord[];
  projects: CrmProjectReference[];
};

const STAGE_LABELS: Record<PipelineStage, string> = {
  new: "جديد",
  qualified: "مؤهل",
  proposal: "عرض",
  won: "مغلق",
};

/**
 * WHY:   CRM needs a person-centric board where brokers and clients move through stages with their project or unit relation visible.
 * WHAT:  Renders a draggable pipeline board of person cards plus local-only creation and relation updates.
 * HOW:   Uses native drag-and-drop and immutable mock helpers so the UI stays interactive without backend writes.
 */
export default function PipelineWorkspace({
  initialClients,
  projects,
}: PipelineWorkspaceProps) {
  const [clients, setClients] = useState(initialClients);
  const [activeFilter, setActiveFilter] = useState("all");
  const [draftName, setDraftName] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null);

  const visibleClients = clients.filter((client) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unlinked") return !client.project && !client.broker;
    if (activeFilter === "project-only") return Boolean(client.project) && !client.broker;
    if (activeFilter === "fully-linked") return Boolean(client.project) && Boolean(client.broker);
    if (activeFilter === "vip") return client.badges?.includes("vip");
    return true;
  });

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="إدارة العملاء"
        title="خط الأنابيب"
        description="بطاقات أشخاص قابلة للسحب تمثل العملاء والوسطاء مع المشروع أو الوحدة المرتبطة بكل واحد منهم."
        actions={
          <div className="flex items-center gap-2">
            <input
              value={draftName}
              onChange={(event) => setDraftName(event.currentTarget.value)}
              placeholder="اسم شخص جديد"
              className="border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700"
            />
            <button
              type="button"
              onClick={() => {
                const trimmedName = draftName.trim();
                if (!trimmedName) return;
                setClients((current) =>
                  addCrmClient(current, {
                    id: `client-${trimmedName}`,
                    personType: "client",
                    avatarImage:
                      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=320&q=80",
                    avatarLabel: trimmedName.slice(0, 1),
                    name: trimmedName,
                    stage: "new",
                    budgetLabel: "تجريبي",
                    preference: "احتياج جديد",
                    project: null,
                    unit: null,
                    broker: null,
                    notes: "بطاقة مضافة محلياً من لوحة CRM.",
                  }),
                );
                setDraftName("");
              }}
              className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-3 text-xs font-black tracking-[0.18em] text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              إضافة بطاقة
            </button>
          </div>
        }
      />

      <div className="space-y-6 px-6 py-6 lg:px-8 lg:py-8">
        <FilterChipBar
          chips={[
            { key: "all", label: "الكل" },
            { key: "unlinked", label: "بدون روابط" },
            { key: "project-only", label: "مشروع فقط" },
            { key: "fully-linked", label: "مشروع + وسيط" },
            { key: "vip", label: "VIP" },
          ]}
          activeKey={activeFilter}
          onChange={setActiveFilter}
        />

        <div className="grid gap-4 lg:grid-cols-4">
          {(Object.keys(STAGE_LABELS) as PipelineStage[]).map((stage) => (
            <section
              key={stage}
              className={`space-y-3 border p-4 transition duration-200 ${dragOverStage === stage
                ? "border-blue-400 bg-blue-50/50 outline-dashed outline-2 outline-offset-[-2px] outline-blue-300"
                : "border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]"
                }`}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOverStage(stage);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                if (dragOverStage === stage) setDragOverStage(null);
              }}
              onDrop={() => {
                setDragOverStage(null);
                if (!draggedId) return;
                setClients((current) => updateCrmClient(current, draggedId, { stage }));
                setDraggedId(null);
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-950">{STAGE_LABELS[stage]}</h2>
                <span className="text-xs font-black text-slate-400">
                  {visibleClients.filter((client) => client.stage === stage).length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {visibleClients
                  .filter((client) => client.stage === stage)
                  .map((client) => (
                    <div
                      key={client.id}
                      draggable
                      onDragStart={() => setDraggedId(client.id)}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <PersonCard
                        person={{
                          id: client.id,
                          type: client.personType,
                          name: client.name,
                          title: client.personType === "broker" ? "وسيط" : "عميل",
                          avatarImage: client.avatarImage,
                          avatarLabel: client.avatarLabel,
                          location: client.project?.location,
                          summary: client.preference,
                          stageLabel: STAGE_LABELS[client.stage],
                          badges: client.badges,
                          relation: {
                            project: client.project
                              ? { id: client.project.id, title: client.project.title, location: client.project.location }
                              : null,
                            unit: client.unit,
                            summary: client.notes,
                          },
                        }}
                        footer={
                          <div className="space-y-3 border-t border-slate-200 pt-3">
                            <div className="text-xs font-medium text-slate-500">{client.budgetLabel}</div>
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setClients((current) =>
                                    updateCrmClient(current, client.id, {
                                      project:
                                        client.project?.id === projects[0]?.id ? projects[1] ?? null : projects[0] ?? null,
                                      unit:
                                        client.unit?.id === "malqa-a12"
                                          ? ({ id: "narges-v1", label: "Villa-1", bedrooms: 5, bathrooms: 6, area: "410 م²", priceLabel: "3.8M ر.س" } as UnitReference)
                                          : ({ id: "malqa-a12", label: "A-12", bedrooms: 3, bathrooms: 4, area: "228 م²", priceLabel: "2.35M ر.س" } as UnitReference),
                                    }),
                                  )
                                }
                                className="border border-slate-200 bg-white px-3 py-2 text-[10px] font-black tracking-[0.18em] text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                              >
                                ربط مشروع/وحدة
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setClients((current) =>
                                    updateCrmClient(current, client.id, {
                                      broker: client.broker ? null : initialClients.find((entry) => entry.broker)?.broker ?? null,
                                    }),
                                  )
                                }
                                className="border border-slate-200 bg-white px-3 py-2 text-[10px] font-black tracking-[0.18em] text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                              >
                                تبديل الوسيط
                              </button>
                              <Link
                                href={`/ws/crm/clients/${client.id}`}
                                className="border border-blue-500 bg-blue-500 px-3 py-2 text-[10px] font-black tracking-[0.18em] text-white"
                              >
                                فتح
                              </Link>
                            </div>
                          </div>
                        }
                      />
                    </div>
                  ))}

                {visibleClients.filter((client) => client.stage === stage).length === 0 ? (
                  <BrandEmptyState title="لا توجد بطاقات" description="اسحب بطاقة إلى هذا العمود أو أنشئ بطاقة جديدة." />
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
