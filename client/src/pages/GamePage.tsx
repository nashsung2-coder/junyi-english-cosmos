import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Map,
  Swords,
  ExternalLink,
  Heart,
  MessageCircleHeart,
  ShoppingBag,
  Sparkles,
  Zap,
  Star,
  Coins,
  Trophy,
  TrendingUp,
  XOctagon,
  Loader2,
} from "lucide-react";
import { STARS, EXPEDITIONS, PET_SHOP, ADVENTURES, PLAYGO_URL } from "@/const";
import Navbar from "@/components/Navbar";
import PetArcade from "@/components/PetArcade";
import SubjectPlaceholder from "@/components/SubjectPlaceholder";
import { useLearningProgress } from "@/contexts/LearningProgressContext";

/**
 * GamePage - 遊戲模式(學習遊戲 × 娛樂遊戲)
 * 設計哲學:深空極簡主義
 * - 學習遊戲:六顆知識星球 + 知識遠征(累積「學習星幣」的唯一來源)
 * - 娛樂遊戲:純粹養寵物 —— 餵養、商店買裝備/食物、冒險戰鬥
 *   * 寵物戰鬥力由裝備構成;戰敗時引導回學習遊戲賺星幣變強(學習動機)
 *   * 「與寵物聊天」連結 PlayGO AI
 */

/** 用戶狀態(本地示範值) */
const INITIAL = {
  power: 45, // 裝備戰鬥力(初始 0,用戶購買裝備提升)
  ownedGears: [] as string[],
  ownedItems: [] as string[],
  adventureState: null as null | {
    id: number;
    name: string;
    color: string;
    reward: string;
    phase: "fighting" | "win" | "lose";
    powerNeeded: number;
  },
};

