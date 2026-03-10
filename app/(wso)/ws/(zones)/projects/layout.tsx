import { redirect } from "next/navigation";
import WorkspaceZoneShell from "../../_components/WorkspaceZoneShell";
import { getWorkspaceOrganizationDisplay } from "../../_lib/organizationDisplay";
import { requireWorkspaceData } from "../../_lib/workspaceData";
import { getWorkspaceZone, toZoneShellData } from "../../_lib/zones";

/**
 * WHY:   The projects route should live inside a focused zone shell instead of reusing the root workspace chrome.
 * WHAT:  Resolves the visible projects zone descriptor for the current role and wraps the zone page content.
 * HOW:   Uses the shared workspace snapshot to determine role visibility and redirects unsupported roles to `/ws`.
 */
export default async function ProjectsZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = await requireWorkspaceData("/ws/projects");
  const zone = getWorkspaceZone(workspace.session.role, "projects");

  if (!zone) {
    redirect("/ws");
  }

  const primaryOrganization = workspace.organizations?.[0];

  return (
    <WorkspaceZoneShell
      zone={toZoneShellData(zone)}
      user={workspace.user}
      organization={getWorkspaceOrganizationDisplay({
        name: primaryOrganization?.name,
        type: primaryOrganization?.type,
        status: primaryOrganization?.status,
        zoneLabel: zone.label,
      })}
    >
      {children}
    </WorkspaceZoneShell>
  );
}
