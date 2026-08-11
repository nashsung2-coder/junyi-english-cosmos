import { useMemo, useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { ABILITY_MAP, AI_SUGGESTIONS } from "@/lib/journeyData";
import { Bot, Trophy, Circle, CheckCircle2, Target } from "lucide-react";
import { Link } from "wouter";
import { useLearningProgress } from "@/contexts/LearningProgressContext";

/**
 * ButlerPage - 個人能力智慧管家
 * 能力圖譜(語言能力/證照/成績/學習習慣) + AI 管家下一階段方向建議(可勾選採納)
 * 設計哲學:深空極簡主義
 */
export default function ButlerPage() {
  const { state, accuracy, level, adoptDirections } = useLearningProgress();
  const dynamicAbilityMap = useMemo(() => ABILITY_MAP.map((category) => {
    if (category.category === "語言能力") {
      const scores: Record<string, string> = {
        "綜合等級": `Lv.${level}`,
        "字彙量": `${560 + state.dimensionPoints.vocabulary * 3} 字`,
        "聽力理解": `${Math.min(100, 58 + state.dimensionPoints.listening)} 分`,
        "口說表達": `${Math.min(100, 55 + state.dimensionPoints.speaking)} 分`,
        "閱讀理解": `${Math.min(100, 62 + state.dimensionPoints.reading)} 分`,
        "文法應用": `${Math.min(100, 55 + state.dimensionPoints.grammar)} 分`,
        "拼寫能力": `${Math.min(100, 56 + state.dimensionPoints.vocabulary)} 分`,
      };
      return {
        ...category,
        items: category.items.map((item) => ({
          ...item,
          value: scores[item.name] ?? item.value,
          detail: item.name === "綜合等級" ? `由 ${state.totalQuestions} 題互動練習與能力向度推導` : `${item.detail} · 會隨遠征結果更新`,
        })),
      };
    }
    if (category.category === "學習習慣") {
      return {
        ...category,
        items: category.items.map((item) => item.name === "連續學習天數"
          ? { ...item, value: `${state.currentStreak} 次任務`, detail: `最佳紀錄 ${state.longestStreak} 次；完成遠征即可延續紀錄` }
          : item.name === "累計學習時數"
            ? { ...item, value: `${Math.round(state.totalQuestions * 1.5) / 10} 小時`, detail: `由 ${state.totalQuestions} 題已完成互動練習換算` }
            : item),
      };
    }
    return category;
  }), [level, state]);

  const suggestions = useMemo(() => AI_SUGGESTIONS.map((suggestion) => {
    if (suggestion.id === 1) return { ...suggestion, reason: `口說能力目前 ${Math.min(100, 55 + state.dimensionPoints.speaking)} 分，是本輪任務可優先補強的輸出維度。` };
    if (suggestion.id === 2) return { ...suggestion, reason: `目前字彙推估 ${560 + state.dimensionPoints.vocabulary * 3} 字；完成單字溪谷會持續拉升這個數字。` };
    if (suggestion.id === 4) return { ...suggestion, reason: `文法能力目前 ${Math.min(100, 55 + state.dimensionPoints.grammar)} 分；時態雪山的作答結果會直接同步到圖譜。` };
    return suggestion;
  }), [state.dimensionPoints]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 overflow-auto pt-[60px]">
        <div className="container max-w-5xl mx-auto px-4 pt-5 pb-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-wide">能力智慧管家</h1>
            <Link
              href="/game"
              className="text-xs px-3 py-1.5 rounded-lg border border-white/15 hover:border-accent hover:text-accent transition-colors"
            >
              ← 進入遠征
            </Link>
          </div>

          <div className="glass-card p-5 flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/15">
              <Bot className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">能力圖譜</h2>
              <p className="text-xs text-muted-foreground">由 {state.totalQuestions} 題可作答練習更新 · 累計正確率 {accuracy}% · 涵蓋語言能力、紀錄與學習習慣</p>
            </div>
          </div>

          {dynamicAbilityMap.map((cat) => (
            <div key={cat.category} className="glass-card p-5 mb-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" />
                {cat.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          item.status === "strong" || item.status === "achieved"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : item.status === "planned"
                            ? "bg-amber-500/15 text-amber-300"
                            : "bg-accent/15 text-accent"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <AISelector suggestions={suggestions} adoptedIds={state.adoptedSuggestionIds} onAdopt={adoptDirections} />
        </div>
      </main>
    </div>
  );
}

/**
 * AI 管家建議選擇器:多個下一階段方向建議,可點選採納
 */
function AISelector({ suggestions, adoptedIds, onAdopt }: { suggestions: typeof AI_SUGGESTIONS; adoptedIds: number[]; onAdopt: (ids: number[]) => number }) {
  const [selected, setSelected] = useState<number[]>(adoptedIds);

  const toggle = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const adopt = () => {
    if (selected.length === 0) {
      toast.info("請先勾選您想採納的方向");
      return;
    }
    const added = onAdopt(selected);
    toast.success(added > 0 ? `已採納 ${added} 個方向，已保存到你的成長星圖。` : "這些方向已經在你的成長星圖中。");
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-accent" />
          <h3 className="font-semibold">AI 管家建議 · 下一階段方向</h3>
        </div>
        <button
          onClick={adopt}
          className="px-4 py-1.5 rounded-lg bg-accent text-background text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          採納方向 ({selected.length})
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((s) => {
          const active = selected.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`text-left rounded-lg border p-4 transition-colors ${
                active ? "border-accent bg-accent/10" : "border-white/10 bg-white/5 hover:border-white/25"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Circle className={`w-4 h-4 ${active ? "fill-accent text-accent" : "text-white/30"}`} />
                <span className="text-sm font-semibold">{s.title}</span>
                {adoptedIds.includes(s.id) && <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-300" />}
                <span className="text-xs px-1.5 py-0.5 rounded bg-white/8 text-white/60">{s.tag}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-1">{s.reason}</p>
              <p className="text-xs leading-relaxed">方案:{s.plan}</p>
              <p className="text-xs text-accent mt-1">預期成效:{s.gain}</p>
            </button>
          );
        })}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Target className="h-3.5 w-3.5 text-accent" />建議會依照已完成遠征、能力向度與作答正確率更新；採納結果會保留在這個瀏覽器中。</p>
    </div>
  );
}