export default function GamePage() {
  const [mode, setMode] = useState<"learn" | "play">("learn");
  const [petTab, setPetTab] = useState("home");
  const [s, setS] = useState(INITIAL);
  const { state: learningState, spendStarCoins, missionCompleted, adjustPetStatus } = useLearningProgress();
  const englishPet = learningState.pets.english;

  const buy = (shop: (typeof PET_SHOP)[number]) => {
    if (learningState.starCoins < shop.price) {
      toast.error(`星幣不足!再去「學習遊戲」完成知識遠征賺星幣吧`, { duration: 4000 });
      return;
    }
    if (shop.type === "gear" && s.ownedGears.includes(shop.id)) {
      toast.info("已經擁有這件裝備了");
      return;
    }
    if (shop.type === "food") {
      const hungerGain = shop.id === "star-milk" ? 20 : 12;
      const happyGain = shop.id === "star-milk" ? 10 : 10;
      spendStarCoins(shop.price);
      adjustPetStatus("english", { hunger: hungerGain, happiness: happyGain });
      toast.success(`餵食成功！${shop.name} → 飽足度 +${hungerGain}、快樂度 +${happyGain}`);
    } else if (shop.type === "item") {
      spendStarCoins(shop.price);
      setS((p) => ({ ...p, ownedItems: [...p.ownedItems, shop.id] }));
      toast.success(`獲得 ${shop.name}!`);
    } else {
      const bonus = shop.id === "collar" ? 15 : shop.id === "cape" ? 30 : 50;
      spendStarCoins(shop.price);
      setS((p) => ({
        ...p,
        ownedGears: [...p.ownedGears, shop.id],
        power: p.power + bonus,
      }));
      toast.success(`裝備 ${shop.name}!戰鬥力 +${bonus}`);
    }
  };

  const usePotion = () => {
    if (!s.ownedItems.includes("potion")) {
      toast.error("背包裡沒有能量藥水,去商店買一瓶吧");
      return;
    }
    setS((p) => ({
      ...p,
      ownedItems: p.ownedItems.filter((id, i) => (i === p.ownedItems.indexOf("potion") ? false : true)),
    }));
    adjustPetStatus("english", { energy: 30, happiness: 8 });
    toast.success("使用能量藥水!狐狸貓活力滿滿");
  };

  const startAdventure = (adv: (typeof ADVENTURES)[number]) => {
    if (englishPet.happiness < 20 || englishPet.energy < 15) {
      toast.error("夥伴心情太低了,先餵食照顧牠吧!");
      return;
    }
    setS((p) => ({
      ...p,
      adventureState: { id: adv.id, name: adv.name, color: adv.color, reward: adv.reward, phase: "fighting", powerNeeded: adv.powerNeeded },
    }));
    // 模擬戰鬥
    setTimeout(() => {
      setS((p) => {
        if (!p.adventureState) return p;
        const won = p.power + Math.floor(englishPet.energy / 5) >= p.adventureState.powerNeeded;
        return {
          ...p,
          adventureState: { ...p.adventureState, phase: won ? "win" : "lose" },
        };
      });
    }, 2200);
  };

  const dismissAdventure = () => setS((p) => ({ ...p, adventureState: null }));

  const goToLearn = () => {
    dismissAdventure();
    setMode("learn");
    toast.info("去學習遊戲完成遠征,賺星幣強化夥伴!");
  };

  return (
    <div className="min-h-screen pt-[calc(68px+env(safe-area-inset-top))] bg-[radial-gradient(ellipse_62%_42%_at_74%_0%,rgba(245,158,11,0.14),transparent_68%),#061014] text-foreground">
      {/* 全站導覽列 */}
      <Navbar />
      {/* 頂部狀態列 */}
      <div className="sticky top-[calc(68px+env(safe-area-inset-top))] z-30 border-b border-amber-300/10 bg-[#0b1113]/88 backdrop-cosmic">
        <div className="container pt-5 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/hall" className="tap-target inline-flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground" aria-label="回到大廳">
              <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <div>
              <p className="mb-0.5 text-[10px] font-semibold tracking-[0.2em] text-amber-200/70">EXPEDITION DECK</p>
              <h1 className="text-2xl font-bold">星辰冒險</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-4 h-4 text-accent" />
              <span className="font-mono">Lv.12 冒險家</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300/90">
              <Coins className="w-4 h-4" />
              <span className="font-mono">{learningState.starCoins.toLocaleString()} 星幣</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* 學習遊戲 / 娛樂遊戲 雙模式切換 */}
        <div className="grid grid-cols-2 max-w-xl mx-auto mb-8 bg-white/5 rounded-xl p-1">
          <button
            onClick={() => setMode("learn")}
            className={`tap-target rounded-lg py-3 text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 ${
              mode === "learn"
                ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <TrendingUp className="w-4 h-4" /> 學習遊戲
          </button>
          <button
            onClick={() => setMode("play")}
            className={`tap-target rounded-lg py-3 text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 ${
              mode === "play"
                ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 shadow-[0_0_20px_rgba(255,209,102,0.15)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="w-4 h-4" /> 娛樂遊戲
          </button>
        </div>

        {/* ================= 學習遊戲 ================= */}
        {mode === "learn" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="glass-card mb-6 border-amber-300/25 bg-gradient-to-r from-amber-400/[0.07] to-transparent p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-amber-300/40 bg-amber-300/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-200" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-amber-100">學習遊戲 · 星幣的來源</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      完成知識遠征就能獲得「學習星幣」——去娛樂遊戲餵寵物、買裝備全靠它!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 六顆知識星球 */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                  <Map className="w-5 h-5 text-accent" /> 六顆知識星球
                </h2>
                <div className="relative mb-5 h-36 overflow-hidden rounded-2xl border border-cyan-200/15 bg-[radial-gradient(circle_at_18%_25%,rgba(78,205,196,.28),transparent_2px),radial-gradient(circle_at_72%_72%,rgba(167,139,250,.3),transparent_2px),radial-gradient(circle_at_43%_65%,rgba(255,209,102,.24),transparent_1px),linear-gradient(135deg,rgba(5,26,37,.95),rgba(8,12,28,.9))]">
                  <div className="absolute inset-x-6 top-1/2 h-px -rotate-6 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
                  {STARS.map((star, index) => (
                    <span
                      key={star.id}
                      className="absolute flex h-8 w-8 items-center justify-center rounded-full border text-xs text-white shadow-lg"
                      style={{
                        left: `${10 + index * 15}%`,
                        top: `${index % 2 === 0 ? 28 : 58}%`,
                        transform: "translate(-50%, -50%)",
                        borderColor: `${star.color}99`,
                        background: `${star.color}33`,
                        boxShadow: `0 0 18px ${star.color}99`,
                      }}
                    >
                      ✦
                    </span>
                  ))}
                  <div className="absolute bottom-3 left-4 text-[10px] font-semibold tracking-[.2em] text-cyan-100/75">JUNYI KNOWLEDGE MAP</div>
                </div>
                <div className="space-y-3">
                  {STARS.map((star) => (
                    <a
                      key={star.id}
                      href={star.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target block p-3 rounded-lg bg-white/4 border border-white/8 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, ${star.color}, ${star.color}88)`,
                              boxShadow: `0 0 12px ${star.color}55`,
                            }}
                          >
                            ✦
                          </div>
                          <div>
                            <span className="font-semibold text-sm">{star.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">{star.description}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs" style={{ color: star.color }}>
                          {star.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${star.progress}%`, background: star.color }} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* 知識遠征 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                  <Swords className="w-5 h-5 text-amber-400" /> 知識遠征
                </h2>
                <div className="space-y-4">
                  {EXPEDITIONS.map((exp) => (
                    <div key={exp.id} className="glass-card p-5 flex flex-col gap-4 hover:bg-white/5 transition-all">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400/30 shrink-0">
                          <Swords className="w-4 h-4 text-amber-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{exp.name}</h3>
                            <span
                              className={`badge-cosmic ${
                                exp.difficulty === "新手"
                                  ? "bg-emerald-500/15 text-emerald-300"
                                  : exp.difficulty === "簡單"
                                    ? "bg-blue-500/15 text-blue-300"
                                    : exp.difficulty === "中等"
                                      ? "bg-amber-500/15 text-amber-300"
                                      : "bg-red-500/15 text-red-300"
                              }`}
                            >
                              {exp.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                          <div className="text-xs text-muted-foreground mt-2 space-x-4">
                            <span className="font-mono">{exp.questions} 題</span>
                            <span className="font-mono">{exp.time}</span>
                            <span className="text-amber-300/80">{exp.reward}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <Link href={`/practice/${exp.id}`} className="tap-target btn-cosmic-primary inline-flex items-center justify-center gap-2 text-sm">
                          {missionCompleted(exp.id) ? "再次遠征" : "開始測驗"}
                          <Swords className="w-4 h-4" />
                        </Link>
                        <a href={exp.url} target="_blank" rel="noopener noreferrer" className="tap-target inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-white/30 hover:text-foreground">
                          均一延伸
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 娛樂遊戲 ================= */}
        {mode === "play" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* 戰鬥進行中浮層 */}
            {s.adventureState && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="glass-card p-8 max-w-md w-full text-center">
                  {s.adventureState.phase === "fighting" && (
                    <>
                      <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-amber-300" />
                      <h3 className="text-xl font-bold mb-1">{s.adventureState.name} 戰鬥中!</h3>
                      <p className="text-sm text-muted-foreground">夥伴全力出擊…</p>
                    </>
                  )}
                  {s.adventureState.phase === "win" && (
                    <>
                      <Trophy className="w-14 h-14 mx-auto mb-4 text-amber-300" />
                      <h3 className="text-xl font-bold mb-1">勝利!</h3>
                      <p className="text-sm text-muted-foreground mb-1">{s.adventureState.reward}</p>
                      <p className="text-xs text-accent/80 mb-5">夥伴的戰鬥力 + 親密度發揮了作用!</p>
                      <Button onClick={dismissAdventure} className="tap-target bg-accent text-accent-foreground">
                        太棒了!
                      </Button>
                    </>
                  )}
                  {s.adventureState.phase === "lose" && (
                    <>
                      <XOctagon className="w-14 h-14 mx-auto mb-4 text-red-300" />
                      <h3 className="text-xl font-bold mb-1">戰鬥失敗…</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        夥伴的戰鬥力({s.power + Math.floor(englishPet.energy / 5)})不足以征服
                        「{s.adventureState.name}」(需要 {s.adventureState.powerNeeded})
                      </p>
                      <div className="glass-card p-4 my-5 text-left border-accent/30 bg-accent/5">
                        <p className="text-sm text-accent font-semibold mb-1">
                          別灰心!這正是變強的機會
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          夥伴的戰鬥力來自你買的裝備,而買裝備需要「學習星幣」——到學習遊戲完成知識遠征,
                          賺星幣回來強化夥伴,下次一定能贏!
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button onClick={goToLearn} className="tap-target bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-semibold">
                          <TrendingUp className="w-4 h-4 mr-2" /> 去學習遊戲變強
                        </Button>
                        <Button variant="outline" onClick={dismissAdventure} className="tap-target border-white/20 text-muted-foreground">
                          先休息
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 寵物狀態總覽 */}
            <div className="glass-card p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,.5),transparent_5%),radial-gradient(circle_at_50%_45%,rgba(78,205,196,.48),transparent_52%),linear-gradient(145deg,#0d3141,#070d24)] shadow-[0_0_40px_rgba(78,205,196,.16)]">
                  <div className="absolute inset-3 rounded-full border border-dashed border-cyan-100/25" />
                  <span role="img" aria-label="狐狸貓夥伴" className="relative animate-float text-7xl drop-shadow-[0_0_18px_rgba(78,205,196,.6)]">🐱</span>
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                    {englishPet.happiness > 60 ? "💛" : englishPet.happiness > 30 ? "😐" : "🌧️"}
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h2 className="text-xl font-semibold">狐狸貓 · 星塵</h2>
                    <span className="badge-cosmic bg-amber-500/15 text-amber-300">Lv.8</span>
                    <span className="badge-cosmic bg-rose-500/15 text-rose-300 inline-flex items-center gap-1">
                      <Swords className="w-3 h-3" /> 戰鬥力 {s.power + Math.floor(englishPet.energy / 5)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    夥伴的力量來自你的裝備,夥伴的快樂來自你的照顧
                  </p>
                  <div className="space-y-3 mb-5">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">飽足度</span>
                        <span className="font-mono text-accent">{englishPet.hunger}/100</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500" style={{ width: `${englishPet.hunger}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">快樂度</span>
                        <span className="font-mono text-amber-300">{englishPet.happiness}/100</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500" style={{ width: `${englishPet.happiness}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">探索能量</span>
                        <span className="font-mono text-sky-300">{englishPet.energy}/100</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-500" style={{ width: `${englishPet.energy}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">戰鬥力（來自裝備）</span>
                        <span className="font-mono text-rose-300">{s.power}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-500" style={{ width: `${Math.min(100, s.power)}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={PLAYGO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target btn-cosmic-primary inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90"
                    >
                      <MessageCircleHeart className="w-4 h-4" /> 與寵物聊天(PlayGO)
                    </a>
                    <button
                      onClick={() =>
                        adjustPetStatus("english", { happiness: 5 })
                      }
                      className="tap-target rounded-lg px-4 py-2 text-sm border border-pink-400/40 text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 transition-colors inline-flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" /> 撫摸夥伴
                    </button>
                    {s.ownedItems.includes("potion") && (
                      <button
                        onClick={usePotion}
                        className="tap-target rounded-lg px-4 py-2 text-sm border border-cyan-400/40 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors inline-flex items-center gap-2"
                      >
                        🧪 使用能量藥水
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <PetArcade />

            <Tabs value={petTab} onValueChange={setPetTab}>
              <TabsList className="w-full bg-white/5 mb-6 grid grid-cols-2">
                <TabsTrigger value="adventure" className="tap-target inline-flex items-center gap-2">
                  <Swords className="w-4 h-4" /> 夥伴冒險
                </TabsTrigger>
                <TabsTrigger value="shop" className="tap-target inline-flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> 星幣商店
                </TabsTrigger>
              </TabsList>

              {/* 夥伴冒險 */}
              <TabsContent value="adventure">
                <div className="glass-card p-5 mb-4 border-accent/20 bg-accent/3">
                  <p className="text-sm text-muted-foreground">
                    派出夥伴去冒險吧!冒險需要足夠的<strong className="text-rose-300">戰鬥力</strong>(來自裝備)。
                    戰力不足被打下場也沒關係——那正是你去學習遊戲賺星幣、變強的理由!
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ADVENTURES.map((adv) => (
                    <div key={adv.id} className="glass-card p-5 flex flex-col hover:border-opacity-40 transition-all" style={{ borderColor: `${adv.color}40` }}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{adv.name}</h3>
                        <span className="badge-cosmic bg-rose-500/15 text-rose-300">需要戰力 {adv.powerNeeded}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{adv.description}</p>
                      <div className="text-xs text-muted-foreground mb-4 space-y-1">
                        <div className="font-mono">⏱ {adv.duration}</div>
                        <div className="font-mono text-amber-300/80">🏆 {adv.reward}</div>
                      </div>
                      <div className="mt-auto">
                        <button
                          onClick={() => startAdventure(adv)}
                          className="tap-target btn-cosmic-primary w-full inline-flex items-center justify-center gap-2 text-sm"
                          style={{ background: `linear-gradient(135deg, ${adv.color}CC, ${adv.color}88)` }}
                        >
                          <Swords className="w-4 h-4" /> 派出夥伴
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {s.ownedGears.length === 0 && (
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    💡 小提示:夥伴目前沒有任何裝備(戰鬥力 {s.power}),去「星幣商店」買第一件裝備,或先去學習遊戲賺星幣!
                  </p>
                )}
              </TabsContent>

              {/* 星幣商店 */}
              <TabsContent value="shop">
                <div className="glass-card p-5 mb-4 border-amber-400/20 bg-amber-500/3">
                  <div className="flex items-center gap-3">
                    <Coins className="w-6 h-6 text-amber-300" />
                    <div>
                      <h3 className="font-semibold text-amber-200">學習星幣:唯一的購物貨幣</h3>
                      <p className="text-xs text-muted-foreground">
                        星幣主要來自「學習遊戲」的知識遠征；完成追星軌道等娛樂挑戰也能獲得小額獎勵。餵食、買裝備、買生活用品都用它——所以，每一段學習與陪伴都能讓夥伴更強大。
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-mono text-amber-300">目前持有:{learningState.starCoins.toLocaleString()} 星幣</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PET_SHOP.map((item) => {
                    const owned = item.type === "gear" && s.ownedGears.includes(item.id);
                    const affordable = learningState.starCoins >= item.price;
                    return (
                      <div key={item.id} className="glass-card p-5 flex flex-col hover:bg-white/5 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-3xl">{item.icon}</span>
                          <span
                            className={`badge-cosmic text-xs ${
                              item.type === "food"
                                ? "bg-pink-500/15 text-pink-300"
                                : item.type === "gear"
                                  ? "bg-rose-500/15 text-rose-300"
                                  : "bg-cyan-500/15 text-cyan-300"
                            }`}
                          >
                            {item.type === "food" ? "食物" : item.type === "gear" ? "裝備" : "道具"}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mb-4 flex-1">{item.description}</p>
                        <button
                          onClick={() => buy(item)}
                          disabled={owned}
                          className={`tap-target rounded-lg px-4 py-2 text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 ${
                            owned
                              ? "bg-white/8 text-muted-foreground cursor-not-allowed"
                              : affordable
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:opacity-90"
                                : "border border-amber-400/30 text-amber-300/70 hover:bg-amber-500/10"
                          }`}
                        >
                          {owned ? "已擁有" : (
                            <>
                              <Coins className="w-4 h-4" /> {item.price} 星幣
                            </>
                          )}
                        </button>
                        {!affordable && !owned && (
                          <span className="text-xs text-rose-300/70 mt-2 text-center">星幣不足,去學習遊戲賺星幣!</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* 其他科目遊戲模擬區塊 */}
        <SubjectPlaceholder
          title="其他學科的遊戲航線"
          subtitle="選擇一條航線，立即開始可作答的跨學科知識遠征"
          items={[
            { icon: "languages", name: "國文", tagline: "成語星橋：語境與修辭挑戰", href: "/practice/101" },
            { icon: "calculator", name: "數學", tagline: "數字迷宮：運算與規律推理", href: "/practice/102" },
            { icon: "sprout", name: "自然", tagline: "元素觀測站：自然現象探索", href: "/practice/103" },
            { icon: "globe", name: "社會", tagline: "島嶼座標：地圖與生活理解", href: "/practice/104" },
          ]}
        />
      </div>
    </div>
  );
}
