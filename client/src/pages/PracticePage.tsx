import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, CircleHelp, Coins, ExternalLink, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import QuizQuestionCard from "@/components/QuizQuestionCard";
import { Button } from "@/components/ui/button";
import { useLearningProgress } from "@/contexts/LearningProgressContext";
import { getJunyiPracticeResource } from "@/lib/junyiResources";
import { accuracyPercent } from "@/lib/learningProgress";
import { getPracticeMission } from "@/lib/practiceData";
import { getSubject } from "@/lib/subjectUniverse";

export default function PracticePage() {
  const [, params] = useRoute("/practice/:missionId");
  const mission = useMemo(() => getPracticeMission(Number(params?.missionId)), [params?.missionId]);
  const { completeMission, level, state, recordAnswer } = useLearningProgress();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const [reward, setReward] = useState<{ starCoins: number; experience: number; perfectBonus: number; firstClearBonus: number } | null>(null);

  useEffect(() => {
    setQuestionIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers({});
    setCompleted(false);
    setReward(null);
  }, [mission?.id]);

  if (!mission) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="page-safe-top container pb-24 text-center">
          <CircleHelp className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold">找不到這條遠征航線</h1>
          <Link href="/game" className="tap-target mt-5 inline-flex items-center text-accent hover:underline">回到遊戲模式</Link>
        </main>
      </div>
    );
  }

  const question = mission.questions[questionIndex];
  const subject = getSubject(mission.subject);
  const correctCount = Object.entries(answers).filter(([index, answer]) => Number(answer) === mission.questions[Number(index)]?.correctIndex).length;
  const progress = Math.round((questionIndex / mission.questions.length) * 100);
  const currentCorrect = selected === question.correctIndex;
  const managementHref = `/subject/${mission.subject}/game`;
  const junyiResource = getJunyiPracticeResource(mission.id, mission.subject);

  const checkAnswer = () => {
    if (selected === null || checked) return;
    setAnswers((current) => ({ ...current, [questionIndex]: selected }));
    recordAnswer(selected === question.correctIndex);
    setChecked(true);
  };

  const nextQuestion = () => {
    if (questionIndex < mission.questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      setSelected(null);
      setChecked(false);
      return;
    }

    const finalCorrect = correctCount;
    const result = completeMission({ missionId: mission.id, total: mission.questions.length, correct: finalCorrect, dimension: mission.dimension, subject: mission.subject });
    setReward(result);
    setCompleted(true);
    toast.success(`遠征紀錄已同步：獲得 ${result.starCoins} 星幣`);
  };

  const restart = () => {
    setQuestionIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers({});
    setCompleted(false);
    setReward(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="page-safe-top container max-w-5xl pb-8 md:pb-12" aria-label={`${subject.name}${mission.name}互動任務`}>
        <div className="mb-7 flex items-center justify-between gap-4">
          <Link href={managementHref} className="tap-target inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> 返回{subject.name}冒險管理
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/5 px-3 py-1.5 text-xs text-amber-200">
            <Coins className="h-3.5 w-3.5" /> {state.starCoins} 星幣 · Lv.{level}
          </div>
        </div>

        {completed && reward ? (
          <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/12 via-background to-background p-6 text-center shadow-[0_0_80px_rgba(78,205,196,0.12)] md:p-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/35 bg-amber-400/10 text-amber-200"><Trophy className="h-8 w-8" /></div>
            <p className="mb-2 text-sm font-semibold tracking-[0.22em] text-accent">MISSION COMPLETE</p>
            <h1 className="text-3xl font-bold">{mission.name}完成</h1>
            <p className="mt-3 text-muted-foreground">你答對 <strong className="text-foreground">{correctCount}</strong> / {mission.questions.length} 題，正確率 {accuracyPercent(correctCount, mission.questions.length)}%。</p>
            <div className="my-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><Coins className="mx-auto mb-2 h-5 w-5 text-amber-200" /><div className="font-mono text-xl font-bold text-amber-200">+{reward.starCoins}</div><div className="mt-1 text-xs text-muted-foreground">學習星幣</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><Sparkles className="mx-auto mb-2 h-5 w-5 text-accent" /><div className="font-mono text-xl font-bold text-accent">+{reward.experience}</div><div className="mt-1 text-xs text-muted-foreground">冒險經驗值</div></div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-left text-sm text-muted-foreground" role="status">
              <span className="font-semibold text-foreground">下一步：</span>回到{subject.name}冒險管理頁，查看這次任務如何補足 {subject.pet.name} 的能量；再依自己的節奏前往均一延伸學習。
            </div>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button onClick={restart} variant="outline" className="tap-target border-white/15"><RotateCcw className="mr-2 h-4 w-4" />再練一次</Button>
              <Link href={managementHref} className="tap-target inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/85"><Coins className="mr-2 h-4 w-4" />查看任務回報</Link>
              <a href={junyiResource.url} target="_blank" rel="noopener noreferrer" aria-label={`前往均一教材：${junyiResource.title}`} className="tap-target inline-flex w-full items-center justify-center rounded-md border border-accent/35 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10"><ExternalLink className="mr-2 h-4 w-4" />延伸學習：{junyiResource.title}</a>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-3xl">
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4 md:p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><p className="text-xs font-semibold tracking-[0.18em]" style={{ color: mission.accent }}>{subject.shortName.toUpperCase()} EXPEDITION · {subject.pet.emoji} {subject.pet.name}</p><h1 className="mt-1 text-2xl font-bold md:text-3xl">{mission.name}</h1><p className="mt-1 text-sm text-muted-foreground">{mission.subtitle} · {mission.estimate}</p></div>
                <span className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: `${mission.accent}55`, color: mission.accent }}>{mission.difficulty}</span>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label="任務進度" aria-valuemin={0} aria-valuemax={mission.questions.length} aria-valuenow={questionIndex} aria-valuetext={`第 ${questionIndex + 1} 題，共 ${mission.questions.length} 題`}><div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: mission.accent }} /></div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>任務進度 · 每題作答後都會獲得即時解析</span><span className="font-mono">{questionIndex + 1} / {mission.questions.length}</span></div>
            </div>

            <QuizQuestionCard
              question={question}
              questionNumber={questionIndex + 1}
              selected={selected}
              checked={checked}
              onSelect={setSelected}
              onCheck={checkAnswer}
              onNext={nextQuestion}
              isFinalQuestion={questionIndex === mission.questions.length - 1}
            />
          </section>
        )}
      </main>
    </div>
  );
}
