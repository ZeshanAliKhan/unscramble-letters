import { describe, expect, it } from "vitest";
import { defaultFilters, unscramble } from "./wordUtils";

const sampleWords = ["listen", "silent", "enlist", "tinsel", "inlets", "tile", "line", "lint"];

describe("unscramble", () => {
  it("finds exact anagram matches", () => {
    const results = unscramble("listen", sampleWords, defaultFilters);
    expect(results.slice(0, 5)).toEqual(["enlist", "inlets", "listen", "silent", "tinsel"]);
  });

  it("supports wildcard characters", () => {
    const results = unscramble("c?rte", ["crate", "cater", "trace", "react", "cart"], defaultFilters);
    expect(results).toEqual(["cater", "crate", "react", "trace", "cart"]);
  });

  it("applies prefix, suffix, and contains filters", () => {
    const results = unscramble("triangle", ["altering", "integral", "alerting", "ring", "giant"], {
      ...defaultFilters,
      minLength: 4,
      maxLength: 15,
      startsWith: "al",
      endsWith: "ng",
      contains: "ert",
    });

    expect(results).toEqual(["alerting"]);
  });

  it("sorts longer matches before shorter ones", () => {
    const results = unscramble("crate", ["crate", "trace", "care", "car", "cat"], defaultFilters);
    expect(results).toEqual(["crate", "trace", "care", "car", "cat"]);
  });
});
