import type { SubjectId } from "@/lib/subjectUniverse";

export type LearningDimensionId = "listening" | "speaking" | "reading" | "writing" | "vocabulary" | "grammar" | "chinese" | "math" | "science" | "social" | "arts" | "health" | "physics" | "chemistry" | "biology" | "earthScience";

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
  stage?: "elementary" | "junior" | "senior";
  courseTrack?: "required" | "elective";
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
  {
    id: 107,
    subject: "math",
    name: "比例航標",
    subtitle: "用等值比例與倍數找出正確的航線座標",
    difficulty: "中等",
    dimension: "math",
    accent: "#F8C46B",
    estimate: "約 4 分鐘",
    questions: [
      { prompt: "3 : 5 = 12 : □，□ 應該是多少？", choices: ["15", "18", "20", "24"], correctIndex: 2, explanation: "3 變成 12 是乘以 4，5 也要乘以 4，所以是 20。" },
      { prompt: "4 支相同的筆要 60 元，7 支相同的筆要多少元？", choices: ["90 元", "95 元", "100 元", "105 元"], correctIndex: 3, explanation: "每支筆 60 ÷ 4 = 15 元；7 × 15 = 105 元。" },
      { prompt: "2/3 = □/18，□ 應該是多少？", choices: ["6", "9", "12", "15"], correctIndex: 2, explanation: "分母 3 變成 18 是乘以 6，分子 2 也乘以 6，所以是 12。" },
    ],
  },
  {
    id: 108,
    subject: "science",
    name: "磁力探勘",
    subtitle: "透過材料、磁極與距離觀察磁力現象",
    difficulty: "中等",
    dimension: "science",
    accent: "#73D5FF",
    estimate: "約 4 分鐘",
    questions: [
      { prompt: "下列哪一種物品最可能被一般磁鐵吸住？", choices: ["鐵迴紋針", "木尺", "塑膠湯匙", "橡皮擦"], correctIndex: 0, explanation: "一般磁鐵能吸引含鐵的材料，因此鐵迴紋針最容易被吸住。" },
      { prompt: "把兩個磁鐵的不同磁極慢慢靠近，通常會看到什麼現象？", choices: ["互相吸引", "互相排斥", "完全沒有變化", "同時融化"], correctIndex: 0, explanation: "不同磁極會互相吸引；相同磁極才會排斥。" },
      { prompt: "把磁鐵和迴紋針的距離拉遠，磁力通常會如何變化？", choices: ["變強", "變弱", "完全不變", "變成光"], correctIndex: 1, explanation: "磁力會隨距離增加而減弱，因此觀察時要控制距離。" },
    ],
  },
  {
    id: 109,
    subject: "social",
    name: "臺灣巡航圖",
    subtitle: "用區域、地圖與生活線索認識島嶼上的地方差異",
    difficulty: "中等",
    dimension: "social",
    accent: "#A78BFA",
    estimate: "約 4 分鐘",
    questions: [
      { prompt: "想比較臺灣不同地區的人口、產業與地形，最適合先使用哪一種工具？", choices: ["主題地圖", "食譜", "小說", "班級名冊"], correctIndex: 0, explanation: "主題地圖可以把人口、產業或地形等資訊標示在空間位置上，方便比較。" },
      { prompt: "閱讀地圖時，哪一項資訊最能幫助你判讀方向？", choices: ["指北針或方向標示", "插圖的顏色", "紙張厚度", "頁碼大小"], correctIndex: 0, explanation: "指北針或方向標示會告訴我們地圖上的東、西、南、北。" },
      { prompt: "若要介紹一個地方的特色，下列哪一種資料最能讓說明更完整？", choices: ["地形、產業與居民生活的資料", "只寫一個地名", "只畫一顆星星", "只記錄今天的心情"], correctIndex: 0, explanation: "把自然環境、產業與人們的生活連在一起，才能更完整理解地方特色。" },
    ],
  },
  {
    id: 110,
    subject: "arts",
    name: "節奏脈衝",
    subtitle: "從拍子、符值與休止辨識音樂的時間感",
    difficulty: "中等",
    dimension: "arts",
    accent: "#F59DDA",
    estimate: "約 4 分鐘",
    questions: [
      { prompt: "在常見的 4/4 拍中，一個四分音符通常佔幾拍？", choices: ["1 拍", "2 拍", "3 拍", "4 拍"], correctIndex: 0, explanation: "4/4 拍常以四分音符為一拍，因此一個四分音符佔 1 拍。" },
      { prompt: "兩個八分音符合在一起，通常和幾個四分音符一樣長？", choices: ["半個", "1 個", "2 個", "4 個"], correctIndex: 1, explanation: "兩個八分音符各佔半拍，合起來剛好等於一個四分音符。" },
      { prompt: "音樂中的休止符主要用來表示什麼？", choices: ["需要安靜的時間長度", "演奏得更快", "把音變高", "把樂器換色"], correctIndex: 0, explanation: "休止符表示暫時不發聲的拍數；安靜也是節奏的一部分。" },
    ],
  },
  {
    id: 111,
    subject: "health",
    name: "食代補給站",
    subtitle: "用飲食選擇與減少浪費為生活補充穩定能量",
    difficulty: "中等",
    dimension: "health",
    accent: "#5CC9A7",
    estimate: "約 4 分鐘",
    questions: [
      { prompt: "午餐取餐時，哪一種做法較能減少食物浪費？", choices: ["先取自己吃得完的份量", "每樣都拿很多再丟掉", "只拿甜點", "把飯菜混在桌上"], correctIndex: 0, explanation: "先評估食量並取適量，能減少剩食，也讓飲食安排更負責任。" },
      { prompt: "規劃一餐時，加入不同種類食材的主要用意是什麼？", choices: ["讓營養來源更豐富", "讓餐盤更重", "讓用餐更慢", "讓食物只剩一種顏色"], correctIndex: 0, explanation: "不同食材提供不同營養來源；多樣選擇有助於建立均衡的飲食習慣。" },
      { prompt: "準備點心前，先查看家中現有食材，最能幫助做到什麼？", choices: ["減少重複購買與食物放到過期", "讓食物自動變多", "不需要保存食材", "不用閱讀任何標示"], correctIndex: 0, explanation: "先盤點現有食材能幫助妥善使用，減少不必要購買與浪費。" },
    ],
  },
  {
    id: 201,
    subject: "physics",
    name: "力與運動校準",
    subtitle: "高中物理必修：用受力與速度變化建立系統觀點",
    difficulty: "高中必修",
    dimension: "physics",
    accent: "#78C7FF",
    estimate: "約 5 分鐘",
    stage: "senior",
    courseTrack: "required",
    questions: [
      { prompt: "物體若保持等速度直線運動，合力最可能是多少？", choices: ["0", "一定向前", "一定向上", "持續增加"], correctIndex: 0, explanation: "等速度直線運動表示速度沒有改變，因此依牛頓第一定律，物體所受合力為 0。" },
      { prompt: "若同方向的兩個力分別為 3 N 與 5 N，合力大小為何？", choices: ["2 N", "8 N", "15 N", "0 N"], correctIndex: 1, explanation: "同方向的力可直接相加，所以合力是 3 + 5 = 8 N。" },
      { prompt: "下列何者最能描述加速度？", choices: ["速度改變的快慢與方向", "物體的體積", "物體的顏色", "路程一定等於時間"], correctIndex: 0, explanation: "加速度描述速度隨時間的改變，包含快慢與方向的變化。" },
    ],
  },
  {
    id: 202,
    subject: "chemistry",
    name: "粒子變化觀測",
    subtitle: "高中化學必修：從原子、分子與反應讀懂物質變化",
    difficulty: "高中必修",
    dimension: "chemistry",
    accent: "#FF9B7A",
    estimate: "約 5 分鐘",
    stage: "senior",
    courseTrack: "required",
    questions: [
      { prompt: "化學反應前後，下列哪一項在封閉系統中應遵守守恆？", choices: ["總質量", "容器顏色", "反應時間", "氣泡大小"], correctIndex: 0, explanation: "封閉系統中原子重新排列，但原子總數與總質量保持不變。" },
      { prompt: "原子序主要用來表示原子核內的哪一種粒子數？", choices: ["質子", "中子加電子", "分子", "離子"], correctIndex: 0, explanation: "原子序等於質子數，這也是元素身分的判準。" },
      { prompt: "冰融化成水時，最合適的描述是什麼？", choices: ["物理變化", "產生新元素", "核反應", "一定燃燒"], correctIndex: 0, explanation: "融化只改變物質狀態，水分子的組成並未改變，因此是物理變化。" },
    ],
  },
  {
    id: 203,
    subject: "biology",
    name: "生命系統觀察",
    subtitle: "高中生物必修：從細胞功能到生態系的層次連結",
    difficulty: "高中必修",
    dimension: "biology",
    accent: "#8EE6A4",
    estimate: "約 5 分鐘",
    stage: "senior",
    courseTrack: "required",
    questions: [
      { prompt: "細胞膜最重要的功能之一是什麼？", choices: ["調節物質進出", "製造岩石", "決定行星軌道", "只負責發光"], correctIndex: 0, explanation: "細胞膜具有選擇性通透性，協助細胞維持內部環境。" },
      { prompt: "在食物網中，植物通常扮演什麼角色？", choices: ["生產者", "分解者", "消費者", "寄生者"], correctIndex: 0, explanation: "植物可透過光合作用製造有機物，因此通常是生產者。" },
      { prompt: "族群大小接近環境容納量時，最可能出現哪種情況？", choices: ["資源限制使成長趨緩", "所有資源無限增加", "所有個體立刻消失", "不再有任何交互作用"], correctIndex: 0, explanation: "當資源、空間等限制變明顯，族群成長速率通常會趨緩。" },
    ],
  },
  {
    id: 204,
    subject: "earth-science",
    name: "地球系統巡測",
    subtitle: "高中地科必修：連結大氣、海洋、岩石圈與星空觀測",
    difficulty: "高中必修",
    dimension: "earthScience",
    accent: "#B6A6FF",
    estimate: "約 5 分鐘",
    stage: "senior",
    courseTrack: "required",
    questions: [
      { prompt: "造成晝夜交替的主要原因是什麼？", choices: ["地球自轉", "月球自轉", "地球公轉一圈", "雲層移動"], correctIndex: 0, explanation: "地球自轉使不同地區輪流面向太陽，形成晝夜交替。" },
      { prompt: "下列哪一項屬於水循環中的過程？", choices: ["蒸發", "核融合", "礦物結晶一定停止", "聲音傳播"], correctIndex: 0, explanation: "水受熱可由液態轉為水氣，這個過程稱為蒸發。" },
      { prompt: "板塊邊界附近常見地震與火山，最能支持哪個觀點？", choices: ["地球岩石圈由板塊組成並會相互運動", "地表從不改變", "所有地震由天氣造成", "海洋與陸地沒有關係"], correctIndex: 0, explanation: "地震與火山分布和板塊邊界密切相關，是板塊運動的重要證據。" },
    ],
  },
];

export const getPracticeMission = (missionId: number) => PRACTICE_MISSIONS.find((mission) => mission.id === missionId);
