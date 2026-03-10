import AssignmentsPage from "../AssignmentsPage";
import { getProjectsMockData } from "../mockData";

/**
 * WHY:   The projects zone needs a dedicated broker-assignment route in its local navigation.
 * WHAT:  Renders the cross-project broker assignment board from mock project data.
 * HOW:   Loads the colocated dataset on the server and passes it into the page-local component folder.
 */
export default function ProjectAssignmentsRoute() {
  return <AssignmentsPage projects={getProjectsMockData()} />;
}
