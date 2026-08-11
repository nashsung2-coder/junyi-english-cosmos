import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, BarChart3, BookOpenCheck, Coins, Gamepad2, Heart, MessageCircle, ShoppingBag, Sparkles, Users } from "lucide-react";
import { PORTALS } from "@/const";
import Navbar from "@/components/Navbar";
import { useLearningProgress } from "@/contexts/LearningProgressContext";
import { PRACTICE_MISSIONS } from "@/lib/practiceData";
import { PET_SHOP_ITEMS, PET_ACTIONS } from "@/lib/petShop";
import { SUBJECTS, type SubjectId } from "@/lib/subjectUniverse";

/**
 * HallPage - 星辰啟航 (大廳)
 * 設計哲學:深空極簡主義
 * - Hero 區:星雲背景與浮動標題
 * - 四大入口卡片:專攻區、遊戲模式、家長區、教師區
 * - 玻璃擬態卡片 + Canvas 粒子背景
 */

const HERO_BG = "/assets/junyi-hero-nebula.png";
const LOGO = "/assets/junyi-logo.png";

export default function HallPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>("english");
  const [petMessage, setPetMessage] = useState("星塵正和新朋友分享今天發現的單字。");
  const { state, level, buyPetItem, usePetItem, interactWithPet } = useLearningProgress();
  const selectedPet = SUBJECTS.find((subject) => subject.id === selectedSubject)!;
  const selectedPetStatus = state.pets[selectedSubject];

  const handlePetAction = (actionId: (typeof PET_ACTIONS)[number]["id"]) => {
    setPetMessage(interactWithPet(selectedSubject, actionId));
  };

  const handleBuyItem = (item: (typeof PET_SHOP_ITEMS)[number]) => {
    if (buyPetItem(item)) setPetMessage(`已將 ${item.emoji} ${item.name} 放進補給背包，${selectedPet.pet.name} 好期待！`);
    else setPetMessage("星幣還不夠，完成一條學習任務就能再補充。\n");
  };

  const handleUseItem = (item: (typeof PET_SHOP_ITEMS)[number]) => {
    if (usePetItem(selectedSubject, item)) setPetMessage(`${selectedPet.pet.name} 使用了${item.name}，狀態變得更好了！`);
    else setPetMessage(`背包裡還沒有 ${item.name}，先到補給站兌換吧。`);
  };

  const iconMap = {
    BarChart3: BarChart3,
    Gamepad2: Gamepad2,
    Users: Users,
    BookOpenCheck: BookOpenCheck,
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />

      {/* 導覽列 */}
      <Navbar />

      {/* Hero 區 */}
      <section
        className="relative pt-32 pb-16 px-4"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(11,15,30,0.75), rgba(11,15,30,0.35)), url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-75" aria-hidden="true">
          <svg className="h-full w-full" viewBox="0 0 1200 560" preserveAspectRatio="none" fill="none">
            <path d="M-30 408C164 264 265 447 441 332S752 137 914 262s189 100 332-70" stroke="rgba(78,205,196,.22)" strokeWidth="1.15" strokeDasharray="4 14" />
            <path d="M-10 236c166-70 241 64 393 28 168-39 255-174 416-87 168 90 271 6 430-70" stroke="rgba(255,209,102,.16)" strokeWidth="1" strokeDasharray="2 18" />
            <path d="M134 72c111 86 195 44 274 120 62 60 93 163 220 194" stroke="rgba(96,165,250,.16)" strokeWidth="1" />
            <circle cx="209" cy="318" r="4" fill="#4ECDC4" fillOpacity=".68" />
            <circle cx="441" cy="332" r="3" fill="#FFD166" fillOpacity=".75" />
            <circle cx="691" cy="183" r="4" fill="#4ECDC4" fillOpacity=".55" />
            <circle cx="914" cy="262" r="3" fill="#FFD166" fillOpacity=".65" />
            <circle cx="1071" cy="166" r="3" fill="#4ECDC4" fillOpacity=".6" />
          </svg>
        </div>
        <div className="container max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-black mb-4 animate-float leading-tight">
            <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-amber-300 bg-clip-text text-transparent">
              你的學習宇宙
            </span>
            <br />
            <span className="text-white">由你探索</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            在均一星辰宇宙中，每一次學習都是一次探索。跨越語文、數學、科學與創作，用數據記錄成長、用夥伴陪你前進。
          </p>
          <div className="mx-auto grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.14] bg-slate-950/35 text-left backdrop-blur-sm">
            <div className="border-r border-white/[0.10] px-4 py-3 md:px-5"><span className="block text-[10px] font-bold tracking-[.12em] text-slate-400">完成遠征</span><span className="mt-1 block font-mono text-xl font-bold text-teal-200">{state.completedMissionIds.length}</span></div>
            <div className="border-r border-white/[0.10] px-4 py-3 md:px-5"><span className="block text-[10px] font-bold tracking-[.12em] text-slate-400">作答題數</span><span className="mt-1 block font-mono text-xl font-bold text-white">{state.totalQuestions}</span></div>
            <div className="px-4 py-3 md:px-5"><span className="block text-[10px] font-bold tracking-[.12em] text-slate-400">冒險等級</span><span className="mt-1 block font-mono text-xl font-bold text-amber-200">Lv.{level}</span></div>
          </div>
          <div className="mt-5 flex justify-center gap-4">
            <Link href="/practice/letter-jungle" className="inline-flex items-center rounded-xl border border-teal-300/35 bg-teal-300/[0.10] px-4 py-2 text-sm font-medium text-teal-100 transition-colors hover:bg-teal-300/[0.18]">開始今日學習 →</Link>
            <a href="#portals" className="inline-flex items-center text-sm text-slate-300 transition-colors hover:text-white">探索星圖<ArrowDown className="ml-1.5 h-4 w-4" /></a>
          </div>
        </div>
      </section>

      {/* 入口卡片 */}
      <section id="portals" className="py-16 px-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PORTALS.map((portal) => {
              const Icon = iconMap[portal.icon as keyof typeof iconMap];
              const isHovered = hoveredCard === portal.id;

              return (
                <Link key={portal.id} href={portal.href}>
                  <div
                    className={`glass-card-hover group relative overflow-hidden h-full cursor-pointer ${
                      hoveredCard !== null && !isHovered ? "opacity-40" : "opacity-100"
                    } transition-opacity duration-300`}
                    onMouseEnter={() => setHoveredCard(portal.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${portal.glowColor}, transparent)`,
                      }}
                    />

                    <div className="relative p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {portal.name}
                            </h3>
                            <p className="text-sm text-accent">{portal.subtitle}</p>
                          </div>
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${portal.color} text-white shadow-lg`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {portal.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {portal.stats.map((stat, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground font-mono">
                            {stat}
                          </div>
                        ))}
                        <Button
                          className="w-full mt-3 bg-accent text-accent-foreground hover:opacity-90"
                          size="sm"
                        >
                          進入
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="container max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold tracking-[.18em] text-teal-200">SUBJECT STAR MAP</p><h2 className="mt-2 text-2xl font-bold text-white">七條學習航線，七位成長夥伴</h2><p className="mt-2 text-sm text-slate-400">每個領域都有一條可實際作答的起始任務，完成後即可餵養專屬夥伴。</p></div>
            <div className="rounded-full border border-amber-300/20 bg-amber-400/5 px-3 py-1.5 text-xs text-amber-200"><Coins className="mr-1.5 inline h-3.5 w-3.5" />共用星幣 {state.starCoins}</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SUBJECTS.map((subject) => {
              const mission = PRACTICE_MISSIONS.find((candidate) => candidate.subject === subject.id)!;
              const progress = state.subjectProgress[subject.id];
              const isSelected = subject.id === selectedSubject;
              return <article key={subject.id} className={`rounded-2xl border p-4 transition-all ${isSelected ? "border-white/30 bg-white/[0.07]" : "border-white/10 bg-white/[0.025] hover:border-white/20"}`}>
                <button type="button" onClick={() => { setSelectedSubject(subject.id); setPetMessage(subject.pet.greeting); }} className="w-full text-left">
                  <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-white">{subject.pet.emoji} {subject.name} · {subject.pet.name}</p><p className="mt-1 text-xs leading-5 text-slate-400">{subject.tagline}</p></div><span className="h-2.5 w-2.5 rounded-full shadow-[0_0_16px_currentColor]" style={{ background: subject.color, color: subject.color }} /></div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400"><span>已完成 {progress.missions} 次</span><span style={{ color: subject.color }}>{progress.questions ? `${Math.round((progress.correct / progress.questions) * 100)}%` : "等待啟程"}</span></div>
                </button>
                <Link href={`/practice/${mission.id}`} className="mt-4 flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/[0.09]">試玩 {mission.name} →</Link>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="container max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#11182d]/75 p-5 md:p-7">
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-dashed border-white/15" />
              <p className="relative text-xs font-bold tracking-[.18em] text-teal-200">COMPANION COMMONS</p>
              <div className="relative mt-3 flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-2xl font-bold text-white">夥伴廣場</h2><p className="mt-2 text-sm leading-6 text-slate-400">選擇一位學科夥伴，和牠聊天、玩耍或使用背包中的生活用品。</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-right"><div className="text-2xl">{selectedPet.pet.emoji}</div><div className="mt-1 text-xs font-semibold" style={{ color: selectedPet.color }}>{selectedPet.pet.name} · Lv.{selectedPetStatus.level}</div></div></div>
              <div className="relative mt-5 rounded-2xl border border-white/10 bg-black/15 p-4"><div className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: selectedPet.color }} /><p className="text-sm leading-6 text-slate-200">「{petMessage}」</p></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">{([ ["飽足", selectedPetStatus.hunger], ["心情", selectedPetStatus.happiness], ["活力", selectedPetStatus.energy] ] as const).map(([label, value]) => <div key={label}><span className="text-slate-500">{label}</span><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${value}%`, background: selectedPet.color }} /></div><span className="mt-1 block font-mono text-slate-300">{value}</span></div>)}</div></div>
              <div className="relative mt-4 flex flex-wrap gap-2">{PET_ACTIONS.map((action) => <Button key={action.id} size="sm" variant="outline" onClick={() => handlePetAction(action.id)} className="border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.09]">{action.emoji} {action.label}</Button>)}</div>
            </article>
            <article className="rounded-3xl border border-white/10 bg-gradient-to-b from-amber-400/[0.08] to-white/[0.02] p-5 md:p-6"><p className="text-xs font-bold tracking-[.18em] text-amber-200">STAR SUPPLY DEPOT</p><h2 className="mt-2 text-xl font-bold text-white">夥伴補給站</h2><p className="mt-2 text-sm leading-6 text-slate-400">用學習星幣換取飼料、玩具與生活用品；購買後可立刻給目前選擇的夥伴使用。</p><div className="mt-4 space-y-2">{PET_SHOP_ITEMS.map((item) => { const count = state.inventory[item.id] ?? 0; return <div key={item.id} className="rounded-xl border border-white/10 bg-black/10 p-3"><div className="flex items-center justify-between gap-2"><div className="min-w-0"><p className="text-sm font-semibold text-white">{item.emoji} {item.name} <span className="text-xs font-normal text-slate-500">×{count}</span></p><p className="mt-0.5 text-[11px] text-slate-400">{item.description}</p></div><span className="shrink-0 text-xs text-amber-200">{item.cost} 幣</span></div><div className="mt-2 flex gap-2"><Button size="sm" onClick={() => handleBuyItem(item)} className="h-7 flex-1 bg-amber-300 text-[11px] text-slate-950 hover:bg-amber-200"><ShoppingBag className="mr-1 h-3 w-3" />兌換</Button><Button size="sm" disabled={count < 1} onClick={() => handleUseItem(item)} variant="outline" className="h-7 flex-1 border-white/15 text-[11px] text-white hover:bg-white/[0.08]"><Heart className="mr-1 h-3 w-3" />使用</Button></div></div>; })}</div></article>
          </div>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="border-t border-white/8 py-8 px-4 mt-8">
        <div className="container flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <div>© 2024 均一教育平台 Junyi Academy</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://www.junyiacademy.org/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              均一官網
            </a>
            <a href="https://www.junyiacademy.org/topics/junyi-english" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              英文專區
            </a>
            <a href="https://www.junyiacademy.org/topics/junyi-teacher-resources" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              教師資源
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * ParticleBackground - Canvas 粒子系統
 * 營造星辰氛圍
 */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ["rgba(78, 205, 196,", "rgba(240, 196, 90,", "rgba(232, 236, 241,"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(11, 15, 30, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.fillStyle = `${particle.color} ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, background: "linear-gradient(180deg, #0B0F1E 0%, #0A0C14 100%)" }}
    />
  );
}
