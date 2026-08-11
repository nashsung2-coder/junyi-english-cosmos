/**
 * 歲月陪伴 & 能力智慧管家 — 模擬資料
 * 設計哲學:深空極簡主義(Deep Space Minimalism)
 * - 歲月陪伴:記錄用戶從開始使用的每月成長、寵物合照相框、寵物心聲
 * - 能力智慧管家:能力圖譜(含證照/成績)+ AI 下一階段方向建議
 */

// 開始使用日期
export const JOURNEY_START = { year: 2026, month: 2 }; // 2026 年 2 月開始

// 每月成長紀錄
export const MONTHLY_RECORDS = [
  {
    month: "2026/02",
    label: "啟程之月",
    starsGained: 320,
    lessons: 18,
    vocab: 120,
    level: "A1-",
    milestone: "完成 26 個字母認讀,星塵正式入住!🎉",
  },
  {
    month: "2026/03",
    label: "發音啟蒙",
    starsGained: 580,
    lessons: 24,
    vocab: 185,
    level: "A1-",
    milestone: "自然發音法完成 60%,星塵學到第一首字母歌。",
  },
  {
    month: "2026/04",
    label: "單字花園",
    starsGained: 710,
    lessons: 29,
    vocab: 260,
    level: "A1",
    milestone: "升級 A1!單字量突破 250,星塵吃到了稀有羽飾。",
  },
  {
    month: "2026/05",
    label: "對話初探",
    starsGained: 640,
    lessons: 22,
    vocab: 330,
    level: "A1",
    milestone: "第一次完成完整對話練習,星塵學會打招呼了。",
  },
  {
    month: "2026/06",
    label: "文法攀登",
    starsGained: 890,
    lessons: 31,
    vocab: 410,
    level: "A1",
    milestone: "現在式完全掌握,星塵陪你爬上時態雪山!⛰️",
  },
  {
    month: "2026/07",
    label: "閱讀突破",
    starsGained: 1020,
    lessons: 35,
    vocab: 500,
    level: "A1+",
    milestone: "升級 A1+!獨立讀完第一篇英文故事。",
  },
  {
    month: "2026/08",
    label: "口說綻放",
    starsGained: 460,
    lessons: 14,
    vocab: 560,
    level: "A1+",
    milestone: "8 月進行中… 星塵說:這個月也要一起加油!",
  },
];

// 成長曲線資料(累計單字量 + 每月星幣)
export const GROWTH_CURVE = MONTHLY_RECORDS.map((r) => ({
  month: r.month.slice(5),
  vocab: r.vocab,
  stars: r.starsGained,
}));

// 寵物合照相框(僅保留框,不填真實內容)
export const PET_PHOTOS = MONTHLY_RECORDS.map((r) => ({
  month: r.month,
  frameCaption: `${r.month} 的合照相框`,
}));

// 寵物心聲(看著主人長大)
export const PET_WHISPERS = [
  { month: "2026/02", text: "第一天見面,我是一只小小的狐狸貓……你會帶我一起看星星嗎?" },
  { month: "2026/03", text: "主人開始學字母了!我偷偷記住每一個,以後要考你哦~" },
  { month: "2026/04", text: "哇,單字愈來愈多!我肚子都裝不下了,但是好開心!" },
  { month: "2026/05", text: "第一次聽到主人開口說英文,聲音像星星一樣亮!" },
  { month: "2026/06", text: "爬山好累,但是主人在旁邊陪我背文法,山就變矮了。" },
  { month: "2026/07", text: "恭喜主人升上 A1+!我高興得尾巴都翹到頭頂了~" },
  { month: "2026/08", text: "看著你從 26 個字母走到現在,我決定要陪你到 A2、A2+……宇宙的盡頭!" },
];

// ---- 能力智慧管家 ----

