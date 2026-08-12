import { describe, expect, it } from "vitest";
import { applyPetEffect, PET_ACTIONS } from "./petShop";

describe("pet status effects", () => {
  it("updates multiple pet needs while constraining every value to the valid range", () => {
    expect(applyPetEffect({ hunger: 90, happiness: 4, energy: 97, level: 2 }, { hunger: 20, happiness: -10, energy: 12 }))
      .toEqual({ hunger: 100, happiness: 0, energy: 100, level: 2 });
  });

  it("defines a meaningful state effect for every companion-harbor interaction", () => {
    for (const action of PET_ACTIONS) {
      const updated = applyPetEffect({ hunger: 60, happiness: 60, energy: 60, level: 1 }, action.effect);
      expect(updated).not.toEqual({ hunger: 60, happiness: 60, energy: 60, level: 1 });
    }
  });
});
