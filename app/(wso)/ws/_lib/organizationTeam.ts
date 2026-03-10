import {
  convexOrganizationsRepository,
} from "@/server/infrastructure/convex/organizationsRepository";
import { getWorkspaceSnapshotForCurrentUser } from "@/server/domains/workspaces/service";
import type { OrganizationInviteDisplay, OrganizationMemberDisplay } from "./entities";

function toOwnerType(type: "broker" | "red") {
  return type === "broker" ? "broker" : "RED";
}

/**
 * WHY:   Workspace settings pages need one gateway-safe loader for organization members and invites.
 * WHAT:  Returns the current user's primary organization plus its members and pending invites.
 * HOW:   Uses the existing workspace snapshot and organization repository instead of calling Convex directly from pages.
 */
export async function getWorkspaceOrganizationTeam() {
  const workspace = await getWorkspaceSnapshotForCurrentUser();
  const organization = workspace.organizations[0];

  if (!organization) {
    return {
      organization: null,
      members: [] as OrganizationMemberDisplay[],
      invites: [] as OrganizationInviteDisplay[],
      authUserId: workspace.session.userId,
    };
  }

  const ownerType = toOwnerType(organization.type);
  const [members, invites] = await Promise.all([
    convexOrganizationsRepository.listTeamMembers({
      ownerType,
      ownerId: organization.id,
    }),
    convexOrganizationsRepository.listTeamInvites({
      ownerType,
      ownerId: organization.id,
    }),
  ]);

  return {
    organization,
    authUserId: workspace.session.userId,
    members: members.map((member) => ({
      id: member.id,
      name: member.name,
      email: member.email,
      role: (member.role === "manager" || member.role === "viewer" ? member.role : "member") as
        | "manager"
        | "member"
        | "viewer",
      statusLabel: member.isActive ? "نشط" : member.roleStatus ?? "قيد التفعيل",
    })),
    invites: invites.map((invite) => ({
      id: invite.id,
      email: invite.email,
      role: invite.role,
      status: invite.status,
      expiresLabel: new Date(invite.expiresAt).toLocaleDateString("ar-EG"),
    })),
  };
}
