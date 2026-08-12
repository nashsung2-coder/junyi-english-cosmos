import { describe, expect, it } from "vitest";
import { applyMissionCompletion, createInitialLearningState } from "./LearningProgressContext";

describe("任務完成的跨頁學習循環", () => {
  it("同步提供星際冒險與成長回顧所需的獎勵、夥伴與任務資料", () => {
    const initial = createInitialLearningState();
    const result = { missionId: 1, total: 5, correct: 4, dimension: "vocabulary" as const, subject: "english" as const };
    const { reward, nextState } = applyMissionCompletion(initial, result, "2026-08-12T00:00:00.000Z");

    expect(nextState.starCoins).toBe(initial.starCoins + reward.starCoins);
    expect(nextState.missionScores["1"]).toEqual({ correct: 4, total: 5, completedAt: "2026-08-12T00:00:00.000Z" });
    expect(nextState.subjectProgress.english).toEqual({ missions: 1, questions: 5, correct: 4 });
    expect(nextState.recentActivity.at(-1)).toBe(4);
    expect(nextState.pets.english.happiness).toBeGreaterThan(initial.pets.english.happiness);
    expect(nextState.pets.english.energy).toBeGreaterThan(initial.pets.english.energy);
  });
});
