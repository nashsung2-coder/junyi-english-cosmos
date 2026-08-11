import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, BarChart3, BookOpenCheck, Gamepad2, Users } from "lucide-react";
import { PORTALS } from "@/const";
import Navbar from "@/components/Navbar";
import SubjectPlaceholder from "@/components/SubjectPlaceholder";
import { useLearningProgress } from "@/contexts/LearningProgressContext";

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
  const { state, level } = useLearningProgress();

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
              你的英文宇宙
            </span>
            <br />
            <span className="text-white">由你探索</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            在均一星辰宇宙中，每一次學習都是一次探索。用數據驅動成長、用遊戲激發熱情、用陪伴溫暖學習旅程。
          </p>
          <div className="mx-auto grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.14] bg-slate-950/35 text-left backdrop-blur-sm">
            <div className="border-r border-white/[0.10] px-4 py-3 md:px-5"><span className="block text-[10px] font-bold tracking-[.12em] text-slate-400">完成遠征</span><span className="mt-1 block font-mono text-xl font-bold text-teal-200">{state.completedMissionIds.length}</span></div>
            <div className="border-r border-white/[0.10] px-4 py-3 md:px-5"><span className="block text-[10px] font-bold tracking-[.12em] text-slate-400">作答題數</span><span className="mt-1 block font-mono text-xl font-bold text-white">{state.totalQuestions}</span></div>
            <div className="px-4 py-3 md:px-5"><span className="block text-[10px] font-bold tracking-[.12em] text-slate-400">冒險等級</span><span className="mt-1 block font-mono text-xl font-bold text-amber-200">Lv.{level}</span></div>
          </div>
          <div className="mt-5 flex justify-center gap-4">
            <Link href="/practice/letter-jungle" className="inline-flex items-center rounded-xl border border-teal-300/35 bg-teal-300/[0.10] px-4 py-2 text-sm font-medium text-teal-100 transition-colors hover:bg-teal-300/[0.18]">開始今日遠征 →</Link>
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

      {/* 其他科目模擬區塊 */}
      <section className="px-4 pb-8">
        <div className="container">
          <SubjectPlaceholder
            title="更多學科的星辰航線"
            subtitle="除英文以外,各科目入口正在規劃中"
            items={[
              { icon: "languages", name: "國文", tagline: "古文與現代文的修辭星軌" },
              { icon: "calculator", name: "數學", tagline: "數字與邏輯的幾何星雲" },
              { icon: "sprout", name: "自然", tagline: "生命與科學的探索星圖" },
              { icon: "globe", name: "社會", tagline: "歷史與地理的文明星座" },
              { icon: "palette", name: "藝術", tagline: "色彩與創意的星光畫廊" },
              { icon: "heartPulse", name: "健康", tagline: "體能與身心的活力軌道" },
            ]}
          />
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
