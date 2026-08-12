import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PracticeQuestion } from "@/lib/practiceData";

type QuizQuestionCardProps = {
  question: PracticeQuestion;
  questionNumber: number;
  selected: number | null;
  checked: boolean;
  onSelect: (index: number) => void;
  onCheck: () => void;
  onNext: () => void;
  isFinalQuestion: boolean;
};

export default function QuizQuestionCard({
  question,
  questionNumber,
  selected,
  checked,
  onSelect,
  onCheck,
  onNext,
  isFinalQuestion,
}: QuizQuestionCardProps) {
  const currentCorrect = selected === question.correctIndex;

  return (
    <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.015] p-5 shadow-2xl md:p-8">
      {question.context && <blockquote className="mb-6 border-l-2 border-accent/65 bg-accent/[0.045] px-4 py-3 text-sm leading-7 text-slate-200">{question.context}</blockquote>}
      <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">QUESTION {String(questionNumber).padStart(2, "0")}</p>
      <h2 id={`question-${questionNumber}`} className="mt-3 text-xl font-semibold leading-relaxed md:text-2xl">{question.prompt}</h2>
      <fieldset className="mt-7 grid gap-3" aria-labelledby={`question-${questionNumber}`}>
        <legend className="sr-only">請選擇一個答案</legend>
        {question.choices.map((choice, index) => {
          const chosen = selected === index;
          const showCorrect = checked && index === question.correctIndex;
          const showWrong = checked && chosen && !currentCorrect;
          return (
            <button
              key={choice}
              type="button"
              disabled={checked}
              onClick={() => onSelect(index)}
              aria-pressed={chosen}
              aria-label={`${String.fromCharCode(65 + index)}：${choice}${chosen ? "，已選擇" : ""}`}
              className={`tap-target flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${showCorrect ? "border-emerald-300/60 bg-emerald-400/10" : showWrong ? "border-rose-300/60 bg-rose-400/10" : chosen ? "border-accent/70 bg-accent/10" : "border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.055]"}`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-mono ${showCorrect ? "border-emerald-300 bg-emerald-300 text-emerald-950" : showWrong ? "border-rose-300 bg-rose-300 text-rose-950" : chosen ? "border-accent bg-accent text-accent-foreground" : "border-white/20 text-muted-foreground"}`}>{showCorrect ? <CheckCircle2 className="h-4 w-4" /> : showWrong ? <XCircle className="h-4 w-4" /> : String.fromCharCode(65 + index)}</span>
              <span className="text-sm md:text-base">{choice}</span>
            </button>
          );
        })}
      </fieldset>
      {checked && (
        <div role="status" aria-live="polite" className={`mt-5 rounded-2xl border p-4 text-sm leading-6 ${currentCorrect ? "border-emerald-300/30 bg-emerald-400/[0.06]" : "border-amber-300/30 bg-amber-400/[0.06]"}`}>
          <strong className={currentCorrect ? "text-emerald-200" : "text-amber-200"}>{currentCorrect ? "答對了。" : "先記下來，下一題會更好。"}</strong>
          <p className="mt-1 text-muted-foreground"><span className="font-medium text-foreground">解析：</span>{question.explanation}</p>
        </div>
      )}
      <div className="mt-7 flex justify-end gap-3">
        {!checked ? (
          <Button onClick={onCheck} disabled={selected === null} className="tap-target bg-accent text-accent-foreground hover:bg-accent/85">確認作答<CheckCircle2 className="ml-2 h-4 w-4" /></Button>
        ) : (
          <Button onClick={onNext} className="tap-target bg-white text-slate-950 hover:bg-white/90">{isFinalQuestion ? "完成遠征" : "下一題"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
        )}
      </div>
    </article>
  );
}
