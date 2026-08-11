import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TreePine,
  Map,
  Award,
  Settings,
  Home,
  ArrowLeft,
  BookOpen,
  Ear,
  Mic,
  Pencil,
  Languages,
  Cog,
  ChevronRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { DIMENSIONS, TODAY_TASKS, ACHIEVEMENTS, RESOURCE_LINKS } from "@/const";

/**
 * SpecialtyPage - 專攻區 (學力之間)
 * 設計哲學:深空極簡主義
 * - 左側欄導航(72px)圖示按鈕
 * - 四大視圖:戰力、技能樹、學習路徑、自我紀錄
 * - 五維能力雷達圖 + 玻璃擬態卡片
 */

const LOGO = "/manus-storage/junyi-logo_3af43229.png";

const dimIcons: Record<string, typeof Ear> = {
  listening: Ear,
  speaking: Mic,
  reading: BookOpen,
  writing: Pencil,
  vocabulary: Languages,
  grammar: Cog,
};

const NAV = [
  { id: "dashboard", icon: BarChart3, label: "戰力" },
  { id: "skills", icon: TreePine, label: "技能" },
  { id: "path", icon: Map, label: "路徑" },
  { id: "records", icon: Award, label: "紀錄" },
];

const SKILLS: Record<string, Array<{ name: string; level: string; unlocked: boolean; progress: number; url: string }>> = {
  listening: [
    { name: "短句聽解", level: "Lv.3", unlocked: true, progress: 80, url: "https://www.junyiacademy.org/topics/junyi-english-listening" },
    { name: "對話理解", level: "Lv.2", unlocked: true, progress: 55, url: "https://www.junyiacademy.org/topics/junyi-english-listening" },
    { name: "故事聽解", level: "Lv.1", unlocked: true, progress: 30, url: "https://www.junyiacademy.org/topics/junyi-english-others-storytelling" },
    { name: "篇章聽解", level: "Lv.1", unlocked: false, progress: 0, url: "https://www.junyiacademy.org/topics/junyi-english-listening" },
  ],
  speaking: [
    { name: "字母發音", level: "Lv.3", unlocked: true, progress: 95, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "單字跟讀", level: "Lv.2", unlocked: true, progress: 60, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "句型模仿", level: "Lv.1", unlocked: true, progress: 20, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "主題簡報", level: "Lv.1", unlocked: false, progress: 0, url: "https://www.junyiacademy.org/topics/junyi-english" },
  ],
  reading: [
    { name: "句子認讀", level: "Lv.3", unlocked: true, progress: 85, url: "https://www.junyiacademy.org/topics/eng-elementary" },
    { name: "短文理解", level: "Lv.2", unlocked: true, progress: 45, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "推論閱讀", level: "Lv.1", unlocked: true, progress: 15, url: "https://www.junyiacademy.org/topics/junyi-english" },
  ],
  writing: [
    { name: "單字拼寫", level: "Lv.3", unlocked: true, progress: 75, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "句子書寫", level: "Lv.2", unlocked: true, progress: 50, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "段落寫作", level: "Lv.1", unlocked: false, progress: 0, url: "https://www.junyiacademy.org/topics/junyi-english" },
  ],
  vocabulary: [
    { name: "主題單字(食物/動物)", level: "Lv.3", unlocked: true, progress: 90, url: "https://www.junyiacademy.org/topics/eng-elementary" },
    { name: "家庭與學校", level: "Lv.2", unlocked: true, progress: 70, url: "https://www.junyiacademy.org/topics/eng-elementary" },
    { name: "自然與科學", level: "Lv.1", unlocked: true, progress: 35, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "進階學術字彙", level: "Lv.1", unlocked: false, progress: 0, url: "https://www.junyiacademy.org/topics/junyi-english" },
  ],
  grammar: [
    { name: "be動詞", level: "Lv.3", unlocked: true, progress: 100, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "現在進行式", level: "Lv.2", unlocked: true, progress: 65, url: "https://www.junyiacademy.org/videos/nMV0ZvWSqW4" },
    { name: "過去式", level: "Lv.1", unlocked: true, progress: 25, url: "https://www.junyiacademy.org/topics/junyi-english" },
    { name: "完成式", level: "Lv.1", unlocked: false, progress: 0, url: "https://www.junyiacademy.org/topics/junyi-english" },
  ],
};

