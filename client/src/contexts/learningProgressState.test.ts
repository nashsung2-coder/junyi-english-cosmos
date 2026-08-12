import { describe, expect, it } from "vitest";
import { applyCollaborationReward, applyMissionCompletion, createInitialLearningState } from "./LearningProgressContext";

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

  it("只在兩條指定航線均完成後，領取一次跨科合作獎勵", () => {
    const initial = createInitialLearningState();
    const locked = applyCollaborationReward(initial, "math-science-magnet-constellation", [107, 108], 80);
    const readyState = { ...initial, completedMissionIds: [107, 108] };
    const unlocked = applyCollaborationReward(readyState, "math-science-magnet-constellation", [107, 108], 80);
    const replay = applyCollaborationReward(unlocked.nextState, "math-science-magnet-constellation", [107, 108], 80);

    expect(locked.claimed).toBe(false);
    expect(unlocked.claimed).toBe(true);
    expect(unlocked.nextState.starCoins).toBe(readyState.starCoins + 80);
    expect(unlocked.nextState.claimedCollaborationIds).toEqual(["math-science-magnet-constellation"]);
    expect(replay.claimed).toBe(false);
  });
});
