import InboxPage from "../InboxPage";
import { getOfferThreadMockData } from "../mockData";

/**
 * WHY:   The offers zone needs a dedicated inbox/connectors route in its tab flow.
 * WHAT:  Renders the operational inbox from the local offers dataset.
 * HOW:   Delegates to the page-local inbox component folder with SSR-loaded mock data.
 */
export default function OffersInboxRoute() {
  return <InboxPage items={getOfferThreadMockData()} />;
}
