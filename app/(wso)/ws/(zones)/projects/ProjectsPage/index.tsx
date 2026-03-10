import type { WorkspaceProject } from "../mockData";
import ProjectsWorkspace from "./ProjectsWorkspace";

/**
 * WHY:   The projects route needs one thin page-level orchestrator that assembles the workspace view from local parts.
 * WHAT:  Renders the developer projects header, summary strip, empty state, and inventory list.
 * HOW:   Computes the publication summary from the loaded properties and keeps all route-specific UI inside this folder.
 */
export default function ProjectsPage({ projects }: { projects: WorkspaceProject[] }) {
  return <ProjectsWorkspace initialProjects={projects} />;
}
