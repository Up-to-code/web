import { z } from "zod";

export const offerStatusSchema = z.enum(["pending", "accepted", "rejected"]);
export const offerPublicationStateSchema = z.enum(["draft", "published", "archived"]);
export const offerVisibilitySchema = z.enum(["public", "private"]);

export type OfferPropertySummary = {
  id: string;
  title: string;
  address: string;
  price?: number;
};

export type OfferSummary = {
  id: string;
  propertyId: string;
  price: number;
  status: z.infer<typeof offerStatusSchema>;
  publicationState?: z.infer<typeof offerPublicationStateSchema>;
  visibility?: z.infer<typeof offerVisibilitySchema>;
  message?: string;
  description?: string;
  senderName?: string;
  property?: OfferPropertySummary | null;
};

export type OffersSnapshot = {
  sent: OfferSummary[];
  received: OfferSummary[];
  marketplace: OfferSummary[];
};
