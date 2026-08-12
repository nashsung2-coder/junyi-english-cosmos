import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, TrendingUp, BookOpen, Users, Gift, MessageCircle, ChevronUp, ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import SubjectPlaceholder from "@/components/SubjectPlaceholder";
import CosmicCommandDeck from "@/components/CosmicCommandDeck";

/**
 * ParentPage - 家長區 (親子星港)
 * 設計哲學:深空極簡主義 — 治癒薄荷 #5CC9A7 主題
 * - 孩子切換器
 * - 成長摘要、能力風景、親子共學艙、成長相簿、加油小棧
 */

const FAMILY_IMG = "/assets/junyi-family.png";
const MASCOT_IMG = "/assets/junyi-mascot.png";

const CHILDREN = [
  { id: 1, name: "星兒", grade: "國小四年級" },
  { id: 2, name: "辰辰", grade: "國小一年級" },
];

const DIMS = [
  { name: "聽力", value: 72, trend: "up", note: "對話理解進步明顯,繼續保持!" },
  { name: "口說", value: 58, trend: "up", note: "跟讀練習越來越流利了。" },
  { name: "閱讀", value: 51, trend: "down", note: "短文理解需要多練習,試試每天一篇。" },
  { name: "字彙", value: 66, trend: "up", note: "本週新認識 35 個單字。" },
];

const RECENT_ACTIVITY = [
  { date: "08/10", text: "完成「現在進行式」單元測驗", detail: "答對率 85%", color: "#5CC9A7" },
  { date: "08/09", text: "知識遠征:單字溪谷 通過", detail: "+180 經驗值", color: "#FFD166" },
  { date: "08/08", text: "Jutor Speaking 跟讀練習", detail: "10 分鐘", color: "#60A5FA" },
  { date: "08/07", text: "觀看「字母發音」影片系列", detail: "3 部影片", color: "#A977F4" },
];

const GALLERY = [
  { title: "第一次滿分", date: "2026/07/20", desc: "單元測驗第一次拿到滿分,好棒!" },
  { title: "連續7天挑戰", date: "2026/07/28", desc: "完成連續7天學習挑戰,獲得勳章。" },
  { title: "口說冒險家", date: "2026/08/02", desc: "完成第10次口說練習,解鎖成就。" },
];

const ENCOURAGEMENTS = [
  { text: "今天的你比昨天更厲害!", color: "#5CC9A7" },
  { text: "錯了沒關係,再試一次就是進步。", color: "#60A5FA" },
  { text: "我为你準備了星星,加油!", color: "#FFD166" },
  { text: "慢慢來,steady progress is still progress.", color: "#A977F4" },
];

