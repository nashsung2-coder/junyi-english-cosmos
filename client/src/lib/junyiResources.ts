import type { SubjectId } from "@/lib/subjectUniverse";

export type JunyiLearningResource = {
  title: string;
  description: string;
  url: string;
};

export type SubjectLearningResources = {
  hub: JunyiLearningResource;
  mission: JunyiLearningResource;
  extensions: JunyiLearningResource[];
};

/**
 * 均一教育平台公開、可直接瀏覽的真實教材入口。
 * 任務完成後仍先保留站內回饋與獎勵；此資料只負責提供下一步的真實延伸學習。
 */
export const JUNYI_SUBJECT_RESOURCES: Record<SubjectId, SubjectLearningResources> = {
  english: {
    hub: { title: "均一英語文", description: "主題式、年段課程、字彙與 Jutor 學習入口。", url: "https://www.junyiacademy.org/topics/junyi-english" },
    mission: { title: "字母與發音", description: "認識字母、拼讀與自然發音的真實課程。", url: "https://www.junyiacademy.org/topics/junyi-english-lettersandphonics" },
    extensions: [
      { title: "基礎單字 960", description: "依國中會考高頻字彙整理的基礎單字課程。", url: "https://www.junyiacademy.org/topics/a-j-vocab" },
      { title: "英語主題式課程", description: "字母、單字、閱讀、文法、寫作與聽力主題。", url: "https://www.junyiacademy.org/topics/english-topic" },
      { title: "Jutor 英語口說與寫作", description: "均一的英語口說、寫作與學習建議入口。", url: "https://www.junyiacademy.org/topics/jutor" },
    ],
  },
  chinese: {
    hub: { title: "均一國語文", description: "國語文主題與年段學習的公開入口。", url: "https://www.junyiacademy.org/topics/junyi-chinese" },
    mission: { title: "國語文主題課程", description: "從語文理解與表達延伸成語、閱讀與寫作學習。", url: "https://www.junyiacademy.org/topics/junyi-chinese" },
    extensions: [
      { title: "國小國語文", description: "字詞、篇章與閱讀理解的國小國語文學習專區。", url: "https://www.junyiacademy.org/topics/ele-c" },
      { title: "國中國語文", description: "七至九年級的國語文年段課程入口。", url: "https://www.junyiacademy.org/topics/jun-c" },
    ],
  },
  math: {
    hub: { title: "均一數學", description: "國小至高中數學主題與年段課程入口。", url: "https://www.junyiacademy.org/topics/course-compare" },
    mission: { title: "數學課程地圖", description: "依年段與主題安排數與運算、幾何與規律的延伸學習。", url: "https://www.junyiacademy.org/topics/course-compare" },
    extensions: [
      { title: "國小數學", description: "數量、運算與幾何基礎的國小數學課程。", url: "https://www.junyiacademy.org/topics/math-elem" },
      { title: "國中數學", description: "七至九年級的數學年段課程入口。", url: "https://www.junyiacademy.org/topics/math-juni" },
    ],
  },
  science: {
    hub: { title: "均一自然", description: "自然科主題與年段學習的公開入口。", url: "https://www.junyiacademy.org/topics/junyi-science" },
    mission: { title: "自然科探究", description: "從現象觀察、生命科學到物質變化的延伸學習。", url: "https://www.junyiacademy.org/topics/junyi-science" },
    extensions: [
      { title: "國小自然", description: "植物、水、天氣與磁力等國小自然觀察主題。", url: "https://www.junyiacademy.org/topics/ns-ele" },
      { title: "國中自然", description: "生物、理化與地球科學的國中年段課程。", url: "https://www.junyiacademy.org/topics/science-juni" },
    ],
  },
  social: {
    hub: { title: "均一社會", description: "人群、地方、歷史與公民主題的公開入口。", url: "https://www.junyiacademy.org/topics/junyi-society" },
    mission: { title: "社會科探查", description: "以地圖、生活與地方為起點的社會學習延伸。", url: "https://www.junyiacademy.org/topics/junyi-society" },
    extensions: [
      { title: "國小社會", description: "地圖、地方與公共生活的國小社會課程。", url: "https://www.junyiacademy.org/topics/coocele-t" },
      { title: "國中公民", description: "家庭、社會與政治主題的公民學習入口。", url: "https://www.junyiacademy.org/topics/middle-school-civics" },
    ],
  },
  arts: {
    hub: { title: "均一藝術與美感", description: "藝術、舞蹈與音樂的跨域素養課程入口。", url: "https://www.junyiacademy.org/topics/v1051-new-topic" },
    mission: { title: "藝術與美感課程", description: "從色彩、節奏與身體表達延伸創作探索。", url: "https://www.junyiacademy.org/topics/v1051-new-topic" },
    extensions: [
      { title: "音樂與節奏", description: "音樂史、節奏與音樂基礎的公開課程。", url: "https://www.junyiacademy.org/topics/junyi-music" },
      { title: "舞蹈探索", description: "從舞蹈發展與身體表達展開的藝術學習。", url: "https://www.junyiacademy.org/topics/dancing" },
    ],
  },
  health: {
    hub: { title: "均一健康與生活習慣", description: "健康講堂中的生活習慣、照護與成長內容。", url: "https://www.junyiacademy.org/topics/v1170-new-topic-14" },
    mission: { title: "良好的生活習慣", description: "以生活習慣與自我照護建立穩定的探索能量。", url: "https://www.junyiacademy.org/topics/v1170-new-topic-14" },
    extensions: [
      { title: "陪孩子健康長大", description: "均一健康講堂的家庭成長與健康照護延伸。", url: "https://www.junyiacademy.org/topics/doctor-huang-07" },
    ],
  },
};

export const getJunyiSubjectResources = (subjectId: SubjectId) => JUNYI_SUBJECT_RESOURCES[subjectId];

export const getJunyiPracticeResource = (missionId: number, subjectId: SubjectId): JunyiLearningResource => {
  const resource = getJunyiSubjectResources(subjectId);

  if (missionId === 2) return resource.extensions[0] ?? resource.mission;
  if (subjectId === "english" && missionId >= 3) return resource.extensions[1] ?? resource.mission;
  return resource.mission;
};
