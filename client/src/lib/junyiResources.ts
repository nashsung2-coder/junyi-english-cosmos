import type { SubjectId } from "@/lib/subjectUniverse";

export type JunyiLearningResource = {
  title: string;
  description: string;
  url: string;
  gradeBand?: string;
  startingPoint?: string;
  courseTrack?: "必修" | "選修" | "延伸";
};

export type JunyiResourceLevel = "單元教材" | "主題課程" | "年段課程" | "學習工具";

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
      { title: "時態：現在、過去與完成式", description: "均一英語文法的時態單元，依序練習現在式、過去式、進行式與完成式。", url: "https://www.junyiacademy.org/topics/junyi-english-grammar-tense" },
      { title: "英文閱讀素養", description: "用找出大意、細節、預測與順序等策略讀懂英文短文。", url: "https://www.junyiacademy.org/topics/eer" },
      { title: "Jutor 英語口說與寫作", description: "均一的英語口說、寫作與學習建議入口。", url: "https://www.junyiacademy.org/topics/jutor" },
    ],
  },
  chinese: {
    hub: { title: "均一國語文", description: "國語文主題與年段學習的公開入口。", url: "https://www.junyiacademy.org/topics/junyi-chinese" },
    mission: { title: "國語文主題課程", description: "從語文理解與表達延伸成語、閱讀與寫作學習。", url: "https://www.junyiacademy.org/topics/junyi-chinese" },
    extensions: [
      { title: "成語（上）", description: "均一國語文三年級成語影片，並可延伸至段落大意與說明文相關課程。", url: "https://www.junyiacademy.org/videos/7mhsIpfOGIo?topic=junyi-chinese%2Fele-c%2Fcoocele-c%2Fcoocele-c3" },
      { title: "國中國語文", description: "七至九年級的國語文年段課程入口。", url: "https://www.junyiacademy.org/topics/jun-c" },
    ],
  },
  math: {
    hub: { title: "均一數學", description: "國小至高中數學主題與年段課程入口。", url: "https://www.junyiacademy.org/topics/course-compare" },
    mission: { title: "數學課程地圖", description: "依年段與主題安排數與運算、幾何與規律的延伸學習。", url: "https://www.junyiacademy.org/topics/course-compare" },
    extensions: [
      { title: "比例：比、連比例與正反比", description: "從比例式到正比、反比的均一國中數學單元，可直接選擇課程內容。", url: "https://www.junyiacademy.org/topics/g-mjnbl" },
      { title: "國中數學", description: "七至九年級的數學年段課程入口。", url: "https://www.junyiacademy.org/topics/math-juni" },
      {
        title: "國小一年級數學",
        description: "均一版依 108 課綱與學扶基本學習內容編排，並提供多個教科書版本的對照入口。",
        url: "https://www.junyiacademy.org/topics/math-1",
        gradeBand: "國小一年級",
        startingPoint: "可從均一版的「100 以內的數、認識錢幣、加法和減法」開始。",
      },
    ],
  },
  science: {
    hub: { title: "均一自然", description: "自然科主題與年段學習的公開入口。", url: "https://www.junyiacademy.org/topics/junyi-science" },
    mission: { title: "自然科探究", description: "從現象觀察、生命科學到物質變化的延伸學習。", url: "https://www.junyiacademy.org/topics/junyi-science" },
    extensions: [
      { title: "有趣的磁鐵", description: "均一國小自然的磁鐵與磁力觀念影片，適合接續自然觀測任務。", url: "https://www.junyiacademy.org/v/QWbyTXimEJU" },
      { title: "國中自然", description: "生物、理化與地球科學的國中年段課程。", url: "https://www.junyiacademy.org/topics/science-juni" },
      {
        title: "國小自然中年級",
        description: "三、四年級自然課程入口，涵蓋植物、空氣與風、溶解、磁鐵與磁力、水、天氣與能源等主題。",
        url: "https://www.junyiacademy.org/topics/ns-ele-mid",
        gradeBand: "國小三至四年級",
        startingPoint: "可從「磁鐵與磁力」接續目前的自然任務，或依年級由植物與空氣主題開始。",
      },
    ],
  },
  social: {
    hub: { title: "均一社會", description: "人群、地方、歷史與公民主題的公開入口。", url: "https://www.junyiacademy.org/topics/junyi-society" },
    mission: { title: "社會科探查", description: "以地圖、生活與地方為起點的社會學習延伸。", url: "https://www.junyiacademy.org/topics/junyi-society" },
    extensions: [
      { title: "臺灣四大區域的特色與發展", description: "均一國小社會五年級影片，從北、中、南、東四區認識臺灣的人文與發展特色。", url: "https://www.junyiacademy.org/videos/EjhOP8udqmI?topic=junyi-society%2Fcoocele-t%2Fcoocele-t5" },
      { title: "國中公民", description: "家庭、社會與政治主題的公民學習入口。", url: "https://www.junyiacademy.org/topics/middle-school-civics" },
      {
        title: "國小社會",
        description: "三至六年級社會課程入口，從家庭與校園、家鄉與行政，到臺灣地理與社會公共事務循序探索。",
        url: "https://www.junyiacademy.org/topics/coocele-t",
        gradeBand: "國小三至六年級",
        startingPoint: "可依目前年級選擇：三年級家庭與校園、四年級家鄉、五年級臺灣地理、六年級社會與政府。",
      },
    ],
  },
  arts: {
    hub: { title: "均一藝術與美感", description: "藝術、舞蹈與音樂的跨域素養課程入口。", url: "https://www.junyiacademy.org/topics/v1051-new-topic" },
    mission: { title: "藝術與美感課程", description: "從色彩、節奏與身體表達延伸創作探索。", url: "https://www.junyiacademy.org/topics/v1051-new-topic" },
    extensions: [
      { title: "節奏：符值與拍子", description: "均一音樂節奏單元，包含符值、休止符、拍號與指揮等可選課程。", url: "https://www.junyiacademy.org/topics/axmjz" },
      { title: "舞蹈探索", description: "從舞蹈發展與身體表達展開的藝術學習。", url: "https://www.junyiacademy.org/topics/dancing" },
    ],
  },
  health: {
    hub: { title: "均一健康與生活習慣", description: "健康講堂中的生活習慣、照護與成長內容。", url: "https://www.junyiacademy.org/topics/v1170-new-topic-14" },
    mission: { title: "良好的生活習慣", description: "以生活習慣與自我照護建立穩定的探索能量。", url: "https://www.junyiacademy.org/topics/v1170-new-topic-14" },
    extensions: [
      { title: "永續食代新素養", description: "均一六單元飲食課程，從均衡營養、減少浪費到友善環境的生活行動。", url: "https://www.junyiacademy.org/topics/v1283-new-topic-24" },
    ],
  },
  physics: {
    hub: { title: "高中自然：物理", description: "均一高中自然總覽中的物理課程入口，含必修與選修物理。", url: "https://www.junyiacademy.org/topics/science-high", gradeBand: "高中", startingPoint: "先從物理（全）建立必修概念，再依興趣前往選修物理 I 至 V。" },
    mission: { title: "物理（全）", description: "均一高中物理的必修全冊課程入口，涵蓋高中物理核心概念。", url: "https://www.junyiacademy.org/topics/main-seni-phy", gradeBand: "高中", courseTrack: "必修" },
    extensions: [{ title: "選修物理 I 至 V", description: "均一高中物理頁列出的加深加廣選修路徑，可依目前學校課程選擇對應冊次。", url: "https://www.junyiacademy.org/topics/main-seni-phy", gradeBand: "高中", courseTrack: "選修" }],
  },
  chemistry: {
    hub: { title: "高中自然：化學", description: "均一高中自然總覽中的化學課程入口，含必修與選修化學。", url: "https://www.junyiacademy.org/topics/science-high", gradeBand: "高中", startingPoint: "先完成化學（全）的必修概念，再依需求探索選修化學 1 至 5。" },
    mission: { title: "化學（全）", description: "均一高中化學的必修全冊課程入口，含物質組成、構造與反應、溶液與反應。", url: "https://www.junyiacademy.org/topics/main-seni-cm", gradeBand: "高中", courseTrack: "必修" },
    extensions: [{ title: "選修化學 1 至 5", description: "均一高中化學總覽列出的加深加廣路徑，包含物質鑑定、鍵結、平衡、電化學與有機化合物。", url: "https://www.junyiacademy.org/topics/main-seni-cm", gradeBand: "高中", courseTrack: "選修" }],
  },
  biology: {
    hub: { title: "高中生物", description: "均一高中生物公開總覽，含高一生物與歷代課程。", url: "https://www.junyiacademy.org/topics/junyi-biology", gradeBand: "高中", startingPoint: "由高一生物建立細胞、遺傳、生態與生命系統的核心概念。" },
    mission: { title: "高一生物", description: "均一高中生物的必修起點，從細胞構造、生殖與遺傳展開。", url: "https://www.junyiacademy.org/topics/01", gradeBand: "高中", courseTrack: "必修" },
    extensions: [{ title: "選修生物二：環境刺激的反應", description: "已驗證的高中選修生物二主題，從刺激感受、神經傳導到生物體的反應深化探索。", url: "https://www.junyiacademy.org/topics/tfgcoocs-biology-11-section4", gradeBand: "高中", courseTrack: "選修" }],
  },
  "earth-science": {
    hub: { title: "高中地科", description: "均一高中地球科學的公開總覽，提供高一地科與延伸內容入口。", url: "https://www.junyiacademy.org/topics/main-seni-se", gradeBand: "高中", startingPoint: "由高一地科串連地球系統、天文、海洋與大氣的核心概念。" },
    mission: { title: "高一地科", description: "均一高中地球科學的必修起點，從地質、大氣、天文與海洋展開。", url: "https://www.junyiacademy.org/topics/main-seni-se-1", gradeBand: "高中", courseTrack: "必修" },
    extensions: [{ title: "地科總整：天文與宇宙", description: "已驗證的高中地科進階總整，延伸天文學、恆星演化與宇宙學；來源未明列選修，故保守標示為延伸。", url: "https://www.junyiacademy.org/topics/tfgcoocs-geoscience", gradeBand: "高中", courseTrack: "延伸" }],
  },
};