/** 五維能力雷達圖(SVG) */
function RadarChart() {
  const size = 260;
  const center = size / 2;
  const radius = 85;
  // listening, speaking, reading, writing, vocabulary (以文法作第五軸參考)
  const values = [0.75, 0.65, 0.6, 0.5, 0.82];
  const labels = ["聽力", "口說", "閱讀", "寫作", "字彙"];

  const points = values.map((v, i) => {
    const angle = (i * 360) / values.length;
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + radius * v * Math.cos(rad),
      y: center + radius * v * Math.sin(rad),
      lx: center + (radius + 22) * Math.cos(rad),
      ly: center + (radius + 22) * Math.sin(rad),
    };
  });

  return (
    <div className="w-full flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[340px]">
        {[1, 2, 3, 4, 5].map((i) => {
          const r = (i * radius) / 5;
          const pts = values.map((_, idx) => {
            const angle = (idx * 360) / values.length;
            const rad = ((angle - 90) * Math.PI) / 180;
            return `${center + r * Math.cos(rad)},${center + r * Math.sin(rad)}`;
          });
          return (
            <polygon key={i} points={pts.join(" ")} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          );
        })}
        {points.map((p, i) => (
          <g key={i}>
            <line x1={center} y1={center} x2={p.lx} y2={p.ly} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text
              x={p.lx}
              y={p.ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(232, 236, 241, 0.8)"
              fontSize="12"
            >
              {labels[i]}
            </text>
          </g>
        ))}
        <polygon
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="rgba(78, 205, 196, 0.25)"
          stroke="#4ECDC4"
          strokeWidth="2"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#4ECDC4" />
        ))}
      </svg>
    </div>
  );
}

