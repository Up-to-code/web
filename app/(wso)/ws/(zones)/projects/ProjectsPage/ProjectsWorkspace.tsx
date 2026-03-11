"use client";

import Link from "next/link";
import { Plus, Pencil, FolderOpen } from "lucide-react";
import { useState } from "react";
import FilterChipBar from "../../../_components/Visuals/FilterChipBar";
import {
  addMockProject,
  deleteProject,
  updateProjectPublicationState,
  type WorkspaceProject,
} from "../mockData";
import ProjectsSummary from "./ProjectsSummary";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import AgDeleteConfirmModal from "@/components/shared/ag-aui/AgDeleteConfirmModal";
import AgBrokerAssignmentModal, { type ModalBroker } from "@/components/shared/ag-aui/AgBrokerAssignmentModal";
import AgBrokerProjectsModal, { type BrokerProjectLink } from "@/components/shared/ag-aui/AgBrokerProjectsModal";
import type { BrokerPresence } from "../../../_components/Visuals/BrokerPresenceChip";
type ProjectsWorkspaceProps = {
  initialProjects: WorkspaceProject[];
};

const SYSTEM_BROKERS: ModalBroker[] = [
  { id: "broker-sara", name: "سارة العتيبي", avatarLabel: "س", title: "وسيط استثماري أول", city: "الرياض", email: "sara.otebi@anan.sa", avatarImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80", state: "client-linked" },
  { id: "broker-hamad", name: "حمد الحربي", avatarLabel: "ح", title: "وسيط مشاريع", city: "الرياض", email: "hamad.harbi@anan.sa", avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80", state: "qualified" },
  { id: "broker-rawan", name: "روان السبيعي", avatarLabel: "ر", title: "وسيط فلل فاخرة", city: "الرياض", email: "rawan.subaie@anan.sa", avatarImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=320&q=80", state: "qualified" },
  { id: "broker-fahad", name: "فهد الشمري", avatarLabel: "ف", title: "وسيط ميداني", city: "الرياض", email: "fahad.shamri@anan.sa", avatarImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80", state: "idle" },
  { id: "broker-nora", name: "نورة المطيري", avatarLabel: "ن", title: "وسيط عقاري", city: "جدة", email: "nora.mutairi@anan.sa", state: "idle" },
  { id: "broker-khalid", name: "خالد العنزي", avatarLabel: "خ", title: "مستشار عقاري", city: "الدمام", email: "khalid.anazi@anan.sa", state: "qualified" },
];

type InviteStatus = "invited" | "accepted" | "cancelled";

const publicationLabels: Record<WorkspaceProject["publicationState"], string> = {
  draft: "مسودة",
  published: "منشور",
  archived: "مؤرشف",
};

const CREATED_PROJECT: WorkspaceProject = {
  id: "ward-residences", title: "ورد ريزيدنس", location: "الندى، الرياض",
  priceLabel: "من 1.9M إلى 2.6M ر.س",
  image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
  specs: { rooms: "3 غرف", baths: "4 حمامات", area: "230 م²", status: "قيد التجهيز" },
  publicationState: "draft",
  summary: "مشروع تجريبي جديد أُضيف محلياً لاختبار البطاقات العقارية.",
  units: [{ id: "ward-a01", label: "A-01", bedrooms: 3, bathrooms: 4, area: "230 م²", priceLabel: "1.9M ر.س" }],
  brokers: [],
};

function buildBrokerProjectsMap(projects: WorkspaceProject[]): Record<string, BrokerProjectLink[]> {
  const map: Record<string, BrokerProjectLink[]> = {};
  projects.forEach((project) => {
    project.brokers.forEach((broker) => {
      if (!map[broker.id]) map[broker.id] = [];
      map[broker.id].push({
        projectId: project.id, projectTitle: project.title, projectLocation: project.location,
        stageLabel: broker.relation?.stageLabel ?? "مرتبط",
        unitLabel: broker.relation?.unit?.label ?? broker.unitLabel,
        clientName: broker.clientName,
      });
    });
  });
  return map;
}

export default function ProjectsWorkspace({ initialProjects }: ProjectsWorkspaceProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [filterKey, setFilterKey] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<WorkspaceProject | null>(null);
  const [brokerTarget, setBrokerTarget] = useState<WorkspaceProject | null>(null);
  const [brokerViewTarget, setBrokerViewTarget] = useState<BrokerPresence | null>(null);
  const [assignedMap, setAssignedMap] = useState<Record<string, Set<string>>>(() =>
    Object.fromEntries(initialProjects.map((p) => [p.id, new Set(p.brokers.map((b) => b.id))]))
  );
  // Invite states per (projectId, brokerId)
  const [inviteStates, setInviteStates] = useState<Record<string, Record<string, InviteStatus>>>({});

  const summary = {
    total: projects.length,
    linkedBrokers: projects.reduce((t, p) => t + p.brokers.length, 0),
    activeClients: projects.reduce((t, p) => t + p.brokers.filter((b) => Boolean(b.clientName)).length, 0),
    archivedCount: projects.filter((p) => p.publicationState === "archived").length,
  };

  const filteredProjects = projects.filter((p) => {
    if (filterKey === "all") return true;
    if (filterKey === "linked") return p.brokers.some((b) => b.state === "client-linked");
    if (filterKey === "idle") return p.brokers.some((b) => b.state === "idle");
    if (filterKey === "empty") return p.brokers.length === 0;
    if (filterKey === "archived") return p.publicationState === "archived";
    return true;
  });

  const brokerProjectsMap = buildBrokerProjectsMap(projects);
  const brokerProjects: BrokerProjectLink[] = brokerViewTarget ? (brokerProjectsMap[brokerViewTarget.id] ?? []) : [];

  function handleAssign(projectId: string, brokerId: string) {
    setAssignedMap((prev) => ({ ...prev, [projectId]: new Set([...(prev[projectId] ?? []), brokerId]) }));
  }

  function handleEmailInvite(projectId: string, email: string) {
    // Generate a mock broker id from email
    const mockId = `invite-${email.split("@")[0]}`;
    setInviteStates((prev) => ({
      ...prev,
      [projectId]: { ...(prev[projectId] ?? {}), [mockId]: "invited" },
    }));
  }

  function setInviteStatus(projectId: string, brokerId: string, status: InviteStatus) {
    setInviteStates((prev) => ({
      ...prev,
      [projectId]: { ...(prev[projectId] ?? {}), [brokerId]: status },
    }));
  }

  const inviteStatusLabel: Record<InviteStatus, string> = {
    invited: "دعوة مُرسلة",
    accepted: "تم القبول",
    cancelled: "تم الرفض",
  };
  const inviteStatusColor: Record<InviteStatus, string> = {
    invited: "border-amber-200 bg-amber-50 text-amber-700",
    accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
    cancelled: "border-red-200 bg-red-50 text-red-600 line-through opacity-60",
  };

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="المشاريع"
        title="محفظة المشاريع"
        description="جميع مشاريعك العقارية في مكان واحد — إدارة الوسطاء، تغيير الحالة، والوصول السريع لكل مشروع."
        actions={
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setProjects((c) => addMockProject(c, CREATED_PROJECT))}
              className="inline-flex items-center gap-2 border border-slate-200 bg-transparent px-4 py-3 text-xs font-black tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" />
              محاكاة
            </button>
            <Link
              href="/ws/projects/create"
              className="inline-flex items-center gap-2 border-2 border-blue-600 bg-blue-600 px-6 py-3 text-xs font-black tracking-[0.18em] text-white transition hover:border-slate-950 hover:bg-slate-950"
            >
              <Plus className="h-4 w-4" />
              إنشاء مشروع جديد
            </Link>
          </div>
        }
      />

      <div className="space-y-10 px-6 py-6 lg:px-8 lg:py-8">
        <ProjectsSummary {...summary} />
        <FilterChipBar
          chips={[
            { key: "all", label: "الكل" },
            { key: "linked", label: "مرتبط بعميل" },
            { key: "idle", label: "وسيط بدون عميل" },
            { key: "empty", label: "بدون وسطاء" },
            { key: "archived", label: "مؤرشف" },
          ]}
          activeKey={filterKey}
          onChange={setFilterKey}
        />

        {/* Projects Grid */}
        <div className="grid gap-8 xl:grid-cols-2">
          {filteredProjects.map((project) => {
            const assigned = assignedMap[project.id] ?? new Set(project.brokers.map((b) => b.id));
            const projectInvites = inviteStates[project.id] ?? {};

            return (
              <article
                key={project.id}
                className="group border border-slate-200 bg-white transition-all duration-700 overflow-hidden hover:border-blue-600 hover:shadow-[0_22px_45px_-15px_rgba(0,41,255,0.08)]"
              >
                {/* Image */}
                <div className="overflow-hidden h-52">
                  <div className="h-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 grid gap-5">

                  {/* Title + Price + Publication */}
                  <div className="grid gap-3 text-right">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                          project.publicationState === "published" ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : project.publicationState === "draft" ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-slate-200 bg-slate-50 text-slate-500"
                        }`}>
                          {publicationLabels[project.publicationState]}
                        </span>
                        <span className="border border-slate-100 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-500">
                          {assigned.size} وسيط
                        </span>
                      </div>
                      <div className="shrink-0 border-2 border-blue-600 bg-blue-600 px-3 py-1.5 text-xs font-black text-white">
                        {project.priceLabel}
                      </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-950">{project.title}</h2>
                    <p className="text-sm font-black text-slate-500 tracking-wide">{project.location}</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed line-clamp-2">{project.summary}</p>
                  </div>

                  {/* Specs grid */}
                  <div className="grid grid-cols-4 gap-px bg-slate-100 border border-slate-100">
                    {[
                      { label: "الغرف", value: project.specs.rooms },
                      { label: "الحمامات", value: project.specs.baths },
                      { label: "المساحة", value: project.specs.area },
                      { label: "الحالة", value: project.specs.status },
                    ].map((spec) => (
                      <div key={spec.label} className="bg-white px-2 py-3 text-center transition-colors group-hover:bg-white">
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">{spec.label}</div>
                        <div className="mt-1.5 text-sm font-black text-slate-950">{spec.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Broker chips — clickable */}
                  {project.brokers.length > 0 ? (
                    <div className="grid gap-2">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 text-right">
                        الوسطاء المرتبطون — انقر للتفاصيل
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {project.brokers.map((broker) => (
                          <button
                            key={broker.id}
                            type="button"
                            onClick={() => setBrokerViewTarget(broker)}
                            className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-600 hover:bg-blue-50 transition group/chip"
                          >
                            {broker.avatarImage && (
                              <img src={broker.avatarImage} alt={broker.name} className="h-7 w-7 rounded-full object-cover" />
                            )}
                            <div className="text-right">
                              <div className="text-xs font-black text-slate-900">{broker.name}</div>
                              <div className="text-[9px] font-bold text-slate-400 mt-0.5">
                                {broker.state === "client-linked" ? `عميل: ${broker.clientName}` : broker.state === "qualified" ? "مؤهل" : "متاح"}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed border-slate-200 py-4 text-center text-sm font-bold text-slate-400">
                      لا يوجد وسطاء مرتبطون بهذا المشروع حتى الآن
                    </div>
                  )}

                  {/* Invited brokers with status */}
                  {Object.keys(projectInvites).length > 0 && (
                    <div className="grid gap-2">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 text-right">
                        دعوات الوسطاء
                      </div>
                      {Object.entries(projectInvites).map(([brokerId, status]) => (
                        <div key={brokerId} className="flex items-center justify-between border border-slate-100 bg-slate-50 px-4 py-3">
                          <div className="flex items-center gap-2">
                            {status === "invited" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => setInviteStatus(project.id, brokerId, "accepted")}
                                  className="text-[10px] font-black border border-emerald-600 bg-emerald-600 text-white px-3 py-1.5 hover:bg-emerald-700 transition"
                                >
                                  قبول
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setInviteStatus(project.id, brokerId, "cancelled")}
                                  className="text-[10px] font-black border border-slate-300 px-3 py-1.5 text-slate-500 hover:border-red-400 hover:text-red-600 transition"
                                >
                                  رفض
                                </button>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-right">
                            <span className={`border px-2.5 py-1 text-[9px] font-black tracking-widest ${inviteStatusColor[status]}`}>
                              {inviteStatusLabel[status]}
                            </span>
                            <span className="text-xs font-bold text-slate-700 font-mono" dir="ltr">{brokerId.replace("invite-", "")}@...</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Publication toggle */}
                  <div className="flex items-center gap-1.5 justify-end border-t border-slate-50 pt-3">
                    <span className="text-[10px] font-black text-slate-400 ml-2">حالة النشر:</span>
                    {(["draft", "published", "archived"] as const).map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => setProjects((c) => updateProjectPublicationState(c, project.id, state))}
                        className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border transition ${
                          project.publicationState === state
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600"
                        }`}
                      >
                        {publicationLabels[state]}
                      </button>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(project)}
                        className="flex items-center gap-1.5 border border-slate-200 px-3 py-2.5 text-[10px] font-black text-slate-500 hover:border-red-400 hover:text-red-600 transition"
                      >
                        <FolderOpen className="h-3.5 w-3.5" />
                        حذف
                      </button>
                      <button
                        type="button"
                        onClick={() => setBrokerTarget(project)}
                        className="flex items-center gap-1.5 border border-slate-200 px-3 py-2.5 text-[10px] font-black text-slate-500 hover:border-blue-600 hover:text-blue-600 transition"
                      >
                        إدارة الوسطاء
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/ws/projects/${project.id}/edit`}
                        className="flex items-center gap-1.5 border border-slate-200 px-4 py-2.5 text-[10px] font-black text-slate-700 hover:border-slate-950 hover:bg-slate-950 hover:text-white transition"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        تعديل
                      </Link>
                      <Link
                        href={`/ws/projects/${project.id}`}
                        className="flex items-center gap-2 border-2 border-blue-600 bg-blue-600 px-5 py-2.5 text-xs font-black text-white hover:bg-slate-950 hover:border-slate-950 transition"
                      >
                        فتح المشروع
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Broker assignment modal */}
                <AgBrokerAssignmentModal
                  open={brokerTarget?.id === project.id}
                  onClose={() => setBrokerTarget(null)}
                  projectTitle={project.title}
                  brokers={SYSTEM_BROKERS.map((b) => ({ ...b, alreadyAssigned: assigned.has(b.id) }))}
                  onAssign={(brokerId) => handleAssign(project.id, brokerId)}
                  onInvite={(email) => handleEmailInvite(project.id, email)}
                />
              </article>
            );
          })}
        </div>
      </div>

      {/* Delete confirmation */}
      <AgDeleteConfirmModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) setProjects((c) => deleteProject(c, deleteTarget.id)); }}
        title={`حذف مشروع: ${deleteTarget?.title ?? ""}`}
        description="سيتم إزالة المشروع من المحفظة بشكل نهائي مع كافة الوسطاء والوحدات المرتبطة به."
        confirmLabel="حذف المشروع"
      />

      {/* Broker projects modal (1 broker → N projects) */}
      <AgBrokerProjectsModal
        open={brokerViewTarget !== null}
        onClose={() => setBrokerViewTarget(null)}
        brokerName={brokerViewTarget?.name ?? ""}
        brokerTitle={brokerViewTarget?.title}
        brokerAvatarImage={brokerViewTarget?.avatarImage}
        brokerAvatarLabel={brokerViewTarget?.avatarLabel ?? ""}
        projects={brokerProjects}
      />
    </div>
  );
}
