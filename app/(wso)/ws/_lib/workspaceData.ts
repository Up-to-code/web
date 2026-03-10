import { redirect } from "next/navigation";
import { DomainError, normalizeDomainError } from "@/server/contracts/errors";
import {
  getWorkspaceSidebarDataForCurrentUser,
  getWorkspaceSnapshotForCurrentUser,
} from "@/server/domains/workspaces/service";

/**
 * WHY: Layout needs user + organizations for sidebar (org name, user/org block).
 * WHAT: Returns { user, organizations } without full profile. Redirects if unauthenticated.
 * HOW: Uses the gateway workspace service and redirects when the session layer reports UNAUTHORIZED.
 */
export async function getLayoutSidebarData(returnTo: string) {
  try {
    return await getWorkspaceSidebarDataForCurrentUser();
  } catch (error) {
    const domainError = normalizeDomainError(error);
    if (domainError.code === "UNAUTHORIZED") {
      redirect(`/signin?returnTo=${encodeURIComponent(returnTo)}`);
    }
    throw domainError;
  }
}

export async function requireWorkspaceData(returnTo: string) {
  try {
    return await getWorkspaceSnapshotForCurrentUser();
  } catch (error) {
    const domainError = normalizeDomainError(error);
    if (domainError.code === "UNAUTHORIZED") {
      redirect(`/signin?returnTo=${encodeURIComponent(returnTo)}`);
    }
    throw new DomainError({
      code: domainError.code,
      message: domainError.message,
      status: domainError.status,
    });
  }
}
