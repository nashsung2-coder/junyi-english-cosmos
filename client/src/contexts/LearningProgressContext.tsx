import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { calculateMissionReward, calculateLevel, accuracyPercent, updateCorrectAnswerStreak } from "@/lib/learningProgress";
import type { LearningDimensionId } from "@/lib/practiceData";

type MissionScore = { correct: number; total: number; completedAt: string };

type LearningState = {
  experience: number;
  starCoins: number;
  totalQuestions: number;
  totalCorrect: number;
  currentStreak: number;
  longestStreak: number;
  currentCorrectStreak: number;
  bestCorrectStreak: number;
  completedMissionIds: number[];
  missionScores: Record<string, MissionScore>;
  dimensionPoints: Record<LearningDimensionId, number>;
  recentActivity: number[];
  adoptedSuggestionIds: number[];
};

type MissionResult = {
  missionId: number;
  total: number;
  correct: number;
  dimension: LearningDimensionId;
};

type LearningProgressContextValue = {
  state: LearningState;
  level: number;
  accuracy: number;
  completeMission: (result: MissionResult) => ReturnType<typeof calculateMissionReward>;
  spendStarCoins: (amount: number) => boolean;
  adoptDirections: (suggestionIds: number[]) => number;
  recordAnswer: (isCorrect: boolean) => void;
  missionCompleted: (missionId: number) => boolean;
};

const STORAGE_KEY = "junyi-cosmos-learning-progress-v1";

const initialState: LearningState = {
  experience: 420,
  starCoins: 320,
  totalQuestions: 24,
  totalCorrect: 18,
  currentStreak: 4,
  longestStreak: 7,
  currentCorrectStreak: 0,
  bestCorrectStreak: 0,
  completedMissionIds: [],
  missionScores: {},
  dimensionPoints: { listening: 18, speaking: 14, reading: 16, writing: 10, vocabulary: 28, grammar: 12 },
  recentActivity: [0, 0, 1, 0, 2, 1, 0],
  adoptedSuggestionIds: [],
};

function loadInitialState(): LearningState {
  if (typeof window === "undefined") return initialState;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;
    return { ...initialState, ...JSON.parse(stored) } as LearningState;
  } catch {
    return initialState;
  }
}

const LearningProgressContext = createContext<LearningProgressContextValue | null>(null);

export function LearningProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningState>(loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const completeMission = (result: MissionResult) => {
    const firstClear = !state.completedMissionIds.includes(result.missionId);
    const reward = calculateMissionReward({ ...result, firstClear });
    const accuracy = result.total === 0 ? 0 : result.correct / result.total;

    setState((current) => {
      const previousBest = current.missionScores[String(result.missionId)];
      const shouldReplaceScore = !previousBest || accuracy >= previousBest.correct / previousBest.total;
      const updatedScores = shouldReplaceScore
        ? { ...current.missionScores, [String(result.missionId)]: { correct: result.correct, total: result.total, completedAt: new Date().toISOString() } }
        : current.missionScores;

      return {
        ...current,
        experience: current.experience + reward.experience,
        starCoins: current.starCoins + reward.starCoins,
        totalQuestions: current.totalQuestions + result.total,
        totalCorrect: current.totalCorrect + result.correct,
        currentStreak: current.currentStreak + 1,
        longestStreak: Math.max(current.longestStreak, current.currentStreak + 1),
        completedMissionIds: firstClear ? [...current.completedMissionIds, result.missionId] : current.completedMissionIds,
        missionScores: updatedScores,
        dimensionPoints: {
          ...current.dimensionPoints,
          [result.dimension]: Math.min(100, current.dimensionPoints[result.dimension] + result.correct * 5),
        },
        recentActivity: [...current.recentActivity.slice(-6), result.correct],
      };
    });

    return reward;
  };

  const spendStarCoins = (amount: number) => {
    if (state.starCoins < amount) return false;
    setState((current) => ({ ...current, starCoins: current.starCoins - amount }));
    return true;
  };

  const adoptDirections = (suggestionIds: number[]) => {
    const newIds = suggestionIds.filter((id) => !state.adoptedSuggestionIds.includes(id));
    if (newIds.length === 0) return 0;
    setState((current) => ({
      ...current,
      adoptedSuggestionIds: Array.from(new Set([...current.adoptedSuggestionIds, ...newIds])),
    }));
    return newIds.length;
  };

  const recordAnswer = (isCorrect: boolean) => {
    setState((current) => {
      const next = updateCorrectAnswerStreak(current.currentCorrectStreak, current.bestCorrectStreak, isCorrect);
      return { ...current, currentCorrectStreak: next.currentStreak, bestCorrectStreak: next.bestStreak };
    });
  };

  const value = useMemo<LearningProgressContextValue>(
    () => ({
      state,
      level: calculateLevel(state.experience),
      accuracy: accuracyPercent(state.totalCorrect, state.totalQuestions),
      completeMission,
      spendStarCoins,
      adoptDirections,
      recordAnswer,
      missionCompleted: (missionId) => state.completedMissionIds.includes(missionId),
    }),
    [state],
  );

  return <LearningProgressContext.Provider value={value}>{children}</LearningProgressContext.Provider>;
}

export function useLearningProgress() {
  const context = useContext(LearningProgressContext);
  if (!context) throw new Error("useLearningProgress must be used inside LearningProgressProvider");
  return context;
}
