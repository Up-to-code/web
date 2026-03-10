import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { usePathname } = vi.hoisted(() => ({
  usePathname: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

import WorkspaceShell from "./WorkspaceShell";

describe("WorkspaceShell", () => {
  beforeEach(() => {
    usePathname.mockReset();
    usePathname.mockReturnValue("/ws");
  });

  it("renders the desktop sidebar shell and mobile nav trigger", () => {
    const markup = renderToStaticMarkup(
      <WorkspaceShell
        user={{ name: "Ahmed", email: "ahmed@example.com" }}
        role="developer"
        organization={{ name: "Alpha", sidebarSubtitle: "لوحة العمل", navbarSubtitle: "مطور · نشط" }}
      >
        <div>Body</div>
      </WorkspaceShell>,
    );

    expect(markup).toContain("data-slot=\"workspace-shell\"");
    expect(markup).toContain("data-slot=\"workspace-sidebar-desktop\"");
    expect(markup).toContain("data-slot=\"workspace-sidebar-trigger\"");
    expect(markup).toContain("Body");
    expect(markup).toContain("Alpha");
    expect(markup).toContain("/ws/notifications");
    expect(markup).toContain("/ws/offers/inbox");
  });
});
