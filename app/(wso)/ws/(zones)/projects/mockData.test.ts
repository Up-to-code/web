import { describe, expect, it } from "vitest";
import {
  addMockProject,
  getProjectsMockData,
  updateProjectPublicationState,
} from "./mockData";

describe("projects mock helpers", () => {
  it("adds a mock project once without duplicating it", () => {
    const projects = getProjectsMockData();
    const created = addMockProject(projects, projects[0]!);

    expect(created).toHaveLength(projects.length);
  });

  it("updates publication state immutably", () => {
    const projects = getProjectsMockData();
    const updated = updateProjectPublicationState(projects, "malqa-residences", "archived");

    expect(updated.find((project) => project.id === "malqa-residences")?.publicationState).toBe("archived");
    expect(projects.find((project) => project.id === "malqa-residences")?.publicationState).toBe("published");
  });
});
