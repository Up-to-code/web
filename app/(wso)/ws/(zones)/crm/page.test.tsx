import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WorkspaceCrmRoute from "./page";

describe("/ws/crm page", () => {
  it("renders the mock CRM pipeline with all required relation scenarios", () => {
    const markup = renderToStaticMarkup(<WorkspaceCrmRoute />);

    expect(markup).toContain("خط الأنابيب");
    expect(markup).toContain("منى الغامدي");
    expect(markup).toContain("خالد الدوسري");
    expect(markup).toContain("نورة السبيعي");
    expect(markup).not.toContain("<select");
  });
});
