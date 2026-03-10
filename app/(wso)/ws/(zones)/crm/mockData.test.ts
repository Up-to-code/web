import { describe, expect, it } from "vitest";
import { addCrmClient, getCrmMockData, updateCrmClient } from "./mockData";

describe("crm mock helpers", () => {
  it("prepends a newly created client", () => {
    const clients = getCrmMockData().clients;
    const updated = addCrmClient(clients, {
      id: "client-test",
      name: "عميل تجريبي",
      stage: "new",
      project: null,
      broker: null,
      budgetLabel: "تجريبي",
      preference: "طلب جديد",
      notes: "اختبار",
    });

    expect(updated[0]?.id).toBe("client-test");
    expect(updated).toHaveLength(clients.length + 1);
  });

  it("patches a single CRM client immutably", () => {
    const clients = getCrmMockData().clients;
    const broker = getCrmMockData().brokers[0]!;
    const updated = updateCrmClient(clients, "client-khaled", { broker });

    expect(updated.find((client) => client.id === "client-khaled")?.broker?.id).toBe(broker.id);
    expect(clients.find((client) => client.id === "client-khaled")?.broker).toBeNull();
  });
});
