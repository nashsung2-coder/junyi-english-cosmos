import { describe, expect, it } from "vitest";
import { isSubjectArea, SUBJECT_AREAS, SUBJECT_MISSION_IDS } from "./subjectNavigation";

describe("subject navigation", () => {
  it("maps all seven subjects to a concrete interactive mission", () => {
    expect(Object.keys(SUBJECT_MISSION_IDS)).toHaveLength(7);
    expect(new Set(Object.values(SUBJECT_MISSION_IDS)).size).toBe(7);
  });

  it("only accepts defined management areas", () => {
    expect(SUBJECT_AREAS).toContain("game");
    expect(isSubjectArea("teacher")).toBe(true);
    expect(isSubjectArea("unknown")).toBe(false);
  });
});
