import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass, Gamepad2, Sparkles, Target, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { claimFirstHarborWelcome } from "@/lib/harborWelcome";

const WELCOME_PORTALS = [
  { title: "專攻區", eyebrow: "SKILL ATLAS", description: "校準能力、選擇下一段任務，讓每次練習都有明確方向。", color: "#6EE7F5", Icon: Target },
  { title: "星際冒險", eyebrow: "EXPEDITION BAY", description: "用知識遠征換取星幣，為夥伴補給並解鎖下一段航線。", color: "#F8C46B", Icon: Gamepad2 },
  { title: "親子星港", eyebrow: "FAMILY RHYTHM", description: "把學習成果轉成容易開始、可以一起完成的共學節奏。", color: "#F7A8C7", Icon: Users },
  { title: "班級指揮艙", eyebrow: "TEACHING SIGNAL", description: "從任務完成率與表現訊號，看見下一次引導的起點。", color: "#A7C5FF", Icon: Compass },
];

/** Full-screen first-visit welcome. The storage claim happens before opening to prevent any replay. */
export default function FirstHarborWelcome() {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const dismissButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previewWelcome = import.meta.env.DEV && new URLSearchParams(window.location.search).has("welcome-preview");
    if (previewWelcome || claimFirstHarborWelcome(window.localStorage)) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const dismiss = () => setIsOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
        return;
      }

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

  const dismiss = () => setIsOpen(false);

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
                  <h1 id="first-harbor-welcome-title" className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">回到夥伴們的星際避風港</h1>
                  <p id="first-harbor-welcome-description" className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">在這座暖光停泊站，跨學段的夥伴正等著與你分享今天的發現；準備好後，再選一條學習航線起航。</p>
                </div>
                <Button ref={dismissButtonRef} type="button" variant="ghost" onClick={dismiss} className="tap-target shrink-0 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="略過首次迎賓動畫"><X className="h-5 w-5" /></Button>
              </div>

              <div className="relative mt-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div><p className="text-xs font-bold tracking-[.18em] text-amber-100/75">UNIVERSE GATEWAYS</p><h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">從避風港選擇今天的宇宙區域</h2></div>
                <p className="max-w-md text-sm leading-6 text-slate-400">每條航線都會把成果帶回你的夥伴與星圖；這段迎賓只會在第一次開啟時出現。</p>
              </div>

              <div className="relative mt-5 grid gap-3 md:grid-cols-2">
                {WELCOME_PORTALS.map((portal, index) => {
                  const Icon = portal.Icon;
                  return (
                    <motion.article
                      key={portal.title}
                      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.028] p-5"
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.07, duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border opacity-30" style={{ borderColor: portal.color }} />
                      <div className="relative flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/20"><Icon className="h-5 w-5" style={{ color: portal.color }} /></span><span className="text-xs font-bold tracking-[.14em]" style={{ color: portal.color }}>{portal.eyebrow}</span></div>
                      <h3 className="relative mt-5 text-xl font-bold text-white">{portal.title}</h3>
                      <p className="relative mt-2 min-h-12 text-sm leading-6 text-slate-400">{portal.description}</p>
                      <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">選科啟航 <ArrowRight className="h-4 w-4" /></span>
                    </motion.article>
                  );
                })}
              </div>

              <div className="relative mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500">按 <kbd className="rounded border border-white/15 bg-black/20 px-1.5 py-0.5 text-slate-300">Esc</kbd> 或右上角關閉，即可直接進入大廳；之後不會再自動顯示。</p>
                <Button type="button" onClick={dismiss} className="tap-target bg-teal-200 text-slate-950 hover:bg-teal-100"><Sparkles className="mr-2 h-4 w-4" />開始探索</Button>
              </div>
            </motion.section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
