export type MissionCompletion = {
  missionId: number;
  total: number;
  correct: number;
  firstClear: boolean;
};

export function calculateMissionReward({ total, correct, firstClear }: MissionCompletion) {
  const accuracy = total === 0 ? 0 : correct / total;
  const accuracyReward = Math.round(24 + correct * 12);
  const perfectBonus = accuracy === 1 ? 24 : 0;
  const firstClearBonus = firstClear ? 30 : 0;

  return {
    starCoins: accuracyReward + perfectBonus + firstClearBonus,
    experience: correct * 18 + (accuracy >= 0.75 ? 30 : 0),
    perfectBonus,
    firstClearBonus,
  };
}

export function calculateLevel(experience: number) {
  return Math.max(1, Math.floor(experience / 180) + 1);
}

export function accuracyPercent(correct: number, total: number) {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

export function calculateArcadeReward(hits: number, total: number) {
  const safeTotal = Math.max(1, Math.floor(total));
  const safeHits = Math.min(safeTotal, Math.max(0, Math.floor(hits)));
  return 5 + safeHits * 3;
}

export function updateCorrectAnswerStreak(currentStreak: number, bestStreak: number, isCorrect: boolean) {
  const nextStreak = isCorrect ? currentStreak + 1 : 0;
  return { currentStreak: nextStreak, bestStreak: Math.max(bestStreak, nextStreak) };
}
