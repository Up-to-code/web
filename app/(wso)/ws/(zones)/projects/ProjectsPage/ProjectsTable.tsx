import Link from "next/link";
import PropertyCard from "../../../_components/Visuals/PropertyCard";
import type { WorkspaceProject } from "../mockData";

type ProjectsTableProps = {
  projects: WorkspaceProject[];
  onPublicationChange: (projectId: string, publicationState: WorkspaceProject["publicationState"]) => void;
};

const publicationLabels: Record<WorkspaceProject["publicationState"], string> = {
  draft: "مسودة",
  published: "منشور",
  archived: "مؤرشف",
};

/**
 * WHY:   The projects zone should feel like a property workspace rather than a dense text list.
 * WHAT:  Renders image-first real-estate cards with specs, broker presence chips, and visual publication-state actions.
 * HOW:   Delegates the property shell to the shared visual card and keeps local publication-state buttons in the card footer.
 */
export default function ProjectsTable({ projects, onPublicationChange }: ProjectsTableProps) {
  return (
    <section className="flex flex-wrap gap-4">
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-600">
                {publicationLabels[project.publicationState]}
              </div>
              {project.units[0] ? (
                <div className="border border-blue-200 bg-blue-50 px-3 py-2 text-[10px] font-black tracking-[0.18em] text-blue-700">
                  وحدة بارزة: {project.units[0].label}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {(["draft", "published", "archived"] as const).map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      onPublicationChange(project.id, state);
                    }}
                    className={`border px-3 py-2 text-[11px] font-black uppercase tracking-widest transition ${project.publicationState === state
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-500 hover:border-blue-600 hover:text-blue-600"
                      }`}
                  >
                    {publicationLabels[state]}
                  </button>
                ))}
              </div>
              <Link href={`/ws/projects/${project.id}`} className="text-xs font-black uppercase tracking-widest text-blue-600">
                التفاصيل
              </Link>
            </div>
          }
        />
      ))}
    </section>
  );
}
