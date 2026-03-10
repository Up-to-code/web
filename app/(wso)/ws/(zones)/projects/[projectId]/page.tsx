import { notFound } from "next/navigation";
import ProjectDetailPage from "../ProjectDetailPage";
import { getProjectMockById } from "../mockData";

type WorkspaceProjectDetailRouteProps = {
  params: Promise<{ projectId: string }>;
};

/**
 * WHY:   Project cards and assignment rows should drill into a dedicated project workspace page.
 * WHAT:  Resolves one mock project and renders its detail screen.
 * HOW:   Uses the zone-local mock lookup and returns a 404 when the id is unknown.
 */
export default async function WorkspaceProjectDetailRoute({
  params,
}: WorkspaceProjectDetailRouteProps) {
  const { projectId } = await params;
  const project = getProjectMockById(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
