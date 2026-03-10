import { requireSessionContext, type ResolvedSession } from "@/server/auth/session";
import { DomainError, normalizeDomainError } from "@/server/contracts/errors";
import {
  createOrganizationInputSchema,
  type CreateOrganizationInput,
  type OrganizationSummary,
} from "@/server/contracts/organizations";
import { createBrokerOrganization } from "@/server/broker_zone/organizations";
import { createRedOrganization } from "@/server/red_zone/organizations";
import {
  convexOrganizationsRepository,
  type OrganizationsRepository,
} from "@/server/infrastructure/convex/organizationsRepository";

type OrganizationsServiceDependencies = {
  requireSession: () => Promise<ResolvedSession>;
  organizationsRepository: OrganizationsRepository;
};

const defaultDependencies: OrganizationsServiceDependencies = {
  requireSession: requireSessionContext,
  organizationsRepository: convexOrganizationsRepository,
};

/**
 * WHY:   Workspace pages and API routes both need one gateway-owned organization listing path.
 * WHAT:  Returns the organizations linked to the current authenticated user.
 * HOW:   Requires the session once, then delegates listing to the repository adapter with the current token.
 */
export async function listOrganizationsForCurrentUser(
  dependencies: OrganizationsServiceDependencies = defaultDependencies,
): Promise<OrganizationSummary[]> {
  const session = await dependencies.requireSession();
  return dependencies.organizationsRepository.listForUser(session.context.userId);
}

/**
 * WHY:   Organization onboarding is the first business mutation moved behind the Next.js gateway.
 * WHAT:  Validates the create payload, enforces gateway-level access rules, and creates the organization.
 * HOW:   Parses the payload with Zod, blocks admin sessions up front, then delegates to the Convex repository.
 */
export async function createOrganizationForCurrentUser(
  input: unknown,
  dependencies: OrganizationsServiceDependencies = defaultDependencies,
): Promise<OrganizationSummary> {
  const parsed = createOrganizationInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new DomainError({
      code: "INVALID_ARGUMENT",
      message: parsed.error.issues[0]?.message ?? "Invalid organization payload",
      status: 400,
    });
  }

  const session = await dependencies.requireSession();
  if (session.context.role === "admin") {
    throw new DomainError({
      code: "FORBIDDEN",
      message: "Admin accounts cannot create an organization from this flow",
      status: 403,
    });
  }

  try {
    if ((parsed.data as CreateOrganizationInput).type === "broker") {
      return await createBrokerOrganization(
        { name: parsed.data.name },
        {
          requireSession: dependencies.requireSession,
          requireBroker: dependencies.requireSession,
          repository: dependencies.organizationsRepository,
        },
      );
    }

    return await createRedOrganization(
      { name: parsed.data.name },
      {
        requireSession: dependencies.requireSession,
        requireDeveloper: dependencies.requireSession,
        repository: dependencies.organizationsRepository,
      },
    );
  } catch (error) {
    throw normalizeDomainError(error);
  }
}
