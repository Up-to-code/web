import WorkspaceShell from "../../_components/WorkspaceShell";
import { getWorkspaceOrganizationDisplay } from "../../_lib/organizationDisplay";
import { requireWorkspaceData } from "../../_lib/workspaceData";
import OffersTabs from "./OffersTabs";

/**
 * WHY:   Offers now uses the unified workspace shell - no more separate zone.
 * WHAT:  Wraps the offers route with the main workspace layout.
 */
export default async function OffersZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = await requireWorkspaceData("/ws/offers");
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
        zoneLabel: "العروض",
      })}
    >
      <div className="flex min-h-full flex-col">
        <OffersTabs />
        <div className="flex-1">{children}</div>
      </div>
    </WorkspaceShell>
  );
}
