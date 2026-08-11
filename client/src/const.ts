/**
 * 均一星辰宇宙 — 全站共享常數
 * 設計哲學:深空極簡主義(Deep Space Minimalism)
 * 主色:星辰青 #4ECDC4;入口主題色見 index.css 與各頁面
 */

/** 入口卡片資料 */
export const PORTALS = [
  {
    id: "specialty",
    name: "專攻區",
    subtitle: "學力之間",
    description: "追蹤英文能力進度、解鎖技能樹、規劃學習路徑",
    icon: "BarChart3",
    color: "from-blue-500 to-blue-600",
    glowColor: "rgba(96, 165, 250, 0.35)",
    href: "/specialty",
    stats: ["聽力 B1▲", "字彙量 1,850"],
  },
  {
    id: "game",
    name: "遊戲模式",
    subtitle: "星辰冒險",
    description: "探索六顆知識星球、馴養狐狸貓夥伴、參加競技場",
    icon: "Gamepad2",
    color: "from-amber-500 to-orange-600",
    glowColor: "rgba(255, 209, 102, 0.35)",
    href: "/game",
    stats: ["能量 ████░░", "排名 Top 100"],
  },
  {
    id: "parent",
    name: "家長區",
    subtitle: "親子星港",
    description: "掌握孩子英文學習成長、親子共學、溫暖陪伴",
    icon: "Users",
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(92, 201, 167, 0.35)",
    href: "/parent",
    stats: ["孩子 1 位", "本週進度 ↑"],
  },
  {
    id: "teacher",
    name: "教師區",
    subtitle: "班級指揮艙",
    description: "班級戰情、派發套餐、學生管理、榮譽殿堂",
    icon: "BookOpenCheck",
    color: "from-purple-500 to-violet-600",
    glowColor: "rgba(169, 119, 244, 0.35)",
    href: "/teacher",
    stats: ["班級 3 個", "學生 87 位"],
  },
] as const;

/** 六維能力評估(英文學習) */
export const DIMENSIONS = [
  { id: "listening", name: "聽力", color: "#60A5FA", icon: "Ear" },
  { id: "speaking", name: "口說", color: "#FFD166", icon: "Mic" },
  { id: "reading", name: "閱讀", color: "#5CE0B8", icon: "BookOpen" },
  { id: "writing", name: "寫作", color: "#F07B6B", icon: "Pencil" },
  { id: "vocabulary", name: "字彙", color: "#A977F4", icon: "Languages" },
  { id: "grammar", name: "文法", color: "#5CC9A7", icon: "Cog" },
] as const;

/** 六顆知識星球(遊戲模式) */
export const STARS = [
  {
    id: "phonics",
    name: "發音之星",
    description: "26個字母與自然發音法",
    color: "#4ECDC4",
    level: "Pre A1",
    progress: 90,
  },
  {
    id: "vocab",
    name: "字彙之星",
    description: "主題單字與例句運用",
    color: "#FFD166",
    level: "A1",
    progress: 72,
  },
  {
    id: "listening",
    name: "聽力之星",
    description: "對話與故事聽解訓練",
    color: "#60A5FA",
    level: "A1",
    progress: 55,
  },
  {
    id: "grammar",
    name: "文法之星",
    description: "時態與句型結構",
    color: "#A977F4",
    level: "A2",
    progress: 38,
  },
  {
    id: "reading",
    name: "閱讀之星",
    description: "短文與篇章理解",
    color: "#5CE0B8",
    level: "A2",
    progress: 25,
  },
  {
    id: "speaking",
    name: "口說之星",
    description: "跟讀與口語表達",
    color: "#F07B6B",
    level: "B1",
    progress: 12,
  },
] as const;

/** 知識遠征關卡 */
export const EXPEDITIONS = [
  {
    id: 1,
    name: "字母叢林",
    description: "認讀26個字母與基本發音",
    questions: 15,
    time: "約 10 分鐘",
    reward: "+120 經驗值、狐狸貓餅乾 ×2",
    difficulty: "新手",
  },
  {
    id: 2,
    name: "單字溪谷",
    description: "食物、動物、家庭等主題單字",
    questions: 20,
    time: "約 15 分鐘",
    reward: "+180 經驗值、發光星塵 ×1",
    difficulty: "簡單",
  },
  {
    id: 3,
    name: "對話平原",
    description: "日常情境對話理解與練習",
    questions: 20,
    time: "約 15 分鐘",
    reward: "+220 經驗值、口說能量石 ×1",
    difficulty: "中等",
  },
  {
    id: 4,
    name: "時態雪山",
    description: "現在式、過去式與進行式挑戰",
    questions: 25,
    time: "約 20 分鐘",
    reward: "+300 經驗值、稀有羽飾 ×1",
    difficulty: "困難",
  },
  {
    id: 5,
    name: "閱讀星雲",
    description: "短篇故事理解與推理",
    questions: 25,
    time: "約 25 分鐘",
    reward: "+360 經驗值、智慧頭環 ×1",
    difficulty: "困難",
  },
] as const;

/** 今日任務 */
export const TODAY_TASKS = [
  { id: 1, name: "觀看「現在進行式」影片", category: "文法", minutes: 12, done: true },
  { id: 2, name: "完成聽力訓練 3 題", category: "聽力", minutes: 15, done: true },
  { id: 3, name: "Jutor Speaking 跟讀練習", category: "口說", minutes: 10, done: false },
  { id: 4, name: "單字卡片 20 張複習", category: "字彙", minutes: 15, done: false },
  { id: 5, name: "知識遠征:單字溪谷", category: "遊戲", minutes: 15, done: false },
] as const;

/** 成就勳章 */
export const ACHIEVEMENTS = [
  { id: 1, name: "聽力新星", description: "首次完成聽力訓練", icon: "🌟", unlocked: true },
  { id: 2, name: "連續7天", description: "連續學習7天", icon: "🔥", unlocked: true },
  { id: 3, name: "單字收藏家", description: "累積認識 500 個單字", icon: "📚", unlocked: true },
  { id: 4, name: "口說冒險家", description: "完成10次口說練習", icon: "🎤", unlocked: false },
  { id: 5, name: "遠征隊長", description: "完成5場知識遠征", icon: "🚀", unlocked: false },
  { id: 6, name: "滿分學者", description: "單元測驗獲得滿分", icon: "🏆", unlocked: false },
] as const;

/** 背包道具 */
export const BACKPACK_ITEMS = [
  { id: 1, name: "狐狸貓餅乾", description: "餵食夥伴可增加親密度", icon: "🍪", count: 8 },
  { id: 2, name: "發光星塵", description: "點亮未探索的星域", icon: "✨", count: 3 },
  { id: 3, name: "口說能量石", description: "遠征時口說題加成", icon: "💎", count: 1 },
  { id: 4, name: "稀有羽飾", description: "夥伴外觀裝飾", icon: "🪶", count: 1 },
  { id: 5, name: "智慧頭環", description: "夥伴頭部裝飾", icon: "👑", count: 1 },
] as const;

/** 資源分類連結 */
export const RESOURCE_LINKS = [
  {
    category: "國小英文",
    url: "https://www.junyiacademy.org/topics/eng-elementary",
  },
  {
    category: "國中英文",
    url: "https://www.junyiacademy.org/topics/junyi-english",
  },
  {
    category: "聽力訓練",
    url: "https://www.junyiacademy.org/topics/junyi-english-listening",
  },
  {
    category: "教師資源",
    url: "https://www.junyiacademy.org/topics/junyi-teacher-resources",
  },
] as const;
