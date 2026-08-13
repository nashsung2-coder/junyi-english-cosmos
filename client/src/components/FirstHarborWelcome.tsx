import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Compass, GraduationCap, Sparkles, Telescope, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { claimFirstHarborWelcome, getHarborLearningStage, saveHarborLearningStage } from "@/lib/harborWelcome";
import { getLearningStage, getSubjectsForStage, LEARNING_STAGES, type LearningStageId, type SubjectDefinition } from "@/lib/subjectUniverse";

type FirstHarborWelcomeProps = {
  onStageSelect: (stageId: LearningStageId) => void;
};

const STAGE_ICONS = {
  elementary: BookOpen,
  junior: Compass,
  senior: Telescope,
};

function getTrackLabels(subject: SubjectDefinition) {
  if (subject.id === "biology" || subject.id === "earth-science") return ["必修", "進階延伸"];
  if (subject.courseTracks?.includes("elective")) return ["必修", "選修"];
  return ["共同學科"];
}

/** Full-screen first-visit welcome. The visitor chooses a stage before entering its real subject routes. */
export default function FirstHarborWelcome({ onStageSelect }: FirstHarborWelcomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<LearningStageId | null>(null);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const dismissButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const storedStage = getHarborLearningStage(window.localStorage);
    if (storedStage) onStageSelect(storedStage);

    const query = new URLSearchParams(window.location.search);
    const previewWelcome = import.meta.env.DEV && query.has("welcome-preview");
    const previewStage = import.meta.env.DEV ? query.get("welcome-stage") : null;
    if (previewStage === "elementary" || previewStage === "junior" || previewStage === "senior") {
      setSelectedStageId(previewStage);
      onStageSelect(previewStage);
    }
    if (previewWelcome || claimFirstHarborWelcome(window.localStorage)) setIsOpen(true);
  }, [onStageSelect]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return setIsOpen(false);
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => dismissButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const selectedStage = useMemo(() => selectedStageId ? getLearningStage(selectedStageId) : null, [selectedStageId]);
  const stageSubjects = useMemo(() => selectedStageId ? getSubjectsForStage(selectedStageId) : [], [selectedStageId]);
  const dismiss = () => setIsOpen(false);
  const chooseStage = (stageId: LearningStageId) => {
    saveHarborLearningStage(window.localStorage, stageId);
    onStageSelect(stageId);
    setSelectedStageId(stageId);
  };
  const chooseSubject = (stageId: LearningStageId) => {
    saveHarborLearningStage(window.localStorage, stageId);
    onStageSelect(stageId);
    dismiss();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-[70] overflow-y-auto bg-[#020a0c]/95 px-4 py-5 backdrop-blur-xl sm:px-7 sm:py-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transition: { duration: 0.18 } }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="first-harbor-welcome-title"
          aria-describedby="first-harbor-welcome-description"
        >
          <div className="mx-auto flex min-h-full max-w-6xl items-center">
            <motion.section
              className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(ellipse_80%_80%_at_15%_0%,rgba(78,205,196,.12),transparent_50%),radial-gradient(ellipse_65%_70%_at_100%_100%,rgba(248,196,107,.08),transparent_58%),#071114] px-5 py-7 shadow-[0_30px_110px_rgba(0,0,0,.55)] sm:px-9 sm:py-10"
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute left-[22%] top-[12%] h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-100/15 to-transparent" />
              <div className="relative flex items-start justify-between gap-5">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[.22em] text-teal-200"><Sparkles className="h-4 w-4" />WELCOME HOME</p>
                  <h1 id="first-harbor-welcome-title" className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">先選擇你的學習學段</h1>
                  <p id="first-harbor-welcome-description" className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">選完後會看見對應的學科航線；國小與國中共用七科探索，高中則從自然科的必修、選修與進階延伸起航。</p>
                </div>
                <Button ref={dismissButtonRef} type="button" variant="ghost" onClick={dismiss} className="tap-target shrink-0 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="略過首次迎賓動畫"><X className="h-5 w-5" /></Button>
              </div>

              {!selectedStage ? (
                <div className="relative mt-9">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold tracking-[.18em] text-amber-100/75">STEP 01 · LEARNING STAGE</p><h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">今天從哪一段學習宇宙出發？</h2></div><p className="max-w-md text-sm leading-6 text-slate-400">這個選擇會同步到大廳；日後仍可在大廳切換學段。</p></div>
                  <div className="mt-5 grid gap-3 md:grid-cols-3" role="list" aria-label="選擇學習學段">
                    {LEARNING_STAGES.map((stage, index) => {
                      const Icon = STAGE_ICONS[stage.id];
                      const count = getSubjectsForStage(stage.id).length;
                      return <motion.button key={stage.id} type="button" onClick={() => chooseStage(stage.id)} className="tap-target group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.028] p-5 text-left transition-[transform,background-color,border-color] duration-200 hover:-translate-y-1 hover:bg-white/[.065] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: `${stage.color}55` }} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.08, duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
                        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full border opacity-30" style={{ borderColor: stage.color }} />
                        <div className="relative flex items-start justify-between gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/20"><Icon className="h-5 w-5" style={{ color: stage.color }} /></span><span className="text-xs font-bold tracking-[.14em]" style={{ color: stage.color }}>{stage.shortName}</span></div>
                        <h3 className="relative mt-5 text-xl font-bold text-white">{stage.name}</h3><p className="relative mt-2 min-h-12 text-sm leading-6 text-slate-400">{stage.description}</p><span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">{count} 條學科航線 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                      </motion.button>;
                    })}
                  </div>
                </div>
              ) : (
                <div className="relative mt-9">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><button type="button" onClick={() => setSelectedStageId(null)} className="tap-target inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-white"><ArrowLeft className="h-3.5 w-3.5" />更換學段</button><p className="mt-4 text-xs font-bold tracking-[.18em]" style={{ color: selectedStage.color }}>STEP 02 · {selectedStage.shortName}</p><h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">{selectedStage.name}的學科航線</h2></div><p className="max-w-md text-sm leading-6 text-slate-400">{selectedStageId === "senior" ? "高中自然科依每科真實教材顯示必修、選修或進階延伸。" : "國小與國中共用七科核心入口，先挑一科進入專屬管理頁。"}</p></div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {stageSubjects.map((subject, index) => <motion.div key={subject.id} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.055, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}><Link href={`/subject/${subject.id}/hall`} onClick={() => chooseSubject(selectedStage.id)} className="tap-target group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[.028] p-5 transition-[transform,background-color,border-color] duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[.065] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><div className="absolute inset-x-0 top-0 h-0.5" style={{ background: subject.color }} /><div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/15 text-2xl">{subject.pet.emoji}</span><span className="text-xs font-bold tracking-[.14em]" style={{ color: subject.color }}>{subject.shortName}</span></div><h3 className="mt-5 font-bold text-white">{subject.name}<span className="font-normal text-slate-400"> · {subject.pet.name}</span></h3><p className="mt-1 min-h-10 text-xs leading-5 text-slate-400">{subject.tagline}</p>{selectedStageId === "senior" && <div className="mt-3 flex flex-wrap gap-1.5">{getTrackLabels(subject).map((label) => <span key={label} className="rounded-full border border-white/10 bg-black/15 px-2 py-1 text-[10px] font-semibold" style={{ color: label === "必修" ? "#F8C46B" : label === "選修" ? "#C4B5FD" : "#9CE7D2" }}>{label}</span>)}</div>}<span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">選科啟航 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link></motion.div>)}
                  </div>
                </div>
              )}

              <div className="relative mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-slate-500">按 <kbd className="rounded border border-white/15 bg-black/20 px-1.5 py-0.5 text-slate-300">Esc</kbd> 或右上角關閉，即可直接進入大廳；迎賓之後不會再自動顯示。</p><Button type="button" onClick={dismiss} className="tap-target bg-teal-200 text-slate-950 hover:bg-teal-100"><GraduationCap className="mr-2 h-4 w-4" />稍後再選</Button></div>
            </motion.section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
