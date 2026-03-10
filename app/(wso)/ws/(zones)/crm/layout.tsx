import { redirect } from "next/navigation";
import WorkspaceZoneShell from "../../_components/WorkspaceZoneShell";
import { getWorkspaceOrganizationDisplay } from "../../_lib/organizationDisplay";
import { requireWorkspaceData } from "../../_lib/workspaceData";
import { getWorkspaceZone, toZoneShellData } from "../../_lib/zones";

/**
 * WHY:   CRM needs its own focused shell because deal management should not compete with the root workspace overview.
 * WHAT:  Wraps the CRM route in the current role-visible CRM zone layout.
 * HOW:   Resolves the workspace role and redirects unsupported roles back to `/ws`.
 */
export default async function CrmZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = await requireWorkspaceData("/ws/crm");
  const zone = getWorkspaceZone(workspace.session.role, "crm");

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
