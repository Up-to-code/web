import BrokerMarketplacePage from "../BrokerMarketplacePage";
import { getOffersMockData } from "../mockData";

/**
 * WHY:   Broker collaboration should be navigable as a first-class offers subpage.
 * WHAT:  Renders the broker-to-broker marketplace from local mock data.
 * HOW:   Filters the shared offers dataset inside the page-local component folder.
 */
export default function BrokerMarketplaceRoute() {
  return <BrokerMarketplacePage items={getOffersMockData()} />;
}
