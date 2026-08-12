import Navbar from "@/components/Navbar";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Camera, CheckCircle2, Coins, Heart, Sparkles, Target, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import {
  GROWTH_CURVE,
  JOURNEY_START,
  MONTHLY_RECORDS,
  PET_PHOTOS,
  PET_WHISPERS,
} from "@/lib/journeyData";
import { useLearningProgress } from "@/contexts/LearningProgressContext";
import CosmicCommandDeck from "@/components/CosmicCommandDeck";

/**
 * JourneyPage - 歲月陪伴
 * 每月紀錄、成長曲線、寵物合照相框、寵物心聲
 * 設計哲學:深空極簡主義
 */
export default function JourneyPage() {
  const { state, accuracy, level } = useLearningProgress();
  const liveCurve = [
    ...GROWTH_CURVE,
    {
      month: "本週",
      vocab: GROWTH_CURVE[GROWTH_CURVE.length - 1].vocab + state.dimensionPoints.vocabulary * 3,
      stars: state.starCoins,
    },
  ];
  const completedCount = state.completedMissionIds.length;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 overflow-auto pt-[60px]">
        <div className="container max-w-5xl mx-auto px-4 pt-5 pb-10">
          <CosmicCommandDeck
            eyebrow="COMPANIONSHIP LOG"
            title="歲月陪伴"
            description="讓每一場遠征化成看得見的成長軌跡；狐狸貓星塵會在你的學習星圖裡，一路記得每個努力的瞬間。"
            icon={Heart}
            accent="#4ECDC4"
            action={<Link href="/game" className="tap-target inline-flex items-center rounded-xl border border-accent/35 bg-accent/[0.08] px-3.5 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent/[0.15]">繼續遠征 →</Link>}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div><span className="mr-2 text-xs text-slate-400">啟程時間</span><span className="font-mono font-semibold text-white">{JOURNEY_START.year} 年 {JOURNEY_START.month} 月</span></div>
              <div className="flex items-center gap-2 text-accent"><Heart className="h-3.5 w-3.5 fill-accent" /><span>已與狐狸貓「星塵」相伴 {MONTHLY_RECORDS.length} 個月</span></div>
            </div>
          </CosmicCommandDeck>

          <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.055] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> 已完成遠征</div>
              <div className="mt-2 font-mono text-2xl font-bold text-accent">{completedCount}<span className="ml-1 text-sm font-normal text-muted-foreground">條</span></div>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-400/[0.045] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Coins className="h-3.5 w-3.5 text-amber-200" /> 可用學習星幣</div>
              <div className="mt-2 font-mono text-2xl font-bold text-amber-200">{state.starCoins}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Target className="h-3.5 w-3.5 text-sky-300" /> 累計作答正確率</div>
              <div className="mt-2 font-mono text-2xl font-bold">{accuracy}<span className="text-sm font-normal text-muted-foreground">%</span></div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Sparkles className="h-3.5 w-3.5 text-violet-300" /> 目前冒險等級</div>
              <div className="mt-2 font-mono text-2xl font-bold">Lv.{level}</div>
            </div>
          </section>

          {/* 成長曲線 */}
          <div className="glass-card p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h2 className="text-lg font-semibold">每月成長曲線</h2>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={liveCurve} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="vocabGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ECDC4" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#4ECDC4" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="starsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD166" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#FFD166" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "rgba(10,15,25,0.9)", border: "1px solid rgba(78,205,196,0.3)", borderRadius: 8 }}
                  />
                  <Area type="monotone" dataKey="vocab" name="累計單字量" stroke="#4ECDC4" fill="url(#vocabGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="stars" name="每月星幣" stroke="#FFD166" fill="url(#starsGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">「本週」會隨你完成知識遠征更新；星幣可直接帶往狐狸貓商店使用。</p>
          </div>

          {/* 每月紀錄 + 合照相框 + 寵物心聲 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MONTHLY_RECORDS.map((r, idx) => (
              <div key={r.month} className="glass-card p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent">{r.month}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-white/15 text-muted-foreground">
                    Lv.{r.level}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div>+{r.starsGained} 星幣 · {r.lessons} 節課 · 累計 {r.vocab} 字</div>
                </div>
                <div className="border border-dashed border-white/20 rounded-lg aspect-[4/3] flex flex-col items-center justify-center text-muted-foreground/60 gap-1">
                  <Camera className="w-5 h-5" />
                  <span className="text-xs">{PET_PHOTOS[idx]?.frameCaption}</span>
                </div>
                {PET_WHISPERS[idx] && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 relative">
                    <Sparkles className="w-3 h-3 text-accent absolute -top-1.5 left-3" />
                    <p className="text-xs leading-relaxed">{PET_WHISPERS[idx].text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
