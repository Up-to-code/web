import PropertyCard from "../../../_components/Visuals/PropertyCard";
import type { WorkspaceProject } from "../mockData";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";

/**
 * WHY:   Project detail should feel like a real property detail surface inside the workspace.
 * WHAT:  Renders one project's hero card plus broker relationship and publication context.
 * HOW:   Reuses the shared property card and adds a secondary operations panel beside it.
 */
export default function ProjectDetailPage({ project }: { project: WorkspaceProject }) {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro eyebrow="المشاريع" title={project.title} description={project.summary} />

      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-8 lg:py-8">
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
          density="detail"
        />

        <aside className="space-y-4">
          <section className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
            <div className="text-xs font-black tracking-[0.22em] text-blue-700">حالة النشر</div>
            <div className="mt-3 text-2xl font-black text-slate-950">{project.publicationState}</div>
          </section>
          <section className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
            <div className="text-xs font-black tracking-[0.22em] text-blue-700">ملخص العلاقات</div>
            <div className="mt-3 text-sm font-medium leading-7 text-slate-600">
              {project.brokers.length > 0
                ? `مرتبط حالياً بـ ${project.brokers.length} وسيط، منهم ${project.brokers.filter((broker) => broker.clientName).length} يملكون عملاء نشطين.`
                : "لا يوجد أي وسيط أو عميل مرتبط بهذا المشروع حالياً."}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
