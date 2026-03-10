"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";
import FilterChipBar from "../../../_components/Visuals/FilterChipBar";
import {
  addMockProject,
  updateProjectPublicationState,
  type WorkspaceProject,
} from "../mockData";
import ProjectsSummary from "./ProjectsSummary";
import ProjectsTable from "./ProjectsTable";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";

type ProjectsWorkspaceProps = {
  initialProjects: WorkspaceProject[];
};

const CREATED_PROJECT: WorkspaceProject = {
  id: "ward-residences",
  title: "ورد ريزيدنس",
  location: "الندى، الرياض",
  priceLabel: "من 1.9M إلى 2.6M ر.س",
  image:
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
  specs: {
    rooms: "3 غرف",
    baths: "4 حمامات",
    area: "230 م²",
    status: "قيد التجهيز",
  },
  publicationState: "draft",
  summary: "مشروع تجريبي جديد أُضيف محلياً لاختبار البطاقات العقارية وربط الوسطاء والعملاء.",
  units: [
    {
      id: "ward-a01",
      label: "A-01",
      bedrooms: 3,
      bathrooms: 4,
      area: "230 م²",
      priceLabel: "1.9M ر.س",
    },
  ],
  brokers: [],
};

/**
 * WHY:   The projects root route needs visual filtering and local-only actions without pushing the whole page into server-mutation mode.
 * WHAT:  Manages mock property creation, chip-based filtering, and visual publication updates for the projects workspace.
 * HOW:   Starts from SSR-provided mock data and keeps UI-only changes in local component state.
 */
export default function ProjectsWorkspace({ initialProjects }: ProjectsWorkspaceProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [filterKey, setFilterKey] = useState("all");

  const summary = {
    total: projects.length,
    linkedBrokers: projects.reduce((total, project) => total + project.brokers.length, 0),
    activeClients: projects.reduce(
      (total, project) => total + project.brokers.filter((broker) => Boolean(broker.clientName)).length,
      0,
    ),
    archivedCount: projects.filter((project) => project.publicationState === "archived").length,
  };

  const filteredProjects = projects.filter((project) => {
    if (filterKey === "all") return true;
    if (filterKey === "linked") return project.brokers.some((broker) => broker.state === "client-linked");
    if (filterKey === "idle") return project.brokers.some((broker) => broker.state === "idle");
    if (filterKey === "empty") return project.brokers.length === 0;
    if (filterKey === "archived") return project.publicationState === "archived";
    return true;
  });

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="المشاريع"
        title="محفظة المشاريع"
        description="بطاقات عقارية مرئية للمشاريع مع وسطاء مرتبطين، حالة العملاء، وإشارات نشر قابلة للتبديل محلياً."
        actions={
          <button
            type="button"
            onClick={() => setProjects((current) => addMockProject(current, CREATED_PROJECT))}
            className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-3 text-xs font-black tracking-[0.18em] text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Plus className="h-4 w-4" />
            إضافة مشروع تجريبي
          </button>
        }
      />

      <div className="space-y-8 px-6 py-6 lg:px-8 lg:py-8">
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
        <ProjectsTable
          projects={filteredProjects}
          onPublicationChange={(projectId, publicationState) => {
            setProjects((current) =>
              updateProjectPublicationState(current, projectId, publicationState),
            );
          }}
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <Link
            href="/ws/projects/assignments"
            className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5 transition hover:-translate-y-0.5 hover:border-blue-200"
          >
            <div className="text-xs font-black tracking-[0.24em] text-blue-700">الوسطاء</div>
            <h2 className="mt-3 text-xl font-black text-slate-950">لوحة تكليفات الوسطاء</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              راجع الوسيط المرتبط بكل مشروع عبر بطاقات مرئية وصور رمزية وحالة العميل الحالية.
            </p>
          </Link>

          <Link
            href="/ws/projects/malqa-residences"
            className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5 transition hover:-translate-y-0.5 hover:border-blue-200"
          >
            <div className="text-xs font-black tracking-[0.24em] text-blue-700">التفاصيل</div>
            <h2 className="mt-3 text-xl font-black text-slate-950">صفحة مشروع كاملة</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              افتح المشروع لرؤية الصورة الرئيسية، المواصفات، الوسطاء، والعملاء المرتبطين به.
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
