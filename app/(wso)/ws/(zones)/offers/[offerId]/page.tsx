import { notFound } from "next/navigation";
import OfferDetailPage from "../OfferDetailPage";
import { getOfferMockById } from "../mockData";

type WorkspaceOfferDetailRouteProps = {
  params: Promise<{ offerId: string }>;
};

/**
 * WHY:   Marketplace cards in the offers zone should open a dedicated item detail surface.
 * WHAT:  Resolves one mock offer and renders its detail page.
 * HOW:   Uses the zone-local lookup helper and returns 404 for unknown ids.
 */
export default async function WorkspaceOfferDetailRoute({
  params,
}: WorkspaceOfferDetailRouteProps) {
  const { offerId } = await params;
  const offer = getOfferMockById(offerId);

  if (!offer) {
    notFound();
  }

  return <OfferDetailPage offer={offer} />;
}
