import { assertDeveloperSession, requireDeveloperSession } from "@/server/auth/guards";
import { type ResolvedSession, requireSessionContext } from "@/server/auth/session";
import { DomainError } from "@/server/contracts/errors";
import {
  createOrganizationInviteInputSchema,
  type OrganizationInviteSummary,
  type OrganizationSummary,
  type OrganizationTeamMember,
} from "@/server/contracts/organizations";
import {
  convexOrganizationsRepository,
  type OrganizationsRepository,
} from "@/server/infrastructure/convex/organizationsRepository";

type RedOrganizationsDependencies = {
  requireDeveloper: () => Promise<ResolvedSession>;
  requireSession: () => Promise<ResolvedSession>;
  repository: OrganizationsRepository;
};

const defaultDependencies: RedOrganizationsDependencies = {
  requireDeveloper: requireDeveloperSession,
  requireSession: requireSessionContext,
  repository: convexOrganizationsRepository,
};

async function getRedOwnerContext(
  dependencies: Pick<RedOrganizationsDependencies, "requireDeveloper">,
) : Promise<{ session: ResolvedSession; ownerType: "RED"; ownerId: string }> {
  const session = assertDeveloperSession(await dependencies.requireDeveloper());
  const ownerId = session.context.redId;
  if (!ownerId) {
    throw new DomainError({ code: "FORBIDDEN", message: "Developer profile required", status: 403 });
  }
  return { session, ownerType: "RED", ownerId };
}

/**
 * WHY:   Developer workspace flows should read organizations through a developer-owned server entrypoint.
 * WHAT:  Returns developer-linked organizations for the current authenticated developer.
 * HOW:   Requires a developer session, then lists organizations by current auth user id.
 */
export async function listRedOrganizations(
  dependencies: RedOrganizationsDependencies = defaultDependencies,
): Promise<OrganizationSummary[]> {
  const { session } = await getRedOwnerContext(dependencies);
  return dependencies.repository.listForUser(session.context.userId);
}

/**
 * WHY:   Developer organization creation should be explicit and server-owned.
 * WHAT:  Creates the current user's developer organization.
 * HOW:   Requires an authenticated session, then delegates a RED-typed create to the repository.
 */
export async function createRedOrganization(
  input: { name: string },
  dependencies: RedOrganizationsDependencies = defaultDependencies,
): Promise<OrganizationSummary> {
  const session = await dependencies.requireSession();
  return dependencies.repository.createForUser({
    authUserId: session.context.userId,
    email: session.context.email,
    displayName: session.context.name,
    input: { name: input.name, type: "red" },
  });
}

export async function listRedTeamMembers(
  dependencies: RedOrganizationsDependencies = defaultDependencies,
): Promise<OrganizationTeamMember[]> {
  const { ownerType, ownerId } = await getRedOwnerContext(dependencies);
  return dependencies.repository.listTeamMembers({ ownerType, ownerId });
}

export async function listRedTeamInvites(
  dependencies: RedOrganizationsDependencies = defaultDependencies,
): Promise<OrganizationInviteSummary[]> {
  const { ownerType, ownerId } = await getRedOwnerContext(dependencies);
  return dependencies.repository.listTeamInvites({ ownerType, ownerId });
}

export async function createRedTeamInvite(
  input: unknown,
  dependencies: RedOrganizationsDependencies = defaultDependencies,
): Promise<string> {
  const parsed = createOrganizationInviteInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new DomainError({
      code: "INVALID_ARGUMENT",
      message: parsed.error.issues[0]?.message ?? "Invalid invite payload",
      status: 400,
    });
  }
  const { session, ownerType, ownerId } = await getRedOwnerContext(dependencies);
  return dependencies.repository.createTeamInvite({
    ownerType,
    ownerId,
    authUserId: session.context.userId,
    input: parsed.data,
  });
}

export async function cancelRedTeamInvite(
  input: { inviteId: string },
  dependencies: RedOrganizationsDependencies = defaultDependencies,
): Promise<void> {
  const { ownerType, ownerId } = await getRedOwnerContext(dependencies);
  await dependencies.repository.cancelTeamInvite({
    ownerType,
    ownerId,
    inviteId: input.inviteId,
  });
}

export async function acceptRedTeamInvite(
  input: { token: string },
  dependencies: RedOrganizationsDependencies = defaultDependencies,
): Promise<void> {
  const session = await dependencies.requireSession();
  await dependencies.repository.acceptTeamInvite({
    authUserId: session.context.userId,
    token: input.token,
  });
}
