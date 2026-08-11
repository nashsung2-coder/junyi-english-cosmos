import { describe, expect, it } from "vitest";
import { accuracyPercent, calculateArcadeReward, calculateLevel, calculateMissionReward, updateCorrectAnswerStreak } from "./learningProgress";

describe("learning progress scoring", () => {
  it("awards first-clear and perfect-score bonuses", () => {
    expect(calculateMissionReward({ total: 4, correct: 4, firstClear: true })).toEqual({ starCoins: 126, experience: 102, perfectBonus: 24, firstClearBonus: 30 });
  });

  it("does not include perfect or first-clear bonuses on a later imperfect attempt", () => {
    expect(calculateMissionReward({ total: 4, correct: 3, firstClear: false })).toEqual({ starCoins: 60, experience: 84, perfectBonus: 0, firstClearBonus: 0 });
  });

  it("calculates learner level and answer accuracy safely", () => {
    expect(calculateLevel(420)).toBe(3);
    expect(accuracyPercent(3, 4)).toBe(75);
    expect(accuracyPercent(0, 0)).toBe(0);
  });

  it("keeps a correct-answer combo and resets it after an incorrect answer", () => {
    expect(updateCorrectAnswerStreak(2, 4, true)).toEqual({ currentStreak: 3, bestStreak: 4 });
    expect(updateCorrectAnswerStreak(3, 3, true)).toEqual({ currentStreak: 4, bestStreak: 4 });
    expect(updateCorrectAnswerStreak(4, 4, false)).toEqual({ currentStreak: 0, bestStreak: 4 });
  });

  it("rewards arcade play by hits while keeping its reward within one round", () => {
    expect(calculateArcadeReward(5, 5)).toBe(20);
    expect(calculateArcadeReward(-2, 5)).toBe(5);
    expect(calculateArcadeReward(9, 5)).toBe(20);
  });
});
