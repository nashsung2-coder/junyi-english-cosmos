import type { SubjectId } from "@/lib/subjectUniverse";

export type LearningDimensionId = "listening" | "speaking" | "reading" | "writing" | "vocabulary" | "grammar" | "chinese" | "math" | "science" | "social" | "arts" | "health";

export type PracticeQuestion = {
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  context?: string;
};

export type PracticeMission = {
  id: number;
  subject: SubjectId;
  name: string;
  subtitle: string;
  difficulty: string;
  dimension: LearningDimensionId;
  accent: string;
  estimate: string;
  questions: PracticeQuestion[];
};

export const PRACTICE_MISSIONS: PracticeMission[] = [
  {
    id: 1,
    subject: "english",
    name: "字母叢林",
    subtitle: "辨識字母與第一個發音線索",
    difficulty: "新手",
    dimension: "speaking",
    accent: "#4ECDC4",
    estimate: "約 3 分鐘",
    questions: [
      { prompt: "哪一個字母是英文單字 apple 的第一個字母？", choices: ["A", "E", "P", "L"], correctIndex: 0, explanation: "apple 的第一個音是 /æ/，對應字母 A。" },
      { prompt: "請選出與 /b/ 起始音最相近的單字。", choices: ["ball", "cat", "fish", "sun"], correctIndex: 0, explanation: "ball 的開頭是 /b/；先把聲音和字母連起來記。" },
      { prompt: "哪個字母排在 M 的下一個？", choices: ["L", "N", "O", "P"], correctIndex: 1, explanation: "字母順序是 … K、L、M、N …。" },
      { prompt: "單字 dog 的最後一個字母是哪一個？", choices: ["d", "o", "g", "a"], correctIndex: 2, explanation: "dog 由 d、o、g 三個字母組成，最後是 g。" },
    ],
  },
  {
    id: 2,
    subject: "english",
    name: "單字溪谷",
    subtitle: "從日常情境選出最精準的字彙",
    difficulty: "簡單",
    dimension: "vocabulary",
    accent: "#FFD166",
    estimate: "約 4 分鐘",
    questions: [
      { prompt: "I drink ____ when I am thirsty.", choices: ["water", "book", "chair", "teacher"], correctIndex: 0, explanation: "thirsty 是口渴；water 是最符合語意的飲品。" },
      { prompt: "Which word means「家庭」？", choices: ["family", "friend", "flower", "farm"], correctIndex: 0, explanation: "family 指家人與家庭；可用 my family 介紹家人。" },
      { prompt: "The cat is ____ the table.", choices: ["under", "happy", "blue", "seven"], correctIndex: 0, explanation: "under 表示「在…下面」，是位置介系詞。" },
      { prompt: "選出「長頸鹿」的英文。", choices: ["giraffe", "elephant", "rabbit", "tiger"], correctIndex: 0, explanation: "giraffe 是長頸鹿，記得雙寫 f。" },
    ],
  },
  {
    id: 3,
    subject: "english",
    name: "對話平原",
    subtitle: "在日常對話中選出自然回應",
    difficulty: "中等",
    dimension: "listening",
    accent: "#60A5FA",
    estimate: "約 4 分鐘",
    questions: [
      { prompt: "A: How are you?  B: ____", choices: ["I am fine, thank you.", "It is a book.", "I am ten books.", "Good night yesterday."], correctIndex: 0, explanation: "How are you? 用來關心近況；I am fine, thank you. 是自然回應。" },
      { prompt: "A: What is your name?  B: ____", choices: ["My name is Amy.", "I am at school.", "It is Monday.", "I like apples."], correctIndex: 0, explanation: "詢問姓名時可回答 My name is …。" },
      { prompt: "A: Can I borrow your pencil?  B: ____", choices: ["Sure, here you are.", "I am a pencil.", "It is yellow yesterday.", "No, I am hungry."], correctIndex: 0, explanation: "同意借出物品時，Sure, here you are. 既禮貌又自然。" },
      { prompt: "A: Thank you!  B: ____", choices: ["You are welcome.", "I am welcome.", "Thank you book.", "How old are you?"], correctIndex: 0, explanation: "You are welcome. 是回應感謝的常用句。" },
    ],
  },
  {
    id: 4,
    subject: "english",
    name: "時態雪山",
    subtitle: "辨識現在、過去與進行中的時間線索",
    difficulty: "困難",
    dimension: "grammar",
    accent: "#A977F4",
    estimate: "約 5 分鐘",
    questions: [
      { prompt: "She ____ to school every day.", choices: ["walks", "walk", "walking", "walked"], correctIndex: 0, explanation: "every day 表示習慣；主詞 She 是第三人稱單數，要用 walks。" },
      { prompt: "They ____ soccer now.", choices: ["play", "plays", "are playing", "played"], correctIndex: 2, explanation: "now 是進行式提示字；They are playing soccer.。" },
      { prompt: "We ____ a movie last night.", choices: ["watch", "watches", "are watching", "watched"], correctIndex: 3, explanation: "last night 表示過去時間，watch 要改成 watched。" },
      { prompt: "I ____ my homework after dinner every day.", choices: ["do", "does", "am doing", "did"], correctIndex: 0, explanation: "主詞 I 搭配原形 do；every day 表示固定習慣。" },
    ],
  },
  {
    id: 5,
    subject: "english",
    name: "閱讀星雲",
    subtitle: "從短文抓出人物、時間與關鍵細節",
    difficulty: "困難",
    dimension: "reading",
    accent: "#5CE0B8",
    estimate: "約 5 分鐘",
    questions: [
      { context: "Mia has a small dog named Coco. Every morning, Mia walks Coco in the park before school.", prompt: "When does Mia walk Coco?", choices: ["Every morning", "After dinner", "On Sundays only", "At night"], correctIndex: 0, explanation: "短文中的 Every morning 直接指出散步時間。" },
      { context: "Mia has a small dog named Coco. Every morning, Mia walks Coco in the park before school.", prompt: "Where do Mia and Coco go?", choices: ["The park", "The library", "The zoo", "The classroom"], correctIndex: 0, explanation: "in the park 指出他們去公園。" },
      { context: "Leo loves space. He reads a book about planets and draws Saturn with its rings.", prompt: "What does Leo draw?", choices: ["Saturn", "The Moon", "A rocket", "A star"], correctIndex: 0, explanation: "draws Saturn with its rings 說明 Leo 畫的是土星。" },
      { context: "Leo loves space. He reads a book about planets and draws Saturn with its rings.", prompt: "Why is Leo likely interested in planets?", choices: ["He loves space.", "He is late for school.", "He is hungry.", "He has a dog."], correctIndex: 0, explanation: "第一句 Leo loves space. 是理解興趣的關鍵。" },
    ],
  },
  {
    id: 101,
    subject: "chinese",
    name: "成語星橋",
    subtitle: "從語境讀懂成語的意義與用法",
    difficulty: "簡單",
    dimension: "chinese",
    accent: "#F08A8A",
    estimate: "約 3 分鐘",
    questions: [
      { prompt: "「畫龍點睛」最接近下列哪一個意思？", choices: ["在關鍵處加上精采的一筆", "把龍畫得很大", "做事拖延", "一直重複練習"], correctIndex: 0, explanation: "畫龍點睛比喻在關鍵處加上精要的一筆，使整體更生動。" },
      { prompt: "下列哪一句最適合使用「津津有味」？", choices: ["小明把故事書讀得津津有味。", "天空津津有味地下雨。", "妹妹津津有味地睡覺。", "爸爸津津有味地遲到。"], correctIndex: 0, explanation: "津津有味形容對事情很有興趣，讀故事書的語境最自然。" },
      { prompt: "「春風化雨」通常用來比喻什麼？", choices: ["溫和而有成效的教導", "猛烈的暴風雨", "春天的旅行", "農作物收成"], correctIndex: 0, explanation: "春風化雨比喻良好的教育與薰陶。" },
    ],
  },
  {
    id: 102,
    subject: "math",
    name: "數字迷宮",
    subtitle: "解開數量、運算與規律的航線",
    difficulty: "簡單",
    dimension: "math",
    accent: "#FFD166",
    estimate: "約 3 分鐘",
    questions: [
      { prompt: "36 ÷ 4 的答案是？", choices: ["7", "8", "9", "10"], correctIndex: 2, explanation: "4 × 9 = 36，所以 36 ÷ 4 = 9。" },
      { prompt: "找出規律：3、6、9、12、____", choices: ["13", "14", "15", "16"], correctIndex: 2, explanation: "每次加 3，因此下一個數是 15。" },
      { prompt: "一個正方形有幾條邊？", choices: ["3", "4", "5", "6"], correctIndex: 1, explanation: "正方形有四條邊，而且四邊等長。" },
    ],
  },
  {
    id: 103,
    subject: "science",
    name: "元素觀測站",
    subtitle: "用觀察與推理解開自然現象",
    difficulty: "簡單",
    dimension: "science",
    accent: "#73D5FF",
    estimate: "約 3 分鐘",
    questions: [
      { prompt: "植物製造養分主要需要哪一種能量？", choices: ["太陽光", "月光", "風力", "聲音"], correctIndex: 0, explanation: "植物透過光合作用利用太陽光製造養分。" },
      { prompt: "水加熱後變成水蒸氣，這個變化叫什麼？", choices: ["凝固", "蒸發", "融化", "結冰"], correctIndex: 1, explanation: "液態水受熱變成氣態水蒸氣，稱為蒸發。" },
      { prompt: "下列何者是生物？", choices: ["石頭", "雲朵", "蝴蝶", "雨滴"], correctIndex: 2, explanation: "蝴蝶會生長、繁殖並對環境產生反應，是生物。" },
    ],
  },
  {
    id: 104,
    subject: "social",
    name: "島嶼座標",
    subtitle: "從地圖與生活讀懂我們所在的地方",
    difficulty: "簡單",
    dimension: "social",
    accent: "#A78BFA",
    estimate: "約 3 分鐘",
    questions: [
      { prompt: "地圖上的圖例主要用來說明什麼？", choices: ["地圖符號的意義", "天氣預報", "故事內容", "考試分數"], correctIndex: 0, explanation: "圖例會解釋地圖上各種顏色與符號代表的資訊。" },
      { prompt: "要規劃到陌生地方的路線，最先可以參考什麼？", choices: ["地圖", "食譜", "課表", "小說"], correctIndex: 0, explanation: "地圖能提供位置、方向和道路等路線資訊。" },
      { prompt: "社區公園最可能提供哪一種公共功能？", choices: ["休閒運動", "製造汽車", "印製貨幣", "發射火箭"], correctIndex: 0, explanation: "公園通常提供居民休閒、遊戲和運動的空間。" },
    ],
  },
  {
    id: 105,
    subject: "arts",
    name: "色彩星雲",
    subtitle: "用色彩與節奏探索創作語言",
    difficulty: "簡單",
    dimension: "arts",
    accent: "#F59DDA",
    estimate: "約 3 分鐘",
    questions: [
      { prompt: "紅色和黃色混合後，最可能接近哪一種顏色？", choices: ["綠色", "橘色", "紫色", "藍色"], correctIndex: 1, explanation: "紅、黃兩種顏色混合，會形成橘色。" },
      { prompt: "重複出現且有規律的強弱變化，最接近音樂的哪個元素？", choices: ["節奏", "顏色", "大小", "氣味"], correctIndex: 0, explanation: "節奏是聲音長短、強弱與重複規律形成的感受。" },
      { prompt: "創作前先觀察光線與物體形狀，主要是在培養什麼？", choices: ["觀察力", "記憶密碼", "跑步速度", "音量"], correctIndex: 0, explanation: "仔細觀察是把真實感受轉成創作的重要起點。" },
    ],
  },
  {
    id: 106,
    subject: "health",
    name: "活力軌道",
    subtitle: "把照顧身心變成穩定的探索能量",
    difficulty: "簡單",
    dimension: "health",
    accent: "#5CC9A7",
    estimate: "約 3 分鐘",
    questions: [
      { prompt: "長時間使用螢幕後，較合適的做法是？", choices: ["持續盯著螢幕", "休息眼睛並望向遠處", "把亮度調到最高", "不喝水"], correctIndex: 1, explanation: "適度休息眼睛、看向遠處，可以減少用眼疲勞。" },
      { prompt: "下列何者較有助於維持日常精神？", choices: ["規律作息", "整晚不睡", "只吃零食", "完全不活動"], correctIndex: 0, explanation: "規律睡眠與休息能幫助身體恢復精神。" },
      { prompt: "運動後補充水分的主要目的之一是？", choices: ["幫助身體補水", "讓鞋子變亮", "讓作業變少", "讓時間停止"], correctIndex: 0, explanation: "流汗後適量補水，有助於維持身體正常運作。" },
    ],
  },
];

export const getPracticeMission = (missionId: number) => PRACTICE_MISSIONS.find((mission) => mission.id === missionId);
