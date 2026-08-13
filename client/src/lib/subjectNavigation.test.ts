import { describe, expect, it } from "vitest";
import { isSubjectArea, SUBJECT_AREAS, SUBJECT_MISSION_IDS } from "./subjectNavigation";
import { LEARNING_STAGES, SUBJECTS } from "./subjectUniverse";

describe("subject navigation", () => {
  it("maps every learning-stage subject to a concrete interactive mission", () => {
    expect(Object.keys(SUBJECT_MISSION_IDS)).toHaveLength(SUBJECTS.length);
    expect(new Set(Object.values(SUBJECT_MISSION_IDS)).size).toBe(SUBJECTS.length);
    expect(LEARNING_STAGES.map((stage) => stage.id)).toEqual(["elementary", "junior", "senior"]);
    expect(SUBJECTS.filter((subject) => subject.stages.includes("senior")).map((subject) => subject.id)).toEqual(["physics", "chemistry", "biology", "earth-science"]);
  });

  it("only accepts defined management areas", () => {
    expect(SUBJECT_AREAS).toContain("game");
    expect(isSubjectArea("teacher")).toBe(true);
    expect(isSubjectArea("unknown")).toBe(false);
  });
});
