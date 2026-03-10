import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WorkspaceOffersRoute from "./page";

describe("/ws/offers page", () => {
  it("renders the mock marketplace overview", () => {
    const markup = renderToStaticMarkup(<WorkspaceOffersRoute />);

    expect(markup).toContain("سوق العروض");
    expect(markup).toContain("واجهة مرئية موحدة");
    expect(markup).toContain("عرض مطور مفتوح");
    expect(markup).toContain("تعاون وسيط لعميل جاهز");
    expect(markup).toContain("طلب عميل استثماري");
    expect(markup).toContain("صندوق الربط");
  });
});
