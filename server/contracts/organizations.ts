import { z } from "zod";

/**
 * WHY:   Organization creation is the first migrated business mutation in the Next.js gateway.
 * WHAT:  OrganizationSummary is the stable response shape returned by domain services and routes.
 * HOW:   It is derived from Convex organization documents and limited to the fields the web app currently renders.
 */
export type OrganizationSummary = {
  id: string;
  type: "broker" | "red";
  name: string;
  slug: string;
  status: "active" | "pending" | null;
  isVerified: boolean;
  description?: string;
  website?: string;
  contactEmail?: string;
};

/**
 * WHY:   Team management flows need a stable member shape independent of Convex profile records.
 * WHAT:  OrganizationTeamMember captures the subset of profile data rendered by workspace team screens.
 * HOW:   It normalizes userProfiles into a role-safe DTO with only display and access fields.
 */
export type OrganizationTeamMember = {
  id: string;
  authUserId: string;
  name: string;
  email: string;
  role?: string;
  roleStatus?: string;
  isActive?: boolean;
};

/**
 * WHY:   Invite management should not leak raw Convex rows into the web layer.
 * WHAT:  OrganizationInviteSummary is the normalized invite DTO used by server functions and pages.
 * HOW:   It keeps only owner-neutral invite metadata and hides table-specific details.
 */
export type OrganizationInviteSummary = {
  id: string;
  email: string;
  role: "manager" | "member" | "viewer";
  status: "pending" | "accepted" | "canceled";
  token: string;
  expiresAt: number;
  acceptedAt?: number;
};

/**
 * WHY:   The gateway should validate payloads before they reach Convex mutations.
 * WHAT:  Zod schema for organization creation requests.
 * HOW:   Trims the name, enforces a minimum length, and constrains the organization type enum.
 */
export const createOrganizationInputSchema = z.object({
  name: z.string().trim().min(2, "Organization name must be at least 2 characters").max(120),
  type: z.enum(["broker", "red"]),
});

/**
 * WHY:   Domain services and repositories share the same validated create payload.
 * WHAT:  TypeScript inference for the organization creation schema.
 * HOW:   Derived directly from `createOrganizationInputSchema`.
 */
export type CreateOrganizationInput = z.infer<typeof createOrganizationInputSchema>;

export const createOrganizationInviteInputSchema = z.object({
  email: z.string().trim().email("Invite email must be valid"),
  role: z.enum(["manager", "member", "viewer"]),
});

export type CreateOrganizationInviteInput = z.infer<typeof createOrganizationInviteInputSchema>;
