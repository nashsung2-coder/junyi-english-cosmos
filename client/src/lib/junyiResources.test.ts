import { describe, expect, it } from "vitest";
import { getJunyiSubjectResources, JUNYI_SUBJECT_RESOURCES } from "./junyiResources";

describe("junyi subject resources", () => {
  it("provides a verified Junyi hub and mission resource for every subject", () => {
    expect(Object.keys(JUNYI_SUBJECT_RESOURCES)).toHaveLength(7);

    Object.values(JUNYI_SUBJECT_RESOURCES).forEach((resources) => {
      expect(resources.hub.url).toMatch(/^https:\/\/www\.junyiacademy\.org\/topics\//);
      expect(resources.mission.url).toMatch(/^https:\/\/www\.junyiacademy\.org\/topics\//);
      expect(resources.extensions.length).toBeGreaterThan(0);
    });
  });

  it("returns the exact resource collection for a requested subject", () => {
    const englishResources = getJunyiSubjectResources("english");

    expect(englishResources.hub.url).toBe("https://www.junyiacademy.org/topics/junyi-english");
    expect(englishResources.mission.url).toBe("https://www.junyiacademy.org/topics/junyi-english-lettersandphonics");
  });
});