export const getJunyiSubjectResources = (subjectId: SubjectId) => JUNYI_SUBJECT_RESOURCES[subjectId];

const UNIT_RESOURCE_TITLE = /比例|磁鐵|成語|臺灣四大區域|節奏|永續食代|時態|閱讀素養/;

/**
 * 以集中化資料提供教材層級，讓畫面能清楚區分均一的單元、主題、年段與工具入口。
 */
export const getJunyiResourceLevel = (resource: JunyiLearningResource): JunyiResourceLevel => {
  if (UNIT_RESOURCE_TITLE.test(resource.title) || resource.url.includes("/videos/") || resource.url.includes("/v/")) return "單元教材";
  if (resource.gradeBand || resource.title.includes("國中") || resource.title.includes("國小") || resource.title.includes("高中")) return "年段課程";
  if (resource.title.includes("Jutor")) return "學習工具";
  return "主題課程";
};

export const getJunyiCourseTrack = (resource: JunyiLearningResource) => resource.courseTrack;

export const getJunyiPracticeResource = (missionId: number, subjectId: SubjectId): JunyiLearningResource => {
  const resource = getJunyiSubjectResources(subjectId);

  if (["physics", "chemistry", "biology", "earth-science"].includes(subjectId)) return resource.mission;
  if (subjectId !== "english") return resource.extensions[0] ?? resource.mission;
  if (missionId === 2) return resource.extensions[0] ?? resource.mission;
  if (missionId === 3) return resource.extensions[3] ?? resource.mission;
  if (missionId === 4) return resource.extensions[1] ?? resource.mission;
  if (missionId === 5) return resource.extensions[2] ?? resource.mission;
  return resource.mission;
};
