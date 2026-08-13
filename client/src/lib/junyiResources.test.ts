import { describe, expect, it } from "vitest";
import { getJunyiPracticeResource, getJunyiResourceLevel, getJunyiSubjectResources, JUNYI_SUBJECT_RESOURCES } from "./junyiResources";
import { SUBJECTS } from "./subjectUniverse";

describe("junyi subject resources", () => {
  it("provides a verified Junyi hub and mission resource for every learning-stage subject", () => {
    expect(Object.keys(JUNYI_SUBJECT_RESOURCES)).toHaveLength(SUBJECTS.length);
    expect(SUBJECTS).toHaveLength(11);

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

  it("provides verified grade-level starting routes for mathematics, science, and social studies", () => {
    expect(getJunyiSubjectResources("math").extensions.at(-1)).toMatchObject({
      title: "國小一年級數學",
      url: "https://www.junyiacademy.org/topics/math-1",
      gradeBand: "國小一年級",
    });
    expect(getJunyiSubjectResources("science").extensions.at(-1)).toMatchObject({
      title: "國小自然中年級",
      url: "https://www.junyiacademy.org/topics/ns-ele-mid",
      gradeBand: "國小三至四年級",
    });
    expect(getJunyiSubjectResources("social").extensions.at(-1)).toMatchObject({
      title: "國小社會",
      url: "https://www.junyiacademy.org/topics/coocele-t",
      gradeBand: "國小三至六年級",
    });
  });

  it("classifies verified resources so learners can distinguish units, grade routes, and tools", () => {
    const englishResources = getJunyiSubjectResources("english");
    const mathResources = getJunyiSubjectResources("math");

    expect(getJunyiResourceLevel(mathResources.extensions[0])).toBe("單元教材");
    expect(getJunyiResourceLevel(mathResources.extensions[1])).toBe("年段課程");
    expect(getJunyiResourceLevel(mathResources.extensions[2])).toBe("年段課程");
    expect(getJunyiResourceLevel(englishResources.extensions[3])).toBe("學習工具");
    expect(getJunyiResourceLevel(englishResources.hub)).toBe("主題課程");
  });

  it("keeps high-school science routes separated into required and elective paths", () => {
    expect(getJunyiSubjectResources("physics").mission).toMatchObject({
      title: "物理（全）",
      url: "https://www.junyiacademy.org/topics/main-seni-phy",
      courseTrack: "必修",
    });
    expect(getJunyiSubjectResources("physics").extensions[0]).toMatchObject({ courseTrack: "選修" });
    expect(getJunyiSubjectResources("chemistry").mission).toMatchObject({
      title: "化學（全）",
      url: "https://www.junyiacademy.org/topics/main-seni-cm",
      courseTrack: "必修",
    });
    expect(getJunyiSubjectResources("biology").mission).toMatchObject({
      title: "高一生物",
      url: "https://www.junyiacademy.org/topics/01",
      courseTrack: "必修",
    });
    expect(getJunyiSubjectResources("biology").extensions[0]).toMatchObject({
      title: "選修生物二：環境刺激的反應",
      url: "https://www.junyiacademy.org/topics/tfgcoocs-biology-11-section4",
      courseTrack: "選修",
    });
    expect(getJunyiSubjectResources("earth-science").mission).toMatchObject({
      title: "高一地科",
      url: "https://www.junyiacademy.org/topics/main-seni-se-1",
      courseTrack: "必修",
    });
    expect(getJunyiSubjectResources("earth-science").extensions[0]).toMatchObject({
      title: "地科總整：天文與宇宙",
      url: "https://www.junyiacademy.org/topics/tfgcoocs-geoscience",
      courseTrack: "延伸",
    });
  });

  it("returns the verified required start after every high-school mission", () => {
    expect(getJunyiPracticeResource(201, "physics")).toMatchObject({ title: "物理（全）", courseTrack: "必修" });
    expect(getJunyiPracticeResource(202, "chemistry")).toMatchObject({ title: "化學（全）", courseTrack: "必修" });
    expect(getJunyiPracticeResource(203, "biology")).toMatchObject({ title: "高一生物", courseTrack: "必修" });
    expect(getJunyiPracticeResource(204, "earth-science")).toMatchObject({ title: "高一地科", courseTrack: "必修" });
  });
});
