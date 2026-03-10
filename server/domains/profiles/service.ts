import { requireSessionContext, type ResolvedSession } from "@/server/auth/session";
import type { ProfileSummary } from "@/server/contracts/profiles";

type ProfilesServiceDependencies = {
  requireSession: () => Promise<ResolvedSession>;
};

const defaultDependencies: ProfilesServiceDependencies = {
  requireSession: requireSessionContext,
};

/**
 * WHY:   The profile endpoint and workspace pages need one shared way to read the current profile.
 * WHAT:  Returns the current authenticated user's profile summary.
 * HOW:   Reuses the auth session context, which already enriches the request with profile data.
 */
export async function getCurrentProfileForCurrentUser(
  dependencies: ProfilesServiceDependencies = defaultDependencies,
): Promise<ProfileSummary | null> {
  const session = await dependencies.requireSession();
  return session.profile;
}
