import OrganizationOnboarding from "../_components/OrganizationOnboarding";
import WorkspaceDashboard from "./_components/WorkspaceDashboard";
import { requireWorkspaceData } from "../_lib/workspaceData";

type WorkspacePageProps = {
  searchParams: Promise<{
    orgError?: string;
  }>;
};

export default async function WorkspacePage({ searchParams }: WorkspacePageProps) {
  const [{ orgError }, workspace] = await Promise.all([
    searchParams,
    requireWorkspaceData("/ws"),
  ]);

  if (workspace.organizations.length === 0) {
    return (
      <OrganizationOnboarding
        user={workspace.user}
        errorMessage={orgError}
      />
    );
  }

  return (
    <WorkspaceDashboard
      user={workspace.user}
      organizations={workspace.organizations}
      role={workspace.session.role}
    />
  );
}
