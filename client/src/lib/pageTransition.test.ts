import { describe, expect, it } from "vitest";
import { getPageTransition } from "./pageTransition";

describe("page transition accessibility", () => {
  it("removes enter and exit motion when the user prefers reduced motion", () => {
    expect(getPageTransition(true)).toEqual({
      initial: false,
      animate: { opacity: 1, y: 0 },
      exit: undefined,
      transition: { duration: 0 },
    });
  });

  it("keeps the short transform-and-opacity transition for standard motion", () => {
    expect(getPageTransition(false)).toEqual({
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -7 },
      transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] },
    });
  });
});
