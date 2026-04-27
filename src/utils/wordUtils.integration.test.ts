import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { defaultFilters, unscramble } from "./wordUtils";

describe("generated dictionary integration", () => {
  it("uses the generated word list for real matches", () => {
    const wordListPath = path.resolve(process.cwd(), "public", "word-list.json");
    const contents = fs.readFileSync(wordListPath, "utf8");
    const words = JSON.parse(contents) as string[];

    const results = unscramble("react", words, defaultFilters);

    expect(results).toContain("crate");
    expect(results).toContain("trace");
    expect(results).toContain("react");
    expect(results[0].length).toBeGreaterThanOrEqual(results[results.length - 1].length);
  });
});
