import DeveloperMarketplacePage from "../DeveloperMarketplacePage";
import { getOffersMockData } from "../mockData";

/**
 * WHY:   Developer offers need their own route inside the offers zone navigation.
 * WHAT:  Renders the developer marketplace from the local offers mock dataset.
 * HOW:   Loads colocated mock data on the server and passes it into the page-local component.
 */
export default function DeveloperMarketplaceRoute() {
  return <DeveloperMarketplacePage items={getOffersMockData()} />;
}
