import { requireSessionContext, type ResolvedSession } from "@/server/auth/session";
import type { OrganizationSummary } from "@/server/contracts/organizations";
import type { ProfileSummary } from "@/server/contracts/profiles";
import type { SessionContext, SessionUser } from "@/server/contracts/session";
import { toSessionUser } from "@/server/contracts/session";
import {
  convexOrganizationsRepository,
  type OrganizationsRepository,
} from "@/server/infrastructure/convex/organizationsRepository";

export type WorkspaceSnapshot = {
  user: SessionUser;
  session: SessionContext;
  profile: ProfileSummary | null;
  organizations: OrganizationSummary[];
};

type WorkspacesServiceDependencies = {
  requireSession: () => Promise<ResolvedSession>;
  organizationsRepository: OrganizationsRepository;
};

const defaultDependencies: WorkspacesServiceDependencies = {
  requireSession: requireSessionContext,
  organizationsRepository: convexOrganizationsRepository,
};

/**
 * WHY:   The workspace shell needs one composed payload instead of separate direct Convex calls from page files.
 * WHAT:  Returns the current workspace user, session context, profile, and linked organizations.
 * HOW:   Resolves the authenticated session once, then fetches organizations through the repository adapter.
 */
export async function getWorkspaceSnapshotForCurrentUser(
  dependencies: WorkspacesServiceDependencies = defaultDependencies,
): Promise<WorkspaceSnapshot> {
  const session = await dependencies.requireSession();
  const organizations = await dependencies.organizationsRepository.listForUser(session.context.userId);

  return {
    user: toSessionUser(session.context),
    session: session.context,
    profile: session.profile,
    organizations,
  };
}

/**
 * WHY:   Sidebar rendering should not know about the full workspace snapshot contract.
 * WHAT:  Returns the minimal current-user data needed by the workspace shell sidebar.
 * HOW:   Builds on the shared workspace snapshot and narrows the response to user + organizations.
 */
export async function getWorkspaceSidebarDataForCurrentUser(
  dependencies: WorkspacesServiceDependencies = defaultDependencies,
): Promise<Pick<WorkspaceSnapshot, "user" | "organizations">> {
  const snapshot = await getWorkspaceSnapshotForCurrentUser(dependencies);
  return {
    user: snapshot.user,
    organizations: snapshot.organizations,
  };
}
