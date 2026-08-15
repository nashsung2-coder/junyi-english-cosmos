export type LearningStageId = "elementary" | "junior" | "senior";
export type CourseTrack = "required" | "elective";
export type SeniorSubjectStreamId = "humanities" | "science";

export type SubjectId = "english" | "chinese" | "math" | "science" | "social" | "arts" | "health" | "physics" | "chemistry" | "biology" | "earth-science";

export type LearningStage = {
  id: LearningStageId;
  name: string;
  shortName: string;
  description: string;
  color: string;
};

export type SeniorSubjectStream = {
  id: SeniorSubjectStreamId;
  name: string;
  shortName: string;
  description: string;
  color: string;
  emphasis: string;
};

export const LEARNING_STAGES: LearningStage[] = [
  { id: "elementary", name: "國小", shortName: "ELEMENTARY", description: "從生活經驗、好奇提問與穩定基礎，建立自己的學習節奏。", color: "#6EE7F5" },
  { id: "junior", name: "國中", shortName: "JUNIOR HIGH", description: "把概念串成脈絡，在閱讀、推理與探究中找到更精準的方法。", color: "#C4B5FD" },
  { id: "senior", name: "高中", shortName: "SENIOR HIGH", description: "先選擇文科或理科航線，再依必修、選修與延伸安排自己的探索節奏。", color: "#F8C46B" },
];

export const SENIOR_SUBJECT_STREAMS: SeniorSubjectStream[] = [
  { id: "humanities", name: "文科", shortName: "HUMANITIES", description: "以語文理解、表達與社會觀察為核心，練習閱讀、論述與公共思考。", color: "#F59DDA", emphasis: "語文素養 · 社會思辨" },
  { id: "science", name: "理科", shortName: "SCIENCE", description: "由自然科核心必修起步，再依興趣延伸選修與進階探索。", color: "#78C7FF", emphasis: "自然科必修 · 選修加深加廣" },
];

export type SubjectPet = {
  name: string;
  species: string;
  emoji: string;
  color: string;
  greeting: string;
  favoriteItem: string;
};

export type SubjectDefinition = {
  id: SubjectId;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  pet: SubjectPet;
  stages: LearningStageId[];
  courseTracks?: CourseTrack[];
  seniorStream?: SeniorSubjectStreamId;
};

export const SUBJECTS: SubjectDefinition[] = [
  { id: "english", name: "英文", shortName: "English", tagline: "用語言開啟世界的對話", color: "#4ECDC4", pet: { name: "星塵", species: "狐狸貓", emoji: "🐱", color: "#4ECDC4", greeting: "一起把新的單字帶去探險吧！", favoriteItem: "月光餅乾" }, stages: ["elementary", "junior", "senior"], seniorStream: "humanities" },
  { id: "chinese", name: "國文", shortName: "Chinese", tagline: "讓文字與故事成為星圖", color: "#F08A8A", pet: { name: "硯墨", species: "雲紋兔", emoji: "🐰", color: "#F08A8A", greeting: "我找到一個藏在成語裡的小宇宙。", favoriteItem: "桂花書籤" }, stages: ["elementary", "junior", "senior"], seniorStream: "humanities" },
  { id: "math", name: "數學", shortName: "Math", tagline: "從規律找到宇宙的秩序", color: "#FFD166", pet: { name: "圓周", species: "星環鼠", emoji: "🐹", color: "#FFD166", greeting: "每一個答案，都有一條漂亮的路徑。", favoriteItem: "能量堅果" }, stages: ["elementary", "junior"] },
  { id: "science", name: "自然", shortName: "Science", tagline: "觀察、提問與驗證世界", color: "#73D5FF", pet: { name: "芽芽", species: "彗星蜥", emoji: "🦎", color: "#73D5FF", greeting: "我聞到一個新發現的味道！", favoriteItem: "露光果實" }, stages: ["elementary", "junior"] },
  { id: "social", name: "社會", shortName: "Social", tagline: "讀懂人群、地方與時間", color: "#A78BFA", pet: { name: "航航", species: "星圖海豹", emoji: "🦭", color: "#A78BFA", greeting: "地圖會記得每一段旅行。", favoriteItem: "航海徽章" }, stages: ["elementary", "junior", "senior"], seniorStream: "humanities" },
  { id: "arts", name: "藝術", shortName: "Arts", tagline: "讓色彩、聲音與想像發光", color: "#F59DDA", pet: { name: "彩羽", species: "霓虹鳥", emoji: "🦜", color: "#F59DDA", greeting: "今天的靈感，是粉紫色的！", favoriteItem: "流光羽飾" }, stages: ["elementary", "junior"] },
  { id: "health", name: "健康", shortName: "Health", tagline: "照顧身心，蓄積探索能量", color: "#5CC9A7", pet: { name: "沐光", species: "暖陽犬", emoji: "🐶", color: "#5CC9A7", greeting: "先伸個懶腰，再出發吧。", favoriteItem: "活力水壺" }, stages: ["elementary", "junior"] },
  { id: "physics", name: "物理", shortName: "Physics", tagline: "用模型與證據理解運動、能量與世界", color: "#78C7FF", pet: { name: "脈衝", species: "電弧水獺", emoji: "🦦", color: "#78C7FF", greeting: "先畫出系統，再讓每個力都有方向。", favoriteItem: "磁場羅盤" }, stages: ["senior"], courseTracks: ["required", "elective"], seniorStream: "science" },
  { id: "chemistry", name: "化學", shortName: "Chemistry", tagline: "從微觀粒子讀懂物質變化", color: "#FF9B7A", pet: { name: "析光", species: "晶簇狐", emoji: "🦊", color: "#FF9B7A", greeting: "觀察顏色與狀態，變化會告訴我們答案。", favoriteItem: "晶格燒杯" }, stages: ["senior"], courseTracks: ["required", "elective"], seniorStream: "science" },
  { id: "biology", name: "生物", shortName: "Biology", tagline: "從細胞、生命系統到生態網絡", color: "#8EE6A4", pet: { name: "葉脈", species: "苔原鼬", emoji: "🦦", color: "#8EE6A4", greeting: "每個生命系統，都有值得被看見的連結。", favoriteItem: "孢子燈" }, stages: ["senior"], courseTracks: ["required"], seniorStream: "science" },
  { id: "earth-science", name: "地球科學", shortName: "Earth Science", tagline: "循著地質、海洋與星空認識行星", color: "#B6A6FF", pet: { name: "星殼", species: "環紋龜", emoji: "🐢", color: "#B6A6FF", greeting: "抬頭看星空，也別忘了傾聽腳下的大地。", favoriteItem: "隕石望遠鏡" }, stages: ["senior"], courseTracks: ["required"], seniorStream: "science" },
];

export const getSubject = (subjectId: SubjectId) => SUBJECTS.find((subject) => subject.id === subjectId)!;
export const getSubjectsForStage = (stageId: LearningStageId) => SUBJECTS.filter((subject) => subject.stages.includes(stageId));
export const getSubjectsForSeniorStream = (streamId: SeniorSubjectStreamId) => SUBJECTS.filter((subject) => subject.stages.includes("senior") && subject.seniorStream === streamId);
export const getLearningStage = (stageId: LearningStageId) => LEARNING_STAGES.find((stage) => stage.id === stageId)!;

export const DEFAULT_PET_STATUS = { hunger: 72, happiness: 68, energy: 74, level: 1 };
