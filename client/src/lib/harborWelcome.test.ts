import { describe, expect, it } from "vitest";
import {
  claimFirstHarborWelcome,
  getHarborLearningStage,
  HARBOR_LEARNING_STAGE_STORAGE_KEY,
  HARBOR_WELCOME_STORAGE_KEY,
  HARBOR_WELCOME_STORAGE_VALUE,
  saveHarborLearningStage,
} from "./harborWelcome";

function createMemoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

describe("claimFirstHarborWelcome", () => {
  it("only claims the welcome once for the same persisted visitor", () => {
    const storage = createMemoryStorage();

    expect(claimFirstHarborWelcome(storage)).toBe(true);
    expect(storage.getItem(HARBOR_WELCOME_STORAGE_KEY)).toBe(HARBOR_WELCOME_STORAGE_VALUE);
    expect(claimFirstHarborWelcome(storage)).toBe(false);
  });

  it("does not show the welcome when persistence is unavailable", () => {
    expect(claimFirstHarborWelcome(null)).toBe(false);
    expect(claimFirstHarborWelcome({ getItem: () => { throw new Error("blocked"); }, setItem: () => undefined })).toBe(false);
  });

  it("persists a valid learning stage without confusing it with the one-time welcome claim", () => {
    const storage = createMemoryStorage();

    expect(getHarborLearningStage(storage)).toBeNull();
    expect(saveHarborLearningStage(storage, "senior")).toBe(true);
    expect(storage.getItem(HARBOR_LEARNING_STAGE_STORAGE_KEY)).toBe("senior");
    expect(getHarborLearningStage(storage)).toBe("senior");
    expect(claimFirstHarborWelcome(storage)).toBe(true);
  });
});
