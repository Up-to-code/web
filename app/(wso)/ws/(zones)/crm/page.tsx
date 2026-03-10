import CrmPage from "./CrmPage";
import { getCrmMockData } from "./mockData";

/**
 * WHY:   The CRM root route should load mock pipeline data while the v1 zone app remains backend-free.
 * WHAT:  Reads the colocated CRM dataset and renders the interactive pipeline workspace.
 * HOW:   Uses static zone-local data instead of role-specific server queries.
 */
export default function WorkspaceCrmRoute() {
  const data = getCrmMockData();
  return <CrmPage clients={data.clients} projects={data.projects} />;
}
