import { redirect } from "next/navigation";
import WorkspaceZoneShell from "../../_components/WorkspaceZoneShell";
import { getWorkspaceOrganizationDisplay } from "../../_lib/organizationDisplay";
import { requireWorkspaceData } from "../../_lib/workspaceData";
import { getWorkspaceZone, toZoneShellData } from "../../_lib/zones";

/**
 * WHY:   The AI route should share the same focused zone framing as the other workspace subareas.
 * WHAT:  Wraps the AI page in the current role-visible AI zone shell.
 * HOW:   Resolves the workspace role, loads the AI zone descriptor, and redirects unsupported roles to `/ws`.
 */
export default async function AiZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = await requireWorkspaceData("/ws/ai");
  const zone = getWorkspaceZone(workspace.session.role, "ai");

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
