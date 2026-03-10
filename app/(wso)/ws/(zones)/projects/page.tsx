import ProjectsPage from "./ProjectsPage";
import { getProjectsMockData } from "./mockData";

/**
 * WHY:   The projects root route should stay SSR-first while the mock editing behavior lives inside the page folder.
 * WHAT:  Loads the colocated projects mock dataset and renders the interactive projects workspace.
 * HOW:   Uses static zone-local data instead of backend property queries for the v1 mock app pass.
 */
export default async function WorkspaceProjectsRoute() {
  return <ProjectsPage projects={getProjectsMockData()} />;
}
