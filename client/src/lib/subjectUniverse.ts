export type SubjectId = "english" | "chinese" | "math" | "science" | "social" | "arts" | "health";

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
};

export const SUBJECTS: SubjectDefinition[] = [
  { id: "english", name: "英文", shortName: "English", tagline: "用語言開啟世界的對話", color: "#4ECDC4", pet: { name: "星塵", species: "狐狸貓", emoji: "🐱", color: "#4ECDC4", greeting: "一起把新的單字帶去探險吧！", favoriteItem: "月光餅乾" } },
  { id: "chinese", name: "國文", shortName: "Chinese", tagline: "讓文字與故事成為星圖", color: "#F08A8A", pet: { name: "硯墨", species: "雲紋兔", emoji: "🐰", color: "#F08A8A", greeting: "我找到一個藏在成語裡的小宇宙。", favoriteItem: "桂花書籤" } },
  { id: "math", name: "數學", shortName: "Math", tagline: "從規律找到宇宙的秩序", color: "#FFD166", pet: { name: "圓周", species: "星環鼠", emoji: "🐹", color: "#FFD166", greeting: "每一個答案，都有一條漂亮的路徑。", favoriteItem: "能量堅果" } },
  { id: "science", name: "自然", shortName: "Science", tagline: "觀察、提問與驗證世界", color: "#73D5FF", pet: { name: "芽芽", species: "彗星蜥", emoji: "🦎", color: "#73D5FF", greeting: "我聞到一個新發現的味道！", favoriteItem: "露光果實" } },
  { id: "social", name: "社會", shortName: "Social", tagline: "讀懂人群、地方與時間", color: "#A78BFA", pet: { name: "航航", species: "星圖海豹", emoji: "🦭", color: "#A78BFA", greeting: "地圖會記得每一段旅行。", favoriteItem: "航海徽章" } },
  { id: "arts", name: "藝術", shortName: "Arts", tagline: "讓色彩、聲音與想像發光", color: "#F59DDA", pet: { name: "彩羽", species: "霓虹鳥", emoji: "🦜", color: "#F59DDA", greeting: "今天的靈感，是粉紫色的！", favoriteItem: "流光羽飾" } },
  { id: "health", name: "健康", shortName: "Health", tagline: "照顧身心，蓄積探索能量", color: "#5CC9A7", pet: { name: "沐光", species: "暖陽犬", emoji: "🐶", color: "#5CC9A7", greeting: "先伸個懶腰，再出發吧。", favoriteItem: "活力水壺" } },
];

export const getSubject = (subjectId: SubjectId) => SUBJECTS.find((subject) => subject.id === subjectId)!;

export const DEFAULT_PET_STATUS = { hunger: 72, happiness: 68, energy: 74, level: 1 };
