import { notFound } from "next/navigation";
import { getProjectMockById } from "../../mockData";
import AgPropertyFormEditView from "./AgPropertyFormEditView";

type EditProjectRouteProps = {
  params: Promise<{ projectId: string }>;
};

/**
 * WHY:   Editing a project needs the same rich form as creation, pre-filled with existing data.
 * WHAT:  Server component that loads project by ID and renders the edit form client view.
 * HOW:   Reuses the existing mock data lookup and passes it as initialData to the form.
 */
export default async function EditProjectRoute({ params }: EditProjectRouteProps) {
  const { projectId } = await params;
  const project = getProjectMockById(projectId);

  if (!project) {
    notFound();
  }

  return <AgPropertyFormEditView project={project} />;
}
