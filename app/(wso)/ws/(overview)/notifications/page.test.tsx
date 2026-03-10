import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WorkspaceNotificationsPage from "./page";

describe("/ws/notifications page", () => {
  it("renders the visual notifications center", () => {
    const markup = renderToStaticMarkup(<WorkspaceNotificationsPage />);

    expect(markup).toContain("مركز التنبيهات");
    expect(markup).toContain("تم ربط عميل جديد بمشروع مالقا ريزيدنس");
    expect(markup).toContain("صندوق الربط");
  });
});