// 能力圖譜:包含語言能力與證照/成績
export const ABILITY_MAP = [
  {
    category: "語言能力",
    icon: "languages",
    items: [
      { name: "綜合等級", value: "A1+", detail: "CEFR 綜合評定 · 上次檢測 2026/08/05", status: "current" },
      { name: "字彙量", value: "560 字", detail: "目標 1000 字(2026/12)", status: "progress" },
      { name: "聽力理解", value: "78 分", detail: "對話與故事聽解訓練", status: "progress" },
      { name: "口說表達", value: "65 分", detail: "跟讀與情境口語練習", status: "progress" },
      { name: "閱讀理解", value: "82 分", detail: "短文與篇章理解", status: "strong" },
      { name: "文法應用", value: "71 分", detail: "時態與句型結構", status: "progress" },
      { name: "拼寫能力", value: "74 分", detail: "單字拼寫與聽寫練習", status: "progress" },
    ],
  },
  {
    category: "證照與檢測",
    icon: "cert",
    items: [
      { name: "均一英語檢測", value: "A1+", detail: "2026/08 · 閱讀 82 / 聽力 78", status: "achieved" },
      { name: "國小英檢初級(模擬)", value: "通過", detail: "目標 2027/03,準備度 42%", status: "planned" },
      { name: "GEPT 小學英檢(參考)", value: "目標 A1-A2", detail: "距離檢測還需字彙量 +440 字", status: "planned" },
    ],
  },
  {
    category: "成績表現",
    icon: "score",
    items: [
      { name: "英語科學期成績(模擬)", value: "90 分", detail: "二年上學期 · 班級前 15%", status: "achieved" },
      { name: "課堂小考平均", value: "88 分", detail: "最近 12 次小考平均", status: "achieved" },
      { name: "單字週週考", value: "連續 6 週滿分", detail: "累計 240 字零失誤", status: "achieved" },
    ],
  },
  {
    category: "學習習慣",
    icon: "habit",
    items: [
      { name: "連續學習天數", value: "14 天", detail: "最佳紀錄 21 天", status: "current" },
      { name: "累計學習時數", value: "86 小時", detail: "今年累计 · 距離目標 120 小時", status: "progress" },
      { name: "本月學習時數", value: "9.5 小時", detail: "超過月目標 8 小時 ✓", status: "strong" },
    ],
  },
];

// AI 下一階段方向建議(供選擇)
export const AI_SUGGESTIONS = [
  {
    id: 1,
    title: "口說衝刺計畫",
    reason: "口說表達 65 分是全圖譜最低的維度,且 A1+→A2 的关键障礙就在口說輸出。",
    plan: "每天跟讀 10 分鐘 × Jutor Speaking + 每週 1 次情境口說任務",
    gain: "預估 3 個月口說 +15 分",
    tag: "重點補強",
    selected: false,
  },
  {
    id: 2,
    title: "字彙量 1000 字突破",
    reason: "字彙量 560/1000,距離英檢初級門檻(模擬)還差 440 字。",
    plan: "每週 2 個主題單元 + 記憶星塵道具加成",
    gain: "預估 2026/12 前達標,英檢準備度 +30%",
    tag: "目標導向",
    selected: false,
  },
  {
    id: 3,
    title: "閱讀理解進階",
    reason: "閱讀 82 分為最強項,適合用強項帶動弱項,挑戰 A2 篇章。",
    plan: "每週 2 篇進階短文 + 讀後口述摘要",
    gain: "預估閱讀達 90+,並帶動文法應用",
    tag: "優勢擴充",
    selected: false,
  },
  {
    id: 4,
    title: "文法基礎鞏固",
    reason: "現在式已掌握,但過去式與進行式僅 38% 完成度,是下一步必經之路。",
    plan: "挑戰時態雪山遠征 + 每週 1 個文法主題",
    gain: "預估文法 71→80 分,解鎖 A2 文法樹",
    tag: "基礎加固",
    selected: false,
  },
  {
    id: 5,
    title: "英檢初級備戰",
    reason: "綜合評定已達 A1+,可開始布局 2027/03 的國小英檢初級(模擬時程)。",
    plan: "每月一次模擬檢測 + 弱項單科補強套餐",
    gain: "預估準備度 42%→80% (6 個月)",
    tag: "證照路線",
    selected: false,
  },
];