export default function SpecialtyPage() {
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [selectedDimension, setSelectedDimension] = useState<string>("listening");
  const [tasks, setTasks] = useState<Array<{ id: number; name: string; category: string; minutes: number; done: boolean }>>([...TODAY_TASKS]);

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* 左側欄 */}
      <aside className="w-20 border-r border-white/8 flex flex-col items-center py-6 gap-4 bg-background/60">
        <Link href="/hall">
          <button className="p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all mb-4" title="回大廳">
            <Home className="w-5 h-5" />
          </button>
        </Link>
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
        <div className="mt-auto">
          <button className="p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all" title="設定">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* 主內容 */}
      <main className="flex-1 overflow-auto">
        {/* 頂部狀態列 */}
        <div className="sticky top-0 z-40 border-b border-white/8 bg-background/80 backdrop-cosmic">
          <div className="container py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/hall">
                <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <h1 className="text-2xl font-bold">
                {activeView === "dashboard" && "戰力現狀"}
                {activeView === "skills" && "技能樹"}
                {activeView === "path" && "學習路徑"}
                {activeView === "records" && "自我紀錄"}
              </h1>
            </div>
            <Button variant="outline" size="sm" className="border-accent/40 text-accent hover:bg-accent/10">
              近30天
            </Button>
          </div>
        </div>

        <div className="container py-8">
          {/* 戰力視圖 */}
          {activeView === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-6">五維能力評估</h2>
                  <RadarChart />
                  <div className="mt-6 text-center">
                    <div className="text-4xl font-bold text-accent font-mono">A1+</div>
                    <div className="text-sm text-muted-foreground">綜合等級 · CEFR</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">目標設定</h3>
                  <select className="input-cosmic w-full mb-3 text-sm">
                    <option>校園英語檢測 A2</option>
                    <option>國小英檢初級</option>
                    <option>國中會考閱讀C</option>
                  </select>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>需累積字彙量: 300 字</div>
                    <div>練習篇數: 12 篇</div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="text-xs text-muted-foreground mb-1">累積學習時數</div>
                  <div className="text-2xl font-bold font-mono">86 小時</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-xs text-muted-foreground mb-1">連續天數</div>
                  <div className="text-2xl font-bold font-mono">14 天</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-xs text-muted-foreground mb-1">最近檢測</div>
                  <div className="text-sm font-semibold font-mono">2026/08/05</div>
                </div>
              </div>
            </div>
          )}

          {/* 技能樹視圖 */}
          {activeView === "skills" && (
            <div className="space-y-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {DIMENSIONS.map((dim) => {
                  const DimIcon = dimIcons[dim.id] ?? BookOpen;
                  return (
                    <button
                      key={dim.id}
                      onClick={() => setSelectedDimension(dim.id)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 inline-flex items-center gap-2 ${
                        selectedDimension === dim.id
                          ? "bg-accent text-accent-foreground"
                          : "glass-card hover:bg-white/6"
                      }`}
                    >
                      <DimIcon className="w-4 h-4" />
                      {dim.name}
                    </button>
                  );
                })}
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-6">
                  {DIMENSIONS.find((d) => d.id === selectedDimension)?.name} 技能樹
                </h3>
                <div className="space-y-4">
                  {(SKILLS[selectedDimension] ?? []).map((skill, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg border p-4 transition-all ${
                        skill.unlocked
                          ? "border-white/10 bg-white/3"
                          : "border-white/5 bg-white/1 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">
                            {skill.unlocked ? "🌟" : "🔒"}
                          </span>
                          <div>
                            <div className="font-medium text-sm">{skill.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">{skill.level}</div>
                          </div>
                        </div>
                        <a
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs inline-flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                            skill.unlocked
                              ? "bg-accent/15 text-accent hover:bg-accent/25"
                              : "bg-white/5 text-muted-foreground cursor-not-allowed"
                          }`}
                          onClick={(e) => !skill.unlocked && e.preventDefault()}
                        >
                          {skill.unlocked ? "開始學習" : "先解鎖前置技能"}
                          <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-300 transition-all duration-500"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 學習路徑視圖 */}
          {activeView === "path" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">今日任務</h3>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                          task.done
                            ? "border-accent/30 bg-accent/5"
                            : "border-white/10 bg-white/3 hover:bg-white/5"
                        }`}
                      >
                        {task.done ? (
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}>
                            {task.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {task.category} · 約 {task.minutes} 分鐘
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/8 text-xs text-muted-foreground">
                    完成 {tasks.filter((t) => t.done).length}/{tasks.length} 個任務
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">學習熱力圖</h3>
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const intensity = Math.floor(Math.random() * 5);
                    const colors = ["bg-white/5", "bg-teal-900/30", "bg-teal-700/40", "bg-teal-500/50", "bg-teal-400/70"];
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm ${colors[intensity]}`}
                        title={`第 ${i + 1} 天`}
                      />
                    );
                  })}
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  深淺代表每日學習量,本週共學習 <span className="text-accent font-mono">5</span> 天
                </div>
              </div>
            </div>
          )}

          {/* 自我紀錄視圖 */}
          {activeView === "records" && (
            <div className="space-y-6">
              <Tabs defaultValue="achievements" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/5">
                  <TabsTrigger value="achievements">成就勳章</TabsTrigger>
                  <TabsTrigger value="resources">推薦資源</TabsTrigger>
                </TabsList>

                <TabsContent value="achievements" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {ACHIEVEMENTS.map((badge) => (
                      <div
                        key={badge.id}
                        className={`glass-card p-4 text-center transition-all ${
                          badge.unlocked ? "" : "opacity-40 grayscale"
                        }`}
                      >
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="text-sm font-semibold">{badge.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {RESOURCE_LINKS.map((res, idx) => (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card-hover p-4 flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-semibold">{res.category}</div>
                          <div className="text-xs text-muted-foreground mt-1">前往均一官網學習</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </a>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
