import { beforeEach, describe, expect, it, vi } from "vitest";
import { DomainError } from "@/server/contracts/errors";

const { getWorkspaceSnapshotForCurrentUser } = vi.hoisted(() => ({
  getWorkspaceSnapshotForCurrentUser: vi.fn(),
}));

vi.mock("@/server/domains/workspaces/service", () => ({
  getWorkspaceSnapshotForCurrentUser,
}));

import { GET } from "./route";

describe("GET /api/workspaces", () => {
  beforeEach(() => {
    getWorkspaceSnapshotForCurrentUser.mockReset();
  });

  it("returns the composed workspace payload", async () => {
    getWorkspaceSnapshotForCurrentUser.mockResolvedValue({
      user: {
        id: "user-1",
        name: "Ahmed",
        email: "ahmed@example.com",
        isActive: true,
      },
      session: {
        userId: "user-1",
        role: "broker",
        isActive: true,
      },
      profile: {
        role: "broker",
        roleStatus: "approved",
      },
      organizations: [
        {
          id: "broker-1",
          type: "broker",
          name: "Fresh Start Realty",
          slug: "fresh-start-realty",
          status: "active",
          isVerified: false,
        },
      ],
    });

    const response = await GET();

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.organizations).toHaveLength(1);
    expect(payload.session.role).toBe("broker");
  });

  it("serializes unauthorized errors", async () => {
    getWorkspaceSnapshotForCurrentUser.mockRejectedValue(
      new DomainError({
        code: "UNAUTHORIZED",
        message: "Authentication required",
        status: 401,
      }),
    );

    const response = await GET();

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      code: "UNAUTHORIZED",
      message: "Authentication required",
      status: 401,
    });
  });
});
