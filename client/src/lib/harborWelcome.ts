import type { LearningStageId } from "./subjectUniverse";

export const HARBOR_WELCOME_STORAGE_KEY = "junyi-cosmos-harbor-welcome-v1";
export const HARBOR_WELCOME_STORAGE_VALUE = "seen";
export const HARBOR_LEARNING_STAGE_STORAGE_KEY = "junyi-cosmos-learning-stage-v1";
export const DEFAULT_HARBOR_LEARNING_STAGE: LearningStageId = "elementary";

export type StorageAdapter = Pick<Storage, "getItem" | "setItem">;

/**
 * Atomically claims the first-harbor visit. Returning false means the welcome
 * has already been shown (or persistence is unavailable), so it must not replay.
 */
export function claimFirstHarborWelcome(storage: StorageAdapter | null | undefined) {
  if (!storage) return false;

  try {
    if (storage.getItem(HARBOR_WELCOME_STORAGE_KEY) === HARBOR_WELCOME_STORAGE_VALUE) {
      return false;
    }
    storage.setItem(HARBOR_WELCOME_STORAGE_KEY, HARBOR_WELCOME_STORAGE_VALUE);
    return true;
  } catch {
    return false;
  }
}

export function getHarborLearningStage(storage: StorageAdapter | null | undefined): LearningStageId | null {
  if (!storage) return null;

  try {
    const value = storage.getItem(HARBOR_LEARNING_STAGE_STORAGE_KEY);
    return value === "elementary" || value === "junior" || value === "senior" ? value : null;
  } catch {
    return null;
  }
}

/** Returns the saved stage when available, otherwise the calm elementary-harbor starting point. */
export function getPreferredHarborLearningStage(storage: StorageAdapter | null | undefined): LearningStageId {
  return getHarborLearningStage(storage) ?? DEFAULT_HARBOR_LEARNING_STAGE;
}

export function saveHarborLearningStage(storage: StorageAdapter | null | undefined, stageId: LearningStageId) {
  if (!storage) return false;

  try {
    storage.setItem(HARBOR_LEARNING_STAGE_STORAGE_KEY, stageId);
    return true;
  } catch {
    return false;
  }
}
