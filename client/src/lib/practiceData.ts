export type LearningDimensionId = "listening" | "speaking" | "reading" | "writing" | "vocabulary" | "grammar";

export type PracticeQuestion = {
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  context?: string;
};

export type PracticeMission = {
  id: number;
  name: string;
  subtitle: string;
  difficulty: string;
  dimension: LearningDimensionId;
  accent: string;
  estimate: string;
  junyiUrl: string;
  questions: PracticeQuestion[];
};

export const PRACTICE_MISSIONS: PracticeMission[] = [
  {
    id: 1,
    name: "字母叢林",
    subtitle: "辨識字母與第一個發音線索",
    difficulty: "新手",
    dimension: "speaking",
    accent: "#4ECDC4",
    estimate: "約 3 分鐘",
    junyiUrl: "https://www.junyiacademy.org/topics/junyi-english-lettersandphonics",
    questions: [
      { prompt: "哪一個字母是英文單字 apple 的第一個字母？", choices: ["A", "E", "P", "L"], correctIndex: 0, explanation: "apple 的第一個音是 /æ/，對應字母 A。" },
      { prompt: "請選出與 /b/ 起始音最相近的單字。", choices: ["ball", "cat", "fish", "sun"], correctIndex: 0, explanation: "ball 的開頭是 /b/；先把聲音和字母連起來記。" },
      { prompt: "哪個字母排在 M 的下一個？", choices: ["L", "N", "O", "P"], correctIndex: 1, explanation: "字母順序是 … K、L、M、N …。" },
      { prompt: "單字 dog 的最後一個字母是哪一個？", choices: ["d", "o", "g", "a"], correctIndex: 2, explanation: "dog 由 d、o、g 三個字母組成，最後是 g。" },
    ],
  },
  {
    id: 2,
    name: "單字溪谷",
    subtitle: "從日常情境選出最精準的字彙",
    difficulty: "簡單",
    dimension: "vocabulary",
    accent: "#FFD166",
    estimate: "約 4 分鐘",
    junyiUrl: "https://www.junyiacademy.org/topics/junyi-english-vocab",
    questions: [
      { prompt: "I drink ____ when I am thirsty.", choices: ["water", "book", "chair", "teacher"], correctIndex: 0, explanation: "thirsty 是口渴；water 是最符合語意的飲品。" },
      { prompt: "Which word means「家庭」？", choices: ["family", "friend", "flower", "farm"], correctIndex: 0, explanation: "family 指家人與家庭；可用 my family 介紹家人。" },
      { prompt: "The cat is ____ the table.", choices: ["under", "happy", "blue", "seven"], correctIndex: 0, explanation: "under 表示「在…下面」，是位置介系詞。" },
      { prompt: "選出「長頸鹿」的英文。", choices: ["giraffe", "elephant", "rabbit", "tiger"], correctIndex: 0, explanation: "giraffe 是長頸鹿，記得雙寫 f。" },
    ],
  },
  {
    id: 3,
    name: "對話平原",
    subtitle: "在日常對話中選出自然回應",
    difficulty: "中等",
    dimension: "listening",
    accent: "#60A5FA",
    estimate: "約 4 分鐘",
    junyiUrl: "https://www.junyiacademy.org/topics/junyi-english-context",
    questions: [
      { prompt: "A: How are you?  B: ____", choices: ["I am fine, thank you.", "It is a book.", "I am ten books.", "Good night yesterday."], correctIndex: 0, explanation: "How are you? 用來關心近況；I am fine, thank you. 是自然回應。" },
      { prompt: "A: What is your name?  B: ____", choices: ["My name is Amy.", "I am at school.", "It is Monday.", "I like apples."], correctIndex: 0, explanation: "詢問姓名時可回答 My name is …。" },
      { prompt: "A: Can I borrow your pencil?  B: ____", choices: ["Sure, here you are.", "I am a pencil.", "It is yellow yesterday.", "No, I am hungry."], correctIndex: 0, explanation: "同意借出物品時，Sure, here you are. 既禮貌又自然。" },
      { prompt: "A: Thank you!  B: ____", choices: ["You are welcome.", "I am welcome.", "Thank you book.", "How old are you?"], correctIndex: 0, explanation: "You are welcome. 是回應感謝的常用句。" },
    ],
  },
  {
    id: 4,
    name: "時態雪山",
    subtitle: "辨識現在、過去與進行中的時間線索",
    difficulty: "困難",
    dimension: "grammar",
    accent: "#A977F4",
    estimate: "約 5 分鐘",
    junyiUrl: "https://www.junyiacademy.org/topics/junyi-english-grammar#topic-page-anchor-junyi-english-grammar-tense",
    questions: [
      { prompt: "She ____ to school every day.", choices: ["walks", "walk", "walking", "walked"], correctIndex: 0, explanation: "every day 表示習慣；主詞 She 是第三人稱單數，要用 walks。" },
      { prompt: "They ____ soccer now.", choices: ["play", "plays", "are playing", "played"], correctIndex: 2, explanation: "now 是進行式提示字；They are playing soccer.。" },
      { prompt: "We ____ a movie last night.", choices: ["watch", "watches", "are watching", "watched"], correctIndex: 3, explanation: "last night 表示過去時間，watch 要改成 watched。" },
      { prompt: "I ____ my homework after dinner every day.", choices: ["do", "does", "am doing", "did"], correctIndex: 0, explanation: "主詞 I 搭配原形 do；every day 表示固定習慣。" },
    ],
  },
  {
    id: 5,
    name: "閱讀星雲",
    subtitle: "從短文抓出人物、時間與關鍵細節",
    difficulty: "困難",
    dimension: "reading",
    accent: "#5CE0B8",
    estimate: "約 5 分鐘",
    junyiUrl: "https://www.junyiacademy.org/topics/junyi-english-reading",
    questions: [
      { context: "Mia has a small dog named Coco. Every morning, Mia walks Coco in the park before school.", prompt: "When does Mia walk Coco?", choices: ["Every morning", "After dinner", "On Sundays only", "At night"], correctIndex: 0, explanation: "短文中的 Every morning 直接指出散步時間。" },
      { context: "Mia has a small dog named Coco. Every morning, Mia walks Coco in the park before school.", prompt: "Where do Mia and Coco go?", choices: ["The park", "The library", "The zoo", "The classroom"], correctIndex: 0, explanation: "in the park 指出他們去公園。" },
      { context: "Leo loves space. He reads a book about planets and draws Saturn with its rings.", prompt: "What does Leo draw?", choices: ["Saturn", "The Moon", "A rocket", "A star"], correctIndex: 0, explanation: "draws Saturn with its rings 說明 Leo 畫的是土星。" },
      { context: "Leo loves space. He reads a book about planets and draws Saturn with its rings.", prompt: "Why is Leo likely interested in planets?", choices: ["He loves space.", "He is late for school.", "He is hungry.", "He has a dog."], correctIndex: 0, explanation: "第一句 Leo loves space. 是理解興趣的關鍵。" },
    ],
  },
];

export const getPracticeMission = (missionId: number) => PRACTICE_MISSIONS.find((mission) => mission.id === missionId);
