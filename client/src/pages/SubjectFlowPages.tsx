import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpenCheck, BrainCircuit, Coins, Compass, Gamepad2, Heart, LineChart, Play, Sparkles, Target, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import PetArcade from "@/components/PetArcade";
import { Button } from "@/components/ui/button";
import { useLearningProgress } from "@/contexts/LearningProgressContext";
import { PET_ACTIONS, type PetActionId } from "@/lib/petShop";
import { SUBJECT_AREA_META, SUBJECT_MISSION_IDS, isSubjectArea, type SubjectAreaId } from "@/lib/subjectNavigation";
import { SUBJECTS, getSubject, type SubjectId } from "@/lib/subjectUniverse";

const AREA_ICONS: Record<SubjectAreaId, typeof Compass> = {
  hall: Compass,
  specialty: Target,
  game: Gamepad2,
  journey: LineChart,
  butler: BrainCircuit,
  parent: Users,
  teacher: BookOpenCheck,
};

const AREA_GUIDANCE: Record<SubjectAreaId, (subjectName: string) => string> = {
  hall: (name) => `從${name}開始今天的 10 分鐘任務，累積一段扎實的學習紀錄。`,
  specialty: (name) => `先完成${name}的基礎任務，再依正確率選擇下一個挑戰。`,
  game: (name) => `完成${name}遠征可以獲得星幣，並讓專屬夥伴恢復探索能量。`,
  journey: (name) => `每完成一次${name}任務，都會寫入你的成長曲線與夥伴日誌。`,
  butler: (name) => `智慧管家建議先完成一個${name}任務，再依成果調整下一步。`,
  parent: (name) => `可從${name}的答題表現開始，安排一段短而穩定的親子共學時間。`,
  teacher: (name) => `以${name}的任務完成率與正確率作為下一次學習引導的起點。`,
};

function CompanionHaven() {
  const { state, interactWithPet } = useLearningProgress();
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId>("english");
  const [havenNote, setHavenNote] = useState("夥伴們剛結束巡航，正在暖光艙裡交換今天的新發現。");
  const reduceMotion = useReducedMotion();
  const activeSubject = getSubject(activeSubjectId);
  const activePet = state.pets[activeSubjectId];

  const chooseCompanion = (subjectId: SubjectId) => {
    setActiveSubjectId(subjectId);
    const subject = getSubject(subjectId);
    setHavenNote(`${subject.pet.name} 靠近了你，準備一起分享一段安靜的星際時光。`);
  };

  const shareMoment = (actionId: PetActionId) => {
    setHavenNote(interactWithPet(activeSubjectId, actionId));
  };

  return (
    <section aria-labelledby="companion-haven-title" className="relative mt-8 overflow-hidden rounded-[2rem] border border-amber-100/10 bg-[radial-gradient(ellipse_72%_68%_at_50%_22%,rgba(255,203,131,.16),transparent_52%),linear-gradient(135deg,rgba(78,205,196,.08),rgba(255,183,101,.07)_48%,rgba(8,16,20,.7))] p-5 shadow-[0_24px_90px_rgba(0,0,0,.3)] sm:p-8">
      <div className="pointer-events-none absolute -left-16 top-12 h-52 w-52 rounded-full bg-amber-200/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-teal-300/10 blur-3xl" />
      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-stretch">
        <div className="max-w-md lg:w-[35%]">
          <p className="text-xs font-bold tracking-[.18em] text-amber-100/80">COMPANION HARBOR</p>
          <h2 id="companion-haven-title" className="mt-3 text-2xl font-bold text-white sm:text-3xl">夥伴們的暖光避風港</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">這裡不急著出發。先和每一位學科夥伴打聲招呼、補充能量，再選擇今天想探索的航線。</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {PET_ACTIONS.map((action) => (
              <Button key={action.id} type="button" variant="outline" size="sm" onClick={() => shareMoment(action.id)} className="border-white/12 bg-white/[.045] text-slate-100 hover:bg-white/[.1] hover:text-white">
                <span className="mr-1.5">{action.emoji}</span>{action.label}
              </Button>
            ))}
          </div>
          <p aria-live="polite" className="mt-5 min-h-14 rounded-2xl border border-amber-100/10 bg-black/15 px-4 py-3 text-sm leading-6 text-amber-50/85">「{havenNote}」</p>
        </div>

        <div className="relative min-h-[292px] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-[#071114]/75 p-4 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_15%_18%,rgba(255,231,181,.75)_0_1px,transparent_1.5px),radial-gradient(circle_at_72%_25%,rgba(121,235,225,.72)_0_1px,transparent_1.5px),radial-gradient(circle_at_40%_73%,rgba(255,194,123,.7)_0_1px,transparent_1.5px)] [background-size:86px_92px,118px_126px,96px_110px]" />
          <motion.div animate={reduceMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} className="relative mx-auto grid min-h-[174px] max-w-sm place-items-center rounded-[2rem] border border-amber-100/15 bg-[radial-gradient(circle,rgba(255,217,151,.2),rgba(255,217,151,.04)_48%,transparent_69%)] text-center">
            <div>
              <span className="text-5xl drop-shadow-[0_0_18px_rgba(255,208,130,.35)]">{activeSubject.pet.emoji}</span>
              <p className="mt-3 font-bold text-white">{activeSubject.pet.name} 的休憩角</p>
              <p className="mt-1 text-xs text-slate-300">快樂 {activePet.happiness} · 能量 {activePet.energy}</p>
            </div>
          </motion.div>
          <div className="relative mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {SUBJECTS.map((subject, index) => {
              const pet = state.pets[subject.id];
              const active = subject.id === activeSubjectId;
              return (
                <motion.button key={subject.id} type="button" aria-pressed={active} onClick={() => chooseCompanion(subject.id)} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.045, duration: 0.22 }} className={`rounded-2xl border px-2 py-2 text-center transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 ${active ? "border-amber-100/50 bg-amber-100/12" : "border-white/8 bg-white/[.035] hover:bg-white/[.08]"}`}>
                  <span className="block text-2xl">{subject.pet.emoji}</span><span className="mt-1 block truncate text-[10px] text-slate-300">{subject.pet.name}</span><span className="mt-0.5 block text-[9px]" style={{ color: subject.color }}>Lv.{pet.level}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative mt-6 flex flex-col justify-between gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center"><p className="text-sm text-slate-300"><Heart className="mr-2 inline h-4 w-4 text-rose-300" />今天想和 <span className="font-semibold text-white">{activeSubject.pet.name}</span> 一起開啟哪段學習旅程？</p><Link href={`/subject/${activeSubject.id}/hall`} className="inline-flex items-center gap-2 text-sm font-semibold text-amber-100 transition-colors hover:text-white">前往{activeSubject.name}管理頁 <ArrowRight className="h-4 w-4" /></Link></div>
    </section>
  );
}

