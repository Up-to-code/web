import WorkspaceZoneGrid from "./WorkspaceZoneGrid";
import { formatWorkspaceOrganizationName } from "../../_lib/organizationDisplay";
import { getWorkspaceZones, type WorkspaceRole } from "../../_lib/zones";
import type { SessionUser } from "@/lib/serverSession";

type Organization = {
  id: string;
  type: "broker" | "red";
  name: string;
  slug: string;
  status: "active" | "pending" | null;
  isVerified: boolean;
};

type WorkspaceDashboardProps = {
  user: SessionUser;
  organizations: Organization[];
  role?: WorkspaceRole;
};

export default function WorkspaceDashboard({
  user,
  organizations,
  role,
}: WorkspaceDashboardProps) {
  const primaryOrganization = organizations[0];
  const zones = getWorkspaceZones(role);

  return (
    <WorkspaceZoneGrid
      organizationName={formatWorkspaceOrganizationName(primaryOrganization.name)}
      userName={user.name ?? null}
      zones={zones}
    />
  );
}
