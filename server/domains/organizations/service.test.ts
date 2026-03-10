import { describe, expect, it, vi } from "vitest";
import { DomainError } from "@/server/contracts/errors";

vi.mock("@/server/auth/session", () => ({
  requireSessionContext: vi.fn(),
}));

import { createOrganizationForCurrentUser, listOrganizationsForCurrentUser } from "./service";

describe("organizations domain service", () => {
  it("validates create payloads before calling the repository", async () => {
    const requireSession = vi.fn();
    const organizationsRepository = {
      listForUser: vi.fn(),
      createForUser: vi.fn(),
      listTeamMembers: vi.fn(),
      listTeamInvites: vi.fn(),
      createTeamInvite: vi.fn(),
      cancelTeamInvite: vi.fn(),
      acceptTeamInvite: vi.fn(),
    };

    await expect(
      createOrganizationForCurrentUser(
        { name: "A", type: "broker" },
        { requireSession, organizationsRepository },
      ),
    ).rejects.toBeInstanceOf(DomainError);

    expect(requireSession).not.toHaveBeenCalled();
    expect(organizationsRepository.createForUser).not.toHaveBeenCalled();
  });

  it("delegates organization creation to the repository for non-admin sessions", async () => {
    const requireSession = vi.fn(async () => ({
      token: "token-1",
      context: {
        userId: "user-1",
        role: "user",
        isActive: true,
      },
      profile: null,
    }));
    const organizationsRepository = {
      listForUser: vi.fn(),
      createForUser: vi.fn(async () => ({
        id: "broker-1",
        type: "broker" as const,
        name: "Fresh Start Realty",
        slug: "fresh-start-realty",
        status: "active" as const,
        isVerified: false,
      })),
      listTeamMembers: vi.fn(),
      listTeamInvites: vi.fn(),
      createTeamInvite: vi.fn(),
      cancelTeamInvite: vi.fn(),
      acceptTeamInvite: vi.fn(),
    };

    const organization = await createOrganizationForCurrentUser(
      { name: "Fresh Start Realty", type: "broker" },
      { requireSession, organizationsRepository },
    );

    expect(organizationsRepository.createForUser).toHaveBeenCalledWith({
      authUserId: "user-1",
      email: undefined,
      displayName: undefined,
      input: {
        name: "Fresh Start Realty",
        type: "broker",
      },
    });
    expect(organization.slug).toBe("fresh-start-realty");
  });

  it("lists organizations through the repository", async () => {
    const requireSession = vi.fn(async () => ({
      token: "token-1",
      context: {
        userId: "user-1",
        isActive: true,
      },
      profile: null,
    }));
    const organizationsRepository = {
      listForUser: vi.fn(async () => [
        {
          id: "broker-1",
          type: "broker" as const,
          name: "Alpha",
          slug: "alpha",
          status: "active" as const,
          isVerified: false,
        },
      ]),
      createForUser: vi.fn(),
      listTeamMembers: vi.fn(),
      listTeamInvites: vi.fn(),
      createTeamInvite: vi.fn(),
      cancelTeamInvite: vi.fn(),
      acceptTeamInvite: vi.fn(),
    };

    const organizations = await listOrganizationsForCurrentUser({
      requireSession,
      organizationsRepository,
    });

    expect(organizations).toHaveLength(1);
    expect(organizationsRepository.listForUser).toHaveBeenCalledWith("user-1");
  });
});
