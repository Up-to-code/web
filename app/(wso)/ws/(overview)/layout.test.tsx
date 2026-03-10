import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { requireWorkspaceData } = vi.hoisted(() => ({
  requireWorkspaceData: vi.fn(),
}));

vi.mock("../_lib/workspaceData", () => ({
  requireWorkspaceData,
}));

vi.mock("../_components/WorkspaceShell", () => ({
  default: ({
    organization,
    children,
  }: {
    organization: { name: string };
    children?: React.ReactNode;
  }) => <div data-slot="workspace-shell">Shell:{organization.name}{children}</div>,
}));

import WorkspaceOverviewLayout from "./layout";

describe("workspace overview layout", () => {
  beforeEach(() => {
    requireWorkspaceData.mockReset();
  });

  it("renders the shared workspace shell for overview routes", async () => {
    requireWorkspaceData.mockResolvedValue({
      user: { name: "Ahmed", email: "ahmed@example.com" },
      session: { role: "developer" },
      organizations: [
        {
          id: "org-1",
          type: "red",
          name: "Alpha",
          slug: "alpha",
          status: "active",
          isVerified: true,
        },
      ],
    });

    const element = await WorkspaceOverviewLayout({ children: <div>Body</div> });
    const markup = renderToStaticMarkup(element);

    expect(markup).toContain("data-slot=\"workspace-shell\"");
    expect(markup).toContain("Shell:Alpha");
    expect(markup).toContain("Body");
  });
});
