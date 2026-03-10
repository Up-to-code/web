import { fetchMutation, fetchQuery } from "convex/nextjs";
import { apiUnsafe } from "@/lib/convexApi";
import type {
  CreateOrganizationInput,
  CreateOrganizationInviteInput,
  OrganizationInviteSummary,
  OrganizationSummary,
  OrganizationTeamMember,
} from "@/server/contracts/organizations";

type OrganizationsApiRefs = {
  listOrganizationsByAuthUserId: unknown;
  createOrganizationForAuthUser: unknown;
  listTeamMembersByOwner: unknown;
  listTeamInvitesByOwner: unknown;
  createTeamInviteForOwner: unknown;
  cancelTeamInviteForOwner: unknown;
  acceptTeamInviteForAuthUser: unknown;
};

const agenciesApi = (apiUnsafe[
  "shared_logic/agencies/repositories"
]) as OrganizationsApiRefs;

/**
 * WHY:   Organization reads and writes are the first business operations moving behind the Next.js gateway.
 * WHAT:  Repository contract for listing and creating organizations for the current session user.
 * HOW:   Implementations accept the current Convex auth token and return stable organization DTOs.
 */
export type OrganizationsRepository = {
  listForUser(authUserId: string): Promise<OrganizationSummary[]>;
  createForUser(args: {
    authUserId: string;
    email?: string | null;
    displayName?: string | null;
    input: CreateOrganizationInput;
  }): Promise<OrganizationSummary>;
  listTeamMembers(args: {
    ownerType: "broker" | "RED";
    ownerId: string;
  }): Promise<OrganizationTeamMember[]>;
  listTeamInvites(args: {
    ownerType: "broker" | "RED";
    ownerId: string;
  }): Promise<OrganizationInviteSummary[]>;
  createTeamInvite(args: {
    ownerType: "broker" | "RED";
    ownerId: string;
    authUserId: string;
    input: CreateOrganizationInviteInput;
  }): Promise<string>;
  cancelTeamInvite(args: {
    ownerType: "broker" | "RED";
    ownerId: string;
    inviteId: string;
  }): Promise<void>;
  acceptTeamInvite(args: {
    authUserId: string;
    token: string;
  }): Promise<void>;
};

function ownerArgs(ownerType: "broker" | "RED", ownerId: string) {
  return ownerType === "broker"
    ? { ownerType, ownerBrokerId: ownerId as never }
    : { ownerType, ownerREDId: ownerId as never };
}

/**
 * WHY:   Convex remains the system of record while the Next.js gateway owns HTTP and business orchestration.
 * WHAT:  Convex-backed organization repository implementation.
 * HOW:   Calls internal owner-id and auth-user-id repository functions and projects the results into stable DTOs.
 */
export const convexOrganizationsRepository: OrganizationsRepository = {
  async listForUser(authUserId) {
    const organizations = (await fetchQuery(agenciesApi.listOrganizationsByAuthUserId as never, {
      authUserId,
    } as never)) as OrganizationSummary[];
    return organizations;
  },

  async createForUser({ authUserId, email, displayName, input }) {
    const result = (await fetchMutation(agenciesApi.createOrganizationForAuthUser as never, {
      authUserId,
      email: email ?? undefined,
      displayName: displayName ?? undefined,
      ...input,
    } as never)) as {
      organization: OrganizationSummary;
    };
    return result.organization;
  },

  async listTeamMembers({ ownerType, ownerId }) {
    return fetchQuery(agenciesApi.listTeamMembersByOwner as never, ownerArgs(ownerType, ownerId) as never) as Promise<
      OrganizationTeamMember[]
    >;
  },

  async listTeamInvites({ ownerType, ownerId }) {
    return fetchQuery(agenciesApi.listTeamInvitesByOwner as never, ownerArgs(ownerType, ownerId) as never) as Promise<
      OrganizationInviteSummary[]
    >;
  },

  async createTeamInvite({ ownerType, ownerId, authUserId, input }) {
    return fetchMutation(agenciesApi.createTeamInviteForOwner as never, {
      ...ownerArgs(ownerType, ownerId),
      authUserId,
      ...input,
    } as never) as Promise<string>;
  },

  async cancelTeamInvite({ ownerType, ownerId, inviteId }) {
    await fetchMutation(agenciesApi.cancelTeamInviteForOwner as never, {
      ...ownerArgs(ownerType, ownerId),
      inviteId: inviteId as never,
    } as never);
  },

  async acceptTeamInvite({ authUserId, token }) {
    await fetchMutation(agenciesApi.acceptTeamInviteForAuthUser as never, {
      authUserId,
      token,
    } as never);
  },
};
