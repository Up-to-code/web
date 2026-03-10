import ClientMatchesPage from "../ClientMatchesPage";
import { getOffersMockData } from "../mockData";

/**
 * WHY:   Client-demand matching is a distinct offers section with its own local navigation entry.
 * WHAT:  Renders the client-fit matching page using the colocated offers dataset.
 * HOW:   Loads static zone-local data on the server and delegates rendering to the page folder.
 */
export default function ClientMatchesRoute() {
  return <ClientMatchesPage items={getOffersMockData()} />;
}
