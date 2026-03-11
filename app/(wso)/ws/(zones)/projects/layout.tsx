import WorkspaceShell from "../../_components/WorkspaceShell";
import { getWorkspaceOrganizationDisplay } from "../../_lib/organizationDisplay";
import { requireWorkspaceData } from "../../_lib/workspaceData";

/**
 * WHY:   Projects now uses the unified workspace shell - no more separate zone.
 * WHAT:  Wraps the projects route with the main workspace layout.
 */
export default async function ProjectsZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = await requireWorkspaceData("/ws/projects");
  const primaryOrganization = workspace.organizations?.[0];

  if (!primaryOrganization) {
    return <div className="min-h-svh bg-white">{children}</div>;
  }

  return (
    <WorkspaceShell
      user={workspace.user}
      role={workspace.session.role}
      organization={getWorkspaceOrganizationDisplay({
        name: primaryOrganization?.name,
        type: primaryOrganization?.type,
        status: primaryOrganization?.status,
        zoneLabel: "المشاريع",
      })}
    >
      {children}
    </WorkspaceShell>
  );
}
