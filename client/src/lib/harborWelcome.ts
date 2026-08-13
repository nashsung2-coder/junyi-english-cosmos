export const HARBOR_WELCOME_STORAGE_KEY = "junyi-cosmos-harbor-welcome-v1";
export const HARBOR_WELCOME_STORAGE_VALUE = "seen";

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
