import WorkspaceShell from "../../_components/WorkspaceShell";
import { getWorkspaceOrganizationDisplay } from "../../_lib/organizationDisplay";
import { requireWorkspaceData } from "../../_lib/workspaceData";

/**
 * WHY:   Market now uses the unified workspace shell - no more separate zone.
 * WHAT:  Wraps the market route with the main workspace layout.
 */
export default async function MarketZoneLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const workspace = await requireWorkspaceData("/ws/market");
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
                zoneLabel: "ذكاء السوق",
            })}
        >
            {children}
        </WorkspaceShell>
    );
}
