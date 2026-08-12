import { describe, expect, it } from "vitest";
import { PRACTICE_MISSIONS } from "./practiceData";
import { getJunyiPracticeResource } from "./junyiResources";

describe("practice mission Junyi resources", () => {
  it("resolves a public Junyi learning link for every practice mission from the central resource map", () => {
    PRACTICE_MISSIONS.forEach((mission) => {
      expect(getJunyiPracticeResource(mission.id, mission.subject).url).toMatch(/^https:\/\/www\.junyiacademy\.org\/(topics|videos|v)\//);
    });
  });

  it("maps every non-English mission to a verified unit-level learning resource", () => {
    const unitUrls = Object.fromEntries(
      PRACTICE_MISSIONS.filter((mission) => mission.subject !== "english").map((mission) => [mission.subject, getJunyiPracticeResource(mission.id, mission.subject).url]),
    );

    expect(unitUrls).toMatchObject({
      chinese: "https://www.junyiacademy.org/videos/7mhsIpfOGIo?topic=junyi-chinese%2Fele-c%2Fcoocele-c%2Fcoocele-c3",
      math: "https://www.junyiacademy.org/topics/g-mjnbl",
      science: "https://www.junyiacademy.org/v/QWbyTXimEJU",
      social: "https://www.junyiacademy.org/videos/EjhOP8udqmI?topic=junyi-society%2Fcoocele-t%2Fcoocele-t5",
      arts: "https://www.junyiacademy.org/topics/axmjz",
      health: "https://www.junyiacademy.org/topics/v1283-new-topic-24",
    });
  });

  it("maps English dialogue, tense, and reading missions to their matching verified resources", () => {
    expect(getJunyiPracticeResource(3, "english").url).toBe("https://www.junyiacademy.org/topics/jutor");
    expect(getJunyiPracticeResource(4, "english").url).toBe("https://www.junyiacademy.org/topics/junyi-english-grammar-tense");
    expect(getJunyiPracticeResource(5, "english").url).toBe("https://www.junyiacademy.org/topics/eer");
  });

  it("provides a second, answerable mission for each expanded cross-subject route", () => {
    const expandedSubjects = ["math", "science", "social", "arts", "health"] as const;

    expandedSubjects.forEach((subject) => {
      const missions = PRACTICE_MISSIONS.filter((mission) => mission.subject === subject);

      expect(missions).toHaveLength(2);
      expect(missions.at(-1)).toMatchObject({ difficulty: "中等" });
      expect(missions.at(-1)?.questions).toHaveLength(3);
      expect(getJunyiPracticeResource(missions.at(-1)!.id, subject).url).toMatch(/^https:\/\/www\.junyiacademy\.org\/(topics|videos|v)\//);
    });
  });
});
