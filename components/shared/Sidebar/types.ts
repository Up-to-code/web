import type { SessionUser } from "@/lib/serverSession";
import type { WorkspaceOrganizationDisplay } from "@/app/(wso)/ws/_lib/organizationDisplay";

export type SidebarMode = "desktop" | "drawer";

export type SidebarUser = Pick<SessionUser, "name" | "email">;

export type SidebarProps = {
  user: SidebarUser;
  organization: WorkspaceOrganizationDisplay;
  role?: string | null;
  mode?: SidebarMode;
  className?: string;
  titleId?: string;
  onNavigate?: () => void;
};