export default function ParentPage() {
  const [selectedChild, setSelectedChild] = useState(1);
  const [selectedEnc, setSelectedEnc] = useState(0);
  const [buffSent, setBuffSent] = useState(false);

  const child = CHILDREN.find((c) => c.id === selectedChild)!;

  const sendBuff = () => {
    setBuffSent(true);
    setTimeout(() => setBuffSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 全站導覽列 */}
      <Navbar />
      {/* 頂部狀態列 */}
      <div className="sticky top-[60px] z-30 border-b border-white/8 bg-background/80 backdrop-cosmic">
        <div className="container pt-5 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/hall" className="tap-target inline-flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground" aria-label="回到大廳">
              <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <h1 className="text-2xl font-bold">親子星港</h1>
          </div>
          <div className="flex items-center gap-2">
            {CHILDREN.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChild(c.id)}
                className={`tap-target px-3 py-1.5 rounded-full text-xs transition-all ${
                  selectedChild === c.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    : "bg-white/5 text-muted-foreground hover:bg-white/8"
                }`}
              >
                {c.name} · {c.grade}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        <CosmicCommandDeck
          eyebrow="FAMILY LEARNING PORT"
          title={`陪伴 ${child.name}，把每一次努力留在星圖上`}
          description="從當週的練習節奏、能力變化到一句及時鼓勵，親子星港把共學的每一步整理成溫柔而清楚的陪伴線索。"
          icon={Heart}
          accent="#5CC9A7"
          action={<Link href="/journey" className="tap-target inline-flex items-center rounded-xl border border-emerald-300/35 bg-emerald-300/[0.08] px-3.5 py-2 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-300/[0.15]">查看成長星圖 →</Link>}
        >
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div><span className="block text-[10px] font-bold tracking-[.12em] text-slate-500">本週學習</span><span className="mt-1 block font-mono text-lg font-semibold text-white">4 次</span></div>
            <div><span className="block text-[10px] font-bold tracking-[.12em] text-slate-500">連續紀錄</span><span className="mt-1 block font-mono text-lg font-semibold text-emerald-200">12 天</span></div>
            <div><span className="block text-[10px] font-bold tracking-[.12em] text-slate-500">最新正確率</span><span className="mt-1 block font-mono text-lg font-semibold text-white">85%</span></div>
            <div><span className="block text-[10px] font-bold tracking-[.12em] text-slate-500">共學提醒</span><span className="mt-1 block text-sm font-semibold text-white">閱讀可再加強</span></div>
          </div>
        </CosmicCommandDeck>
        {/* 成長摘要 */}
        <div className="glass-card p-6 mb-6 relative overflow-hidden">
          <img src={FAMILY_IMG} alt="" className="absolute bottom-0 left-0 right-0 h-2/3 w-full object-cover opacity-10" />
          <div className="relative">
            <h2 className="text-lg font-semibold mb-1">{child.name} 的成長摘要</h2>
            <p className="text-sm text-muted-foreground mb-5">近 30 天英文學習總覽</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg bg-black/50 p-4">
                <div className="text-3xl font-bold font-mono text-emerald-300">12</div>
                <div className="text-xs text-muted-foreground mt-1">連續學習天數</div>
              </div>
              <div className="rounded-lg bg-black/50 p-4">
                <div className="text-3xl font-bold font-mono text-emerald-300">35</div>
                <div className="text-xs text-muted-foreground mt-1">本週新單字</div>
              </div>
              <div className="rounded-lg bg-black/50 p-4">
                <div className="text-3xl font-bold font-mono text-emerald-300">85%</div>
                <div className="text-xs text-muted-foreground mt-1">最近測驗答對率</div>
              </div>
              <div className="rounded-lg bg-black/50 p-4">
                <div className="text-3xl font-bold font-mono text-emerald-300">A1+</div>
                <div className="text-xs text-muted-foreground mt-1">綜合等級 · CEFR</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="landscape" className="w-full">
          <TabsList className="w-full bg-white/5 mb-6 grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="landscape" className="tap-target">能力風景</TabsTrigger>
            <TabsTrigger value="colearning" className="tap-target">親子共學艙</TabsTrigger>
            <TabsTrigger value="gallery" className="tap-target">成長相簿</TabsTrigger>
            <TabsTrigger value="activity" className="tap-target">近期動態</TabsTrigger>
            <TabsTrigger value="cheer" className="tap-target">加油小棧</TabsTrigger>
          </TabsList>

          {/* 能力風景 */}
          <TabsContent value="landscape">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-5">能力風景</h3>
              <div className="space-y-5">
                {DIMS.map((dim) => (
                  <div key={dim.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm">{dim.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{dim.value}</span>
                        {dim.trend === "up" ? (
                          <ChevronUp className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-amber-400" />
                        )}
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                        style={{ width: `${dim.value}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                      <Heart className="w-3 h-3 text-emerald-400/70" />
                      {dim.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 親子共學艙 */}
          <TabsContent value="colearning">
            <div className="space-y-4">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  本週推薦共學資源
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="https://www.junyiacademy.org/topics/english-topic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target glass-card-hover p-4 group"
                  >
                    <div className="text-sm font-semibold mb-1">聽故事 · 親子共聽</div>
                    <div className="text-xs text-muted-foreground">以故事為主題的聽力活動,適合一起聽、一起聊。</div>
                    <div className="text-xs text-emerald-300 mt-2 inline-flex items-center gap-1">
                      前往學習 <ExternalLink className="w-3 h-3" />
                    </div>
                  </a>
                  <a
                    href="https://www.junyiacademy.org/topics/english-topic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target glass-card-hover p-4 group"
                  >
                    <div className="text-sm font-semibold mb-1">英文聽力專區</div>
                    <div className="text-xs text-muted-foreground">互動聽力影片與題目,從短句到篇章循序漸進。</div>
                    <div className="text-xs text-emerald-300 mt-2 inline-flex items-center gap-1">
                      前往學習 <ExternalLink className="w-3 h-3" />
                    </div>
                  </a>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  共同目標
                </h3>
                <div className="space-y-3">
                  <div className="rounded-lg border border-white/10 bg-white/3 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">每週一起完成 3 次聽力練習</span>
                      <span className="text-xs font-mono text-emerald-300">2/3</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[66%]" />
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/3 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">親子共讀 1 個英文故事</span>
                      <span className="text-xs font-mono text-emerald-300">1/1</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 成長相簿 */}
          <TabsContent value="gallery">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GALLERY.map((g, idx) => (
                <div key={idx} className="glass-card p-5 rotate-[-1deg] hover:rotate-0 transition-transform">
                  <div className="text-2xl mb-2">📸</div>
                  <div className="text-sm font-semibold">{g.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{g.desc}</div>
                  <div className="text-xs text-muted-foreground mt-3 font-mono">{g.date}</div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 近期動態 */}
          <TabsContent value="activity">
            <div className="glass-card p-6">
              <div className="space-y-4">
                {RECENT_ACTIVITY.map((a, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: a.color }} />
                    <div className="flex-1">
                      <div className="text-sm">{a.text}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">
                        {a.date} · {a.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 加油小棧 */}
          <TabsContent value="cheer">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                <Gift className="w-5 h-5 text-emerald-400" />
                加油小棧
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {ENCOURAGEMENTS.map((enc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedEnc(idx)}
                    className={`tap-target rounded-lg border p-3 text-xs text-left transition-all ${
                      selectedEnc === idx
                        ? "border-emerald-400/50 bg-emerald-500/10"
                        : "border-white/10 bg-white/3 hover:bg-white/6"
                    }`}
                    style={{ color: selectedEnc === idx ? enc.color : undefined }}
                  >
                    <MessageCircle className="w-4 h-4 mb-2" style={{ color: enc.color }} />
                    {enc.text}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={sendBuff} className="tap-target bg-emerald-500 text-emerald-950 hover:opacity-90" disabled={buffSent}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {buffSent ? "已發送加油能量 ✨" : "發送鼓勵 Buff"}
                </Button>
                <span className="text-xs text-muted-foreground">
                  每日最多發送 3 次,為孩子的學習加上臨時加成
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* 其他科目共學模擬區塊 */}
        <SubjectPlaceholder
          title="其他學科的親子共學艙"
          subtitle="選擇一門學科，和孩子一起完成可即時回饋的知識任務"
          items={[
            { icon: "languages", name: "國文", tagline: "親子共讀：成語與語境理解", href: "/practice/101" },
            { icon: "calculator", name: "數學", tagline: "生活數學：運算與規律小任務", href: "/practice/102" },
            { icon: "sprout", name: "自然", tagline: "觀察實驗：自然現象探索", href: "/practice/103" },
            { icon: "globe", name: "社會", tagline: "地圖探索：認識生活中的公共空間", href: "/practice/104" },
          ]}
        />
      </div>
    </div>
  );
}
