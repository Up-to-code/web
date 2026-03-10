import ClientsPage from "../ClientsPage";
import { getCrmMockData } from "../mockData";

/**
 * WHY:   The CRM zone needs a flat client index alongside the pipeline board.
 * WHAT:  Renders the mock client list with broker and project relations.
 * HOW:   Loads the local CRM dataset on the server and passes it into the page-local client list.
 */
export default function WorkspaceCrmClientsRoute() {
  const data = getCrmMockData();
  return <ClientsPage clients={data.clients} />;
}
