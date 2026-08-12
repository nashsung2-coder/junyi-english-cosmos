import { describe, expect, it } from "vitest";
import { getJunyiResourceLevel, getJunyiSubjectResources, JUNYI_SUBJECT_RESOURCES } from "./junyiResources";

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

  it("keeps verified unit-level links for the mathematics and science learning routes", () => {
    const mathResources = getJunyiSubjectResources("math");
    const scienceResources = getJunyiSubjectResources("science");

    expect(mathResources.extensions[0]).toMatchObject({
      title: "比例：比、連比例與正反比",
      url: "https://www.junyiacademy.org/topics/g-mjnbl",
    });
    expect(scienceResources.extensions[0]).toMatchObject({
      title: "有趣的磁鐵",
      url: "https://www.junyiacademy.org/v/QWbyTXimEJU",
    });
  });

  it("routes English grammar and reading missions to their verified unit-level learning pages", () => {
    const englishResources = getJunyiSubjectResources("english");

    expect(englishResources.extensions[1]).toMatchObject({
      title: "時態：現在、過去與完成式",
      url: "https://www.junyiacademy.org/topics/junyi-english-grammar-tense",
    });
    expect(englishResources.extensions[2]).toMatchObject({
      title: "英文閱讀素養",
      url: "https://www.junyiacademy.org/topics/eer",
    });
  });

  it("keeps verified unit-level links for Chinese, arts, and health learning routes", () => {
    expect(getJunyiSubjectResources("chinese").extensions[0]).toMatchObject({
      title: "成語（上）",
      url: "https://www.junyiacademy.org/videos/7mhsIpfOGIo?topic=junyi-chinese%2Fele-c%2Fcoocele-c%2Fcoocele-c3",
    });
    expect(getJunyiSubjectResources("arts").extensions[0]).toMatchObject({
      title: "節奏：符值與拍子",
      url: "https://www.junyiacademy.org/topics/axmjz",
    });
    expect(getJunyiSubjectResources("health").extensions[0]).toMatchObject({
      title: "永續食代新素養",
      url: "https://www.junyiacademy.org/topics/v1283-new-topic-24",
    });
  });

  it("keeps the verified Taiwan regional studies unit for the social learning route", () => {
    expect(getJunyiSubjectResources("social").extensions[0]).toMatchObject({
      title: "臺灣四大區域的特色與發展",
      url: "https://www.junyiacademy.org/videos/EjhOP8udqmI?topic=junyi-society%2Fcoocele-t%2Fcoocele-t5",
    });
  });

  it("classifies verified resources so learners can distinguish units, grade routes, and tools", () => {
    const englishResources = getJunyiSubjectResources("english");
    const mathResources = getJunyiSubjectResources("math");

    expect(getJunyiResourceLevel(mathResources.extensions[0])).toBe("單元教材");
    expect(getJunyiResourceLevel(mathResources.extensions[1])).toBe("年段課程");
    expect(getJunyiResourceLevel(englishResources.extensions[3])).toBe("學習工具");
    expect(getJunyiResourceLevel(englishResources.hub)).toBe("主題課程");
  });
});
