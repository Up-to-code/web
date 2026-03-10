import { redirect } from "next/navigation";
import WorkspaceZoneShell from "../../_components/WorkspaceZoneShell";
import { getWorkspaceOrganizationDisplay } from "../../_lib/organizationDisplay";
import { requireWorkspaceData } from "../../_lib/workspaceData";
import { getWorkspaceZone, toZoneShellData } from "../../_lib/zones";
import OffersTabs from "./OffersTabs";

/**
 * WHY:   Offers should open inside a focused shell that removes unrelated workspace noise.
 * WHAT:  Wraps the offers route content with the role-aware offers zone layout.
 * HOW:   Resolves the current workspace role and redirects unsupported roles back to `/ws`.
 */
export default async function OffersZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = await requireWorkspaceData("/ws/offers");
  const zone = getWorkspaceZone(workspace.session.role, "offers");

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
      <div className="flex min-h-full flex-col">
        <OffersTabs />
        <div className="flex-1">{children}</div>
      </div>
    </WorkspaceZoneShell>
  );
}
