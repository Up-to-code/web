import { DomainError, toErrorResponse } from "@/server/contracts/errors";
import { getWorkspaceSnapshotForCurrentUser } from "@/server/domains/workspaces/service";
import { convexOrganizationsRepository } from "@/server/infrastructure/convex/organizationsRepository";
import { createOrganizationInviteInputSchema } from "@/server/contracts/organizations";

function toOwnerType(type: "broker" | "red") {
  return type === "broker" ? "broker" : "RED";
}

/**
 * WHY:   Organization invite creation needs one HTTP entrypoint for the workspace settings UI.
 * WHAT:  Validates the invite payload and creates a team invite against the current user's primary organization.
 * HOW:   Reuses the existing repository contract and current workspace snapshot without exposing owner ids to the client.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createOrganizationInviteInputSchema.safeParse(body);

    if (!parsed.success) {
      throw new DomainError({
        code: "INVALID_ARGUMENT",
        message: parsed.error.issues[0]?.message ?? "Invalid invite payload",
        status: 400,
      });
    }

    const workspace = await getWorkspaceSnapshotForCurrentUser();
    const organization = workspace.organizations[0];

    if (!organization) {
      throw new DomainError({
        code: "NOT_FOUND",
        message: "No organization found for this workspace",
        status: 404,
      });
    }

    const inviteId = await convexOrganizationsRepository.createTeamInvite({
      ownerType: toOwnerType(organization.type),
      ownerId: organization.id,
      authUserId: workspace.session.userId,
      input: parsed.data,
    });

    return Response.json({ inviteId }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return toErrorResponse(
        new DomainError({
          code: "INVALID_REQUEST",
          message: "Request body must be valid JSON",
          status: 400,
        }),
      );
    }
    return toErrorResponse(error);
  }
}
