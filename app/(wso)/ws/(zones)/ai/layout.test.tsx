import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { requireWorkspaceData, redirect, usePathname } = vi.hoisted(() => ({
  requireWorkspaceData: vi.fn(),
  redirect: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("../../_lib/workspaceData", () => ({
  requireWorkspaceData,
}));

vi.mock("next/navigation", () => ({
  redirect,
  usePathname,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

import AiZoneLayout from "./layout";

describe("/ws/ai layout", () => {
  beforeEach(() => {
    requireWorkspaceData.mockReset();
    redirect.mockReset();
    usePathname.mockReset();
    usePathname.mockReturnValue("/ws/ai");
  });

  it("renders the focused AI zone shell", async () => {
    requireWorkspaceData.mockResolvedValue({
      user: { name: "Ahmed", email: "ahmed@example.com" },
      session: { role: "admin" },
    });

    const element = await AiZoneLayout({ children: <div>Content</div> });
    const markup = renderToStaticMarkup(element);

    expect(markup).toContain("data-slot=\"zone-shell\"");
    expect(markup).toContain("العودة إلى لوحة العمل");
    expect(markup).toContain("المساعد الذكي");
    expect(markup).toContain("السجل");
  });
});
