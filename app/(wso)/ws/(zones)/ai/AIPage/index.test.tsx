import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { useSearchParams } = vi.hoisted(() => ({
  useSearchParams: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useSearchParams,
}));

import AIPage from "./index";

describe("AIPage", () => {
  beforeEach(() => {
    useSearchParams.mockReset();
    useSearchParams.mockReturnValue({
      get: () => null,
    });
  });

  it("renders branded AI avatars and keeps a distinct user avatar", () => {
    const markup = renderToStaticMarkup(<AIPage />);

    expect(markup).toContain("data-slot=\"ai-avatar\"");
    expect(markup).toContain("data-slot=\"user-avatar\"");
    expect(markup).toContain("data-ai-motion-logo=\"true\"");
    expect(markup).toContain("اسأل أنان شيئاً...");
  });
});
