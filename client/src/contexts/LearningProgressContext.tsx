import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { calculateMissionReward, calculateLevel, accuracyPercent, updateCorrectAnswerStreak } from "@/lib/learningProgress";
import type { LearningDimensionId } from "@/lib/practiceData";
import { applyPetEffect, PET_ACTIONS, type PetActionId, type PetItem, type PetStatus, type SubjectPetStatus } from "@/lib/petShop";
import { DEFAULT_PET_STATUS, SUBJECTS, type SubjectId } from "@/lib/subjectUniverse";

type MissionScore = { correct: number; total: number; completedAt: string };

export type LearningState = {
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
  subjectProgress: Record<SubjectId, { missions: number; questions: number; correct: number }>;
  pets: SubjectPetStatus;
  inventory: Record<string, number>;
};

export type MissionResult = {
  missionId: number;
  total: number;
  correct: number;
  dimension: LearningDimensionId;
  subject: SubjectId;
};

type LearningProgressContextValue = {
  state: LearningState;
  level: number;
  accuracy: number;
  completeMission: (result: MissionResult) => ReturnType<typeof calculateMissionReward>;
  spendStarCoins: (amount: number) => boolean;
  adoptDirections: (suggestionIds: number[]) => number;
  recordAnswer: (isCorrect: boolean) => void;
  grantBonusStarCoins: (amount: number) => void;
  missionCompleted: (missionId: number) => boolean;
  buyPetItem: (item: PetItem) => boolean;
  usePetItem: (subjectId: SubjectId, item: PetItem) => boolean;
  interactWithPet: (subjectId: SubjectId, actionId: PetActionId) => string;
  adjustPetStatus: (subjectId: SubjectId, effect: { hunger?: number; happiness?: number; energy?: number }) => void;
};

const STORAGE_KEY = "junyi-cosmos-learning-progress-v1";

const createSubjectProgress = () => Object.fromEntries(SUBJECTS.map((subject) => [subject.id, { missions: 0, questions: 0, correct: 0 }])) as LearningState["subjectProgress"];
const createPetStatuses = () => Object.fromEntries(SUBJECTS.map((subject) => [subject.id, { ...DEFAULT_PET_STATUS }])) as SubjectPetStatus;

export function createInitialLearningState(): LearningState {
  return {
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
    dimensionPoints: { listening: 18, speaking: 14, reading: 16, writing: 10, vocabulary: 28, grammar: 12, chinese: 10, math: 10, science: 10, social: 10, arts: 10, health: 10 },
    recentActivity: [0, 0, 1, 0, 2, 1, 0],
    adoptedSuggestionIds: [],
    subjectProgress: createSubjectProgress(),
    pets: createPetStatuses(),
    inventory: { "meteor-kibble": 1, "orbit-ball": 1 },
  };
}

export function applyMissionCompletion(current: LearningState, result: MissionResult, completedAt = new Date().toISOString()) {
  const firstClear = !current.completedMissionIds.includes(result.missionId);
  const reward = calculateMissionReward({ ...result, firstClear });
  const accuracy = result.total === 0 ? 0 : result.correct / result.total;
  const previousBest = current.missionScores[String(result.missionId)];
  const shouldReplaceScore = !previousBest || accuracy >= previousBest.correct / previousBest.total;
  const missionScores = shouldReplaceScore
    ? { ...current.missionScores, [String(result.missionId)]: { correct: result.correct, total: result.total, completedAt } }
    : current.missionScores;
  const subjectProgress = current.subjectProgress[result.subject];

  return {
    reward,
    nextState: {
      ...current,
      experience: current.experience + reward.experience,
      starCoins: current.starCoins + reward.starCoins,
      totalQuestions: current.totalQuestions + result.total,
      totalCorrect: current.totalCorrect + result.correct,
      currentStreak: current.currentStreak + 1,
      longestStreak: Math.max(current.longestStreak, current.currentStreak + 1),
      completedMissionIds: firstClear ? [...current.completedMissionIds, result.missionId] : current.completedMissionIds,
      missionScores,
      dimensionPoints: {
        ...current.dimensionPoints,
        [result.dimension]: Math.min(100, current.dimensionPoints[result.dimension] + result.correct * 5),
      },
      recentActivity: [...current.recentActivity.slice(-6), result.correct],
      subjectProgress: {
        ...current.subjectProgress,
        [result.subject]: {
          missions: subjectProgress.missions + 1,
          questions: subjectProgress.questions + result.total,
          correct: subjectProgress.correct + result.correct,
        },
      },
      pets: {
        ...current.pets,
        [result.subject]: {
          ...current.pets[result.subject],
          happiness: Math.min(100, current.pets[result.subject].happiness + 5 + result.correct * 2),
          energy: Math.min(100, current.pets[result.subject].energy + 3),
          level: Math.max(current.pets[result.subject].level, 1 + Math.floor((subjectProgress.missions + 1) / 3)),
        },
      },
    },
  };
}

function loadInitialState(): LearningState {
  const initialState = createInitialLearningState();
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
    setState((current) => applyMissionCompletion(current, result).nextState);

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

  const grantBonusStarCoins = (amount: number) => {
    const safeAmount = Math.max(0, Math.floor(amount));
    if (safeAmount === 0) return;
    setState((current) => ({ ...current, starCoins: current.starCoins + safeAmount }));
  };

  const buyPetItem = (item: PetItem) => {
    if (state.starCoins < item.cost) return false;
    setState((current) => ({
      ...current,
      starCoins: current.starCoins - item.cost,
      inventory: { ...current.inventory, [item.id]: (current.inventory[item.id] ?? 0) + 1 },
    }));
    return true;
  };

  const usePetItem = (subjectId: SubjectId, item: PetItem) => {
    if ((state.inventory[item.id] ?? 0) < 1) return false;
    setState((current) => ({
      ...current,
      inventory: { ...current.inventory, [item.id]: current.inventory[item.id] - 1 },
      pets: { ...current.pets, [subjectId]: applyPetEffect(current.pets[subjectId], item.effect) },
    }));
    return true;
  };

  const interactWithPet = (subjectId: SubjectId, actionId: PetActionId) => {
    const action = PET_ACTIONS.find((candidate) => candidate.id === actionId)!;
    setState((current) => ({ ...current, pets: { ...current.pets, [subjectId]: applyPetEffect(current.pets[subjectId], action.effect) } }));
    return action.message;
  };

  const adjustPetStatus = (subjectId: SubjectId, effect: { hunger?: number; happiness?: number; energy?: number }) => {
    setState((current) => ({ ...current, pets: { ...current.pets, [subjectId]: applyPetEffect(current.pets[subjectId], effect) } }));
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
      grantBonusStarCoins,
      missionCompleted: (missionId) => state.completedMissionIds.includes(missionId),
      buyPetItem,
      usePetItem,
      interactWithPet,
      adjustPetStatus,
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
