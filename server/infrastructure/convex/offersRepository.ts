import { fetchQuery } from "convex/nextjs";
import { apiUnsafe } from "@/lib/convexApi";
import type { OfferSummary } from "@/server/contracts/offers";

type OffersApiRefs = {
  listSentOffers: unknown;
  listReceivedOffers: unknown;
  listPublicOffers: unknown;
};

type RawOfferSummary = {
  _id: string;
  propertyId: string;
  price: number;
  status: OfferSummary["status"];
  publicationState?: OfferSummary["publicationState"];
  visibility?: OfferSummary["visibility"];
  message?: string;
  description?: string;
  senderName?: string;
  property?: {
    _id?: string;
    title?: string;
    address?: string;
    price?: number;
  } | null;
};

const offersApi = (apiUnsafe["shared_logic/offers"]) as OffersApiRefs;

function mapOffer(offer: RawOfferSummary): OfferSummary {
  return {
    id: offer._id,
    propertyId: offer.propertyId,
    price: offer.price,
    status: offer.status,
    publicationState: offer.publicationState,
    visibility: offer.visibility,
    message: offer.message,
    description: offer.description,
    senderName: offer.senderName,
    property: offer.property
      ? {
          id: offer.property._id ?? offer.propertyId,
          title: offer.property.title ?? "Untitled property",
          address: offer.property.address ?? "Unknown address",
          price: offer.property.price,
        }
      : null,
  };
}

export type OffersRepository = {
  listSent(): Promise<OfferSummary[]>;
  listReceived(): Promise<OfferSummary[]>;
  listMarketplace(): Promise<OfferSummary[]>;
};

/**
 * WHY:   Workspace offer pages should not call Convex handlers directly from the server page layer.
 * WHAT:  Adapts the shared Convex offers capability into stable web-facing offer DTOs.
 * HOW:   Calls the auth-scoped Convex queries and normalizes embedded property projections for the UI.
 */
export const convexOffersRepository: OffersRepository = {
  async listSent() {
    const offers = (await fetchQuery(offersApi.listSentOffers as never, {} as never)) as RawOfferSummary[];
    return offers.map(mapOffer);
  },

  async listReceived() {
    const offers = (await fetchQuery(offersApi.listReceivedOffers as never, {} as never)) as RawOfferSummary[];
    return offers.map(mapOffer);
  },

  async listMarketplace() {
    const offers = (await fetchQuery(offersApi.listPublicOffers as never, {} as never)) as RawOfferSummary[];
    return offers.map(mapOffer);
  },
};
