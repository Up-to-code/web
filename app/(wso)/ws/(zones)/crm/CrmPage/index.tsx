import type { CrmClientRecord, CrmProjectReference } from "../mockData";
import PipelineWorkspace from "../PipelinePage/PipelineWorkspace";

/**
 * WHY:   The CRM root route should stay as a thin server entrypoint while local pipeline editing lives in a client child.
 * WHAT:  Delegates the interactive CRM board to `PipelineWorkspace`.
 * HOW:   Passes SSR-loaded mock clients, brokers, and projects into the client orchestrator.
 */
export default function CrmPage({
  clients,
  projects,
}: {
  clients: CrmClientRecord[];
  projects: CrmProjectReference[];
}) {
  return <PipelineWorkspace initialClients={clients} projects={projects} />;
}
