/**
 * Navbar - 均一星辰宇宙全站導覽
 * 設計原則：核心任務在主列，次要入口與學科探索收納於可操作面板。
 */
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import {
  BarChart3,
  BookOpenCheck,
  Bot,
  ChevronDown,
  Compass,
  Gamepad2,
  Home,
  Menu,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";

const LOGO = "/assets/junyi-logo.png";

const LEARN_LINKS = [
  { name: "專攻區", description: "能力地圖與推薦資源", href: "/specialty", icon: BarChart3 },
  { name: "能力管家", description: "看見下一步的成長方向", href: "/butler", icon: Bot },
] as const;

const SUPPORT_LINKS = [
  { name: "家長區", description: "陪伴與共學洞察", href: "/parent", icon: Users },
  { name: "教師區", description: "教學資源與班級觀察", href: "/teacher", icon: BookOpenCheck },
] as const;

const SUBJECTS = [
  { name: "國文", href: "/practice/101" },
  { name: "英文", href: "/practice/1" },
  { name: "數學", href: "/practice/102" },
  { name: "自然", href: "/practice/103" },
  { name: "社會", href: "/practice/104" },
  { name: "藝術", href: "/practice/105" },
  { name: "健康", href: "/practice/106" },
] as const;

type OpenPanel = "learn" | "support" | "subjects" | null;

function isLinkActive(location: string, href: string) {
  return href === "/" ? location === "/" : location.startsWith(href);
}

export default function Navbar() {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  const closeMenus = () => {
    setOpenPanel(null);
    setMobileOpen(false);
  };

  const handleSubject = (subject: (typeof SUBJECTS)[number]) => {
    setOpenPanel(null);
    setMobileOpen(false);
    navigate(subject.href);
    toast.success(`${subject.name}學習航線已開啟`, { description: "完成任務後會立即回饋作答結果，並累積你的學習進度。" });
  };

  const panelButtonClass = (active: boolean) =>
    `inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
      active
        ? "bg-accent/13 text-accent shadow-[inset_0_0_0_1px_rgba(78,205,196,.22)]"
        : "text-slate-300 hover:bg-white/[0.055] hover:text-white"
    }`;

  const PanelLink = ({
    name,
    description,
    href,
    Icon,
  }: {
    name: string;
    description: string;
    href: string;
    Icon: typeof BarChart3;
  }) => (
    <Link
      href={href}
      onClick={closeMenus}
      className="group flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/[0.06]"
    >
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition-transform duration-200 group-hover:scale-105">
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-slate-100">{name}</span>
        <span className="mt-0.5 block text-xs leading-5 text-slate-400">{description}</span>
      </span>
    </Link>
  );

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#070a17]/85 backdrop-cosmic">
      <div className="container flex h-[68px] items-center gap-3">
        <Link href="/" onClick={closeMenus} className="flex shrink-0 items-center gap-2.5" aria-label="回到均一星辰宇宙大廳">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/[0.11] ring-1 ring-accent/20">
            <img src={LOGO} alt="" className="h-6 w-6" />
          </span>
          <span className="hidden text-[15px] font-bold tracking-wide text-white sm:inline">均一星辰宇宙</span>
        </Link>

        <div className="relative ml-auto hidden items-center gap-1 xl:flex">
          <Link href="/" onClick={closeMenus} className={panelButtonClass(location === "/")}>
            <Home className="h-4 w-4" />
            大廳
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "learn" ? null : "learn")}
              aria-expanded={openPanel === "learn"}
              className={panelButtonClass(LEARN_LINKS.some((link) => isLinkActive(location, link.href)))}
            >
              學習中心
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openPanel === "learn" ? "rotate-180" : ""}`} />
            </button>
            {openPanel === "learn" && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-72 rounded-2xl border border-white/[0.10] bg-[#101626]/95 p-2 shadow-[0_20px_55px_rgba(0,0,0,.38)] backdrop-blur-xl">
                <p className="px-3 pb-2 pt-1 text-[10px] font-bold tracking-[0.16em] text-slate-500">LEARNING HUB</p>
                {LEARN_LINKS.map((link) => <PanelLink key={link.href} {...link} Icon={link.icon} />)}
              </div>
            )}
          </div>

          <Link href="/game" onClick={closeMenus} className={panelButtonClass(isLinkActive(location, "/game"))}>
            <Gamepad2 className="h-4 w-4" />
            星際冒險
          </Link>

          <Link href="/journey" onClick={closeMenus} className={panelButtonClass(isLinkActive(location, "/journey"))}>
            <Sparkles className="h-4 w-4" />
            我的成長
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "support" ? null : "support")}
              aria-expanded={openPanel === "support"}
              className={panelButtonClass(SUPPORT_LINKS.some((link) => isLinkActive(location, link.href)))}
            >
              支援
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openPanel === "support" ? "rotate-180" : ""}`} />
            </button>
            {openPanel === "support" && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-72 rounded-2xl border border-white/[0.10] bg-[#101626]/95 p-2 shadow-[0_20px_55px_rgba(0,0,0,.38)] backdrop-blur-xl">
                <p className="px-3 pb-2 pt-1 text-[10px] font-bold tracking-[0.16em] text-slate-500">SUPPORT HUB</p>
                {SUPPORT_LINKS.map((link) => <PanelLink key={link.href} {...link} Icon={link.icon} />)}
              </div>
            )}
          </div>
        </div>

        <div className="relative hidden xl:block">
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === "subjects" ? null : "subjects")}
            aria-expanded={openPanel === "subjects"}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.10] px-3 text-sm font-medium text-slate-300 transition-colors hover:border-accent/35 hover:bg-white/[0.055] hover:text-white active:scale-[0.97]"
          >
            <Compass className="h-4 w-4 text-accent" />
            學科探索
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openPanel === "subjects" ? "rotate-180" : ""}`} />
          </button>
          {openPanel === "subjects" && (
            <div className="absolute right-0 top-[calc(100%+12px)] w-[360px] rounded-2xl border border-white/[0.10] bg-[#101626]/95 p-3 shadow-[0_20px_55px_rgba(0,0,0,.38)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-sm font-semibold text-white">探索學科星圖</p>
                  <p className="mt-1 text-xs text-slate-400">七科互動航線均已開放，選擇一門學科立即開始作答。</p>
                </div>
                <span className="rounded-full bg-accent/10 px-2 py-1 text-[10px] font-semibold text-accent">7 科目</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {SUBJECTS.map((subject) => (
                  <button
                    type="button"
                    key={subject.name}
                    onClick={() => handleSubject(subject)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                      subject.name === "英文"
                        ? "border-accent/25 bg-accent/[0.08] text-accent hover:bg-accent/[0.14]"
                        : "border-white/[0.07] bg-white/[0.025] text-slate-300 hover:border-white/[0.16] hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="block font-medium">{subject.name}</span>
                    <span className="mt-0.5 block text-[10px] opacity-65">開始任務</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => toast.success("星際帳號已登入", { description: "星辰小騎士的學習進度將持續累積。" })}
          className="hidden h-10 shrink-0 items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3 text-xs font-medium text-accent transition-colors hover:bg-accent/[0.14] sm:inline-flex"
          aria-label="已登入，星辰小騎士"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span>已登入</span>
          <span className="hidden 2xl:inline">· 星辰小騎士</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setOpenPanel(null);
          }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white xl:hidden"
          aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.08] bg-[#0a0f1f]/98 px-4 pb-5 pt-4 shadow-[0_20px_50px_rgba(0,0,0,.35)] xl:hidden">
          <div className="container space-y-5 px-0">
            <section>
              <p className="mb-2 text-[10px] font-bold tracking-[0.16em] text-slate-500">主要航線</p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/" onClick={closeMenus} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-sm text-slate-200">大廳</Link>
                <Link href="/specialty" onClick={closeMenus} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-sm text-slate-200">專攻區</Link>
                <Link href="/game" onClick={closeMenus} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-sm text-slate-200">星際冒險</Link>
                <Link href="/journey" onClick={closeMenus} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-sm text-slate-200">我的成長</Link>
                <Link href="/butler" onClick={closeMenus} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-sm text-slate-200">能力管家</Link>
                <button type="button" onClick={() => toast("家長與教師支援", { description: "可從下方支援入口進入。" })} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-left text-sm text-slate-200">支援入口</button>
              </div>
            </section>

            <section className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-200">學科探索</p>
                <Compass className="h-4 w-4 text-accent" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUBJECTS.map((subject) => (
                  <button key={subject.name} type="button" onClick={() => handleSubject(subject)} className="rounded-full border border-white/[0.09] px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-accent/35 hover:bg-accent/[0.08] hover:text-accent">
                    {subject.name}
                  </button>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-2">
              {SUPPORT_LINKS.map(({ name, href }) => <Link key={href} href={href} onClick={closeMenus} className="rounded-xl px-3 py-2 text-center text-sm text-slate-400 hover:bg-white/[0.06] hover:text-slate-100">{name}</Link>)}
            </div>
            <button type="button" onClick={() => toast.success("星際帳號已登入", { description: "星辰小騎士的學習進度將持續累積。" })} className="flex w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/[0.08] px-3 py-2.5 text-xs font-medium text-accent">
              <UserRound className="h-4 w-4" /> 已登入 · 星辰小騎士
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
