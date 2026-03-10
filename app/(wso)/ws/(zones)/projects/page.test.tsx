import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WorkspaceProjectsRoute from "./page";

describe("/ws/projects page", () => {
  it("renders the interactive mock projects workspace", async () => {
    const element = await WorkspaceProjectsRoute();
    const markup = renderToStaticMarkup(element);

    expect(markup).toContain("محفظة المشاريع");
    expect(markup).toContain("مالقا ريزيدنس");
    expect(markup).toContain("تكليفات الوسطاء");
    expect(markup).toContain("بدون وسطاء");
    expect(markup).toContain("https://images.unsplash.com");
  });
});
