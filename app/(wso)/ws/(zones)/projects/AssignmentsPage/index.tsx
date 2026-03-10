import Link from "next/link";
import PropertyCard from "../../../_components/Visuals/PropertyCard";
import type { WorkspaceProject } from "../mockData";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";

/**
 * WHY:   Broker assignments should read as visual project-to-broker relationships, not as a plain list.
 * WHAT:  Renders each project as a property card focused on broker assignment and client linkage state.
 * HOW:   Reuses the shared property card while passing broker presence chips for each assigned broker.
 */
export default function AssignmentsPage({ projects }: { projects: WorkspaceProject[] }) {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="المشاريع"
        title="تكليفات الوسطاء"
        description="صورة مرئية لعلاقة كل مشروع بالوسطاء والعملاء المرتبطين بهم داخل نفس المشروع."
      />

      <div className="flex flex-wrap gap-4 px-6 py-6 lg:px-8 lg:py-8">
        {projects.map((project) => (
          <PropertyCard
            key={project.id}
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
            density="compact"
            footer={
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-slate-500">
                  {project.brokers.length > 0
                    ? `عدد الوسطاء المرتبطين: ${project.brokers.length}`
                    : "هذا المشروع لا يملك أي تكليفات حتى الآن."}
                </div>
                {project.units[0] ? (
                  <div className="border border-blue-200 bg-blue-50 px-2 py-1 text-[10px] font-black tracking-[0.16em] text-blue-700">
                    {project.units[0].label}
                  </div>
                ) : null}
                <Link href={`/ws/projects/${project.id}`} className="text-xs font-black tracking-[0.22em] text-blue-700">
                  فتح المشروع
                </Link>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