export function SubjectSelectorPage({ area }: { area: SubjectAreaId }) {
  const meta = SUBJECT_AREA_META[area];
  const AreaIcon = AREA_ICONS[area];
  const { state } = useLearningProgress();
  const isHarbor = area === "hall";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_70%_50%_at_75%_0%,rgba(78,205,196,.13),transparent_68%),#061014] text-foreground">
      <Navbar />
      <main className="page-safe-top container max-w-6xl pb-14">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] px-5 py-8 shadow-[0_20px_70px_rgba(0,0,0,.26)] sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-accent/15" />
          <div className="relative max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[.18em] text-accent"><AreaIcon className="h-4 w-4" />{isHarbor ? "WELCOME HOME" : meta.eyebrow}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{isHarbor ? "回到夥伴們的星際避風港" : meta.title}</h1>
            <p className="mt-3 max-w-xl leading-7 text-slate-300">{isHarbor ? "在這座暖光停泊站，七科夥伴正等著與你分享今天的發現；準備好後，再選一門學科起航。" : meta.description}</p>
          </div>
        </section>

        {isHarbor && <CompanionHaven />}

        <section className="mt-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div><h2 className="text-xl font-bold text-white">{isHarbor ? "選擇下一段學習航線" : "七科學習航線"}</h2><p className="mt-1 text-sm text-muted-foreground">選擇一科後，才會開啟相應的 {meta.managementLabel}。</p></div>
            <span className="rounded-full border border-accent/25 bg-accent/[.08] px-3 py-1.5 text-xs font-semibold text-accent">{state.starCoins} 星幣可用</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SUBJECTS.map((subject) => {
              const progress = state.subjectProgress[subject.id];
              const pet = state.pets[subject.id];
              return (
                <Link key={subject.id} href={`/subject/${subject.id}/${area}`} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.026] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <div className="absolute inset-x-0 top-0 h-0.5 opacity-80" style={{ background: subject.color }} />
                  <div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/15 text-2xl">{subject.pet.emoji}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-slate-400">Lv.{pet.level}</span></div>
                  <h3 className="mt-5 font-bold text-white">{subject.name} <span className="font-normal text-slate-400">· {subject.pet.name}</span></h3>
                  <p className="mt-1 min-h-10 text-xs leading-5 text-slate-400">{subject.tagline}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-300"><span>{progress.missions} 次任務</span><span className="inline-flex items-center gap-1 font-semibold" style={{ color: subject.color }}>進入管理 <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span></div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export function SubjectManagementPage() {
  const [, params] = useRoute("/subject/:subjectId/:area");
  const subjectId = params?.subjectId as SubjectId | undefined;
  const area = params?.area;
  const validSubject = SUBJECTS.some((subject) => subject.id === subjectId);

  if (!validSubject || !isSubjectArea(area)) {
    return <SubjectSelectorPage area="hall" />;
  }

  const selectedSubjectId = subjectId as SubjectId;
  const subject = getSubject(selectedSubjectId);
  const meta = SUBJECT_AREA_META[area];
  const missionId = SUBJECT_MISSION_IDS[subject.id];
  const { state } = useLearningProgress();
  const progress = state.subjectProgress[subject.id];
  const pet = state.pets[subject.id];
  const accuracy = progress.questions === 0 ? 0 : Math.round((progress.correct / progress.questions) * 100);
  const AreaIcon = AREA_ICONS[area];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_70%_50%_at_75%_0%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_68%),#061014] text-foreground">
      <Navbar />
      <main className="page-safe-top container max-w-6xl pb-14">
        <Link href={`/${area === "hall" ? "hall" : area}`} className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" />返回科目選擇</Link>
        <section className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[.026] p-5 shadow-[0_20px_70px_rgba(0,0,0,.26)] sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div className="flex items-start gap-4"><span className="grid h-16 w-16 place-items-center rounded-3xl border border-white/10 bg-black/20 text-4xl">{subject.pet.emoji}</span><div><p className="flex items-center gap-2 text-xs font-bold tracking-[.16em]" style={{ color: subject.color }}><AreaIcon className="h-4 w-4" />{meta.eyebrow}</p><h1 className="mt-2 text-3xl font-bold text-white">{subject.name}{meta.managementLabel}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{subject.pet.name}說：「{subject.pet.greeting}」</p></div></div>
            <Link href={`/practice/${missionId}`}><Button className="w-full sm:w-auto" style={{ background: subject.color, color: "#071016" }}><Play className="mr-2 h-4 w-4" />開始{subject.name}任務</Button></Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[["完成任務", `${progress.missions} 次`, Target], ["答題正確率", `${accuracy}%`, LineChart], ["夥伴快樂", `${pet.happiness}/100`, Heart], ["探索能量", `${pet.energy}/100`, Sparkles]].map(([label, value, Icon]) => {
              const StatIcon = Icon as typeof Target;
              return <div key={label as string} className="rounded-2xl border border-white/8 bg-black/15 p-4"><StatIcon className="h-4 w-4" style={{ color: subject.color }} /><p className="mt-3 text-xl font-bold text-white">{value as string}</p><p className="mt-1 text-xs text-slate-400">{label as string}</p></div>;
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[.026] p-6"><p className="text-xs font-bold tracking-[.16em]" style={{ color: subject.color }}>NEXT MISSION</p><h2 className="mt-3 text-2xl font-bold text-white">{subject.name}的下一個學習行動</h2><p className="mt-3 leading-7 text-slate-300">{AREA_GUIDANCE[area](subject.name)}</p><div className="mt-6 rounded-2xl border border-white/8 bg-black/15 p-4"><p className="text-sm font-semibold text-white">專屬任務：{subject.name}知識遠征</p><p className="mt-1 text-xs leading-5 text-slate-400">完成後會更新{meta.managementLabel}、星幣與 {subject.pet.name} 的狀態。</p><Link href={`/practice/${missionId}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: subject.color }}>進入可作答任務 <ArrowRight className="h-4 w-4" /></Link></div></div>
          <aside className="rounded-3xl border border-white/10 bg-white/[.026] p-6"><p className="text-xs font-bold tracking-[.16em]" style={{ color: subject.color }}>COMPANION STATUS</p><h2 className="mt-3 text-xl font-bold text-white">{subject.pet.name}的補給站</h2><p className="mt-2 text-sm leading-6 text-slate-400">最喜歡的物品是「{subject.pet.favoriteItem}」。完成任務與互動都會幫助牠維持探索狀態。</p><div className="mt-5 space-y-3">{[["飽足度", pet.hunger], ["快樂度", pet.happiness], ["能量", pet.energy]].map(([label, value]) => <div key={label as string}><div className="mb-1 flex justify-between text-xs text-slate-400"><span>{label as string}</span><span>{value as number}/100</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${value as number}%`, background: subject.color }} /></div></div>)}</div></aside>
        </section>

        {area === "game" && <div className="mt-6"><PetArcade subjectId={subject.id} /></div>}
        {area !== "game" && <section className="mt-6 rounded-3xl border border-white/10 bg-white/[.026] p-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold tracking-[.16em]" style={{ color: subject.color }}>SUBJECT FOCUS</p><h2 className="mt-2 text-xl font-bold text-white">{subject.name}{meta.managementLabel}已就緒</h2><p className="mt-2 text-sm text-slate-400">隨時可回到這個頁面檢視該科的最新任務、能力與夥伴狀態。</p></div><div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-slate-300"><Coins className="mr-2 inline h-4 w-4 text-amber-200" />目前共有 {state.starCoins} 星幣</div></div></section>}
      </main>
    </div>
  );
}
