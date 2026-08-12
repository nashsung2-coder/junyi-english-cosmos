import { useState } from "react";
import { Coins, Gamepad2, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearningProgress } from "@/contexts/LearningProgressContext";
import { calculateArcadeReward } from "@/lib/learningProgress";
import { getSubject, type SubjectId } from "@/lib/subjectUniverse";

const CELLS = Array.from({ length: 9 }, (_, index) => index);
const ROUNDS = 5;

export default function PetArcade({ subjectId = "english" }: { subjectId?: SubjectId }) {
  const { grantBonusStarCoins, interactWithPet } = useLearningProgress();
  const subject = getSubject(subjectId);
  const [active, setActive] = useState(false);
  const [target, setTarget] = useState(4);
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [message, setMessage] = useState(`點擊發亮的星球，陪${subject.pet.name}完成一輪軌道追星。`);

  const start = () => {
    setActive(true);
    setRound(0);
    setHits(0);
    setTarget(Math.floor(Math.random() * CELLS.length));
    setMessage(`${subject.pet.name}已經就位，找到下一顆發亮的星球！`);
  };

  const chooseCell = (index: number) => {
    if (!active) return;
    if (index !== target) {
      setMessage("這顆星還沒有亮起，再觀察一下軌道。 ");
      return;
    }

    const nextRound = round + 1;
    const nextHits = hits + 1;
    if (nextRound >= ROUNDS) {
      const reward = calculateArcadeReward(nextHits, ROUNDS);
      grantBonusStarCoins(reward);
      const petMessage = interactWithPet(subjectId, "play");
      setActive(false);
      setRound(nextRound);
      setHits(nextHits);
      setMessage(`追星完成！命中 ${nextHits}/${ROUNDS}，獲得 ${reward} 星幣。${petMessage}`);
      return;
    }

    setRound(nextRound);
    setHits(nextHits);
    setTarget(Math.floor(Math.random() * CELLS.length));
    setMessage(`命中！${subject.pet.name}正追向下一顆星。`);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.12] via-white/[0.035] to-white/[0.01] p-5 shadow-[0_20px_60px_rgba(0,0,0,.24)]">
      <div className="pointer-events-none absolute -right-9 -top-9 h-32 w-32 rounded-full border border-amber-200/15" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_220px] lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-amber-200"><Gamepad2 className="h-4 w-4" /> ARCADE · 立即試玩</div>
          <h3 className="mt-3 text-xl font-bold text-white">{subject.pet.emoji} {subject.pet.name}的追星軌道</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">在五回合內點擊發亮星球。完成後會增加{subject.pet.name}的快樂，並依命中表現獲得星幣。</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-slate-300"><Target className="mr-1 inline h-3.5 w-3.5 text-amber-200" />回合 {Math.min(round + (active ? 1 : 0), ROUNDS)}/{ROUNDS}</span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-slate-300"><Sparkles className="mr-1 inline h-3.5 w-3.5 text-amber-200" />命中 {hits}</span>
          </div>
          <p aria-live="polite" className="mt-4 text-sm leading-6 text-amber-100/90">{message}</p>
          <Button onClick={start} className="mt-5 bg-amber-300 text-amber-950 hover:bg-amber-200">{active ? "重新開始" : "開始追星"}<Coins className="ml-2 h-4 w-4" /></Button>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-[#071016]/65 p-3">
          {CELLS.map((cell) => {
            const isTarget = active && target === cell;
            return (
              <button
                key={cell}
                type="button"
                aria-label={isTarget ? "發亮星球" : "軌道星球"}
                onClick={() => chooseCell(cell)}
                className={`aspect-square rounded-xl border transition-all duration-200 ${isTarget ? "scale-105 border-amber-100 bg-amber-300 text-amber-950 shadow-[0_0_24px_rgba(252,211,77,.65)]" : "border-white/10 bg-white/[0.035] text-slate-600 hover:border-amber-200/40 hover:text-amber-100"}`}
              >
                <Sparkles className={`mx-auto h-5 w-5 ${isTarget ? "animate-pulse" : ""}`} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
