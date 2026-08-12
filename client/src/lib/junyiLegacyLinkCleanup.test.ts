import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("均一舊式連結清理", () => {
  it("專攻區與親子共學頁不再指向已淘汰的英文泛用主題網址", () => {
    const projectRoot = process.cwd();
    const pages = [
      "client/src/pages/SpecialtyPage.tsx",
      "client/src/pages/ParentPage.tsx",
    ];

    for (const page of pages) {
      const content = readFileSync(resolve(projectRoot, page), "utf8");
      expect(content).not.toContain("topics/english-topic");
      expect(content).toContain("getJunyiSubjectResources");
    }
  });
});
