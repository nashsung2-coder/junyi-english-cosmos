import { describe, expect, it } from "vitest";
import { applyPetEffect } from "./petShop";

describe("pet status effects", () => {
  it("updates multiple pet needs while constraining every value to the valid range", () => {
    expect(applyPetEffect({ hunger: 90, happiness: 4, energy: 97, level: 2 }, { hunger: 20, happiness: -10, energy: 12 }))
      .toEqual({ hunger: 100, happiness: 0, energy: 100, level: 2 });
  });
});
