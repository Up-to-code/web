import OfferOverviewPage from "./OfferOverviewPage";
import { getOffersMockData } from "./mockData";

/**
 * WHY:   The offers root route should present the mock marketplace overview while the workspace stays backend-free in this pass.
 * WHAT:  Loads the zone-local offers dataset and renders the overview page.
 * HOW:   Uses colocated mock data instead of broker/developer server snapshots.
 */
export default function WorkspaceOffersRoute() {
  return <OfferOverviewPage items={getOffersMockData()} />;
}
