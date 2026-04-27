export interface FilterOptions {
  minLength: number;
  maxLength: number;
  startsWith: string;
  endsWith: string;
  contains: string;
}

export const defaultFilters: FilterOptions = {
  minLength: 2,
  maxLength: 15,
  startsWith: "",
  endsWith: "",
  contains: "",
};

export function normalizeLetters(value: string): string {
  return value.toLowerCase().replace(/[^a-z?*]/g, "");
}

function getLetterCount(word: string): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const ch of word.toLowerCase()) {
    counts[ch] = (counts[ch] || 0) + 1;
  }

  return counts;
}

function canFormWord(
  inputCounts: Record<string, number>,
  wordCounts: Record<string, number>,
  wildcards: number,
): boolean {
  let remainingWildcards = wildcards;

  for (const ch in wordCounts) {
    const available = inputCounts[ch] || 0;
    const needed = wordCounts[ch];

    if (available >= needed) {
      continue;
    }

    const deficit = needed - available;
    if (remainingWildcards < deficit) {
      return false;
    }

    remainingWildcards -= deficit;
  }

  return true;
}

export function unscramble(
  input: string,
  wordList: readonly string[],
  filters: FilterOptions = defaultFilters,
): string[] {
  const cleaned = normalizeLetters(input);
  if (!cleaned) return [];

  const wildcardCount = (cleaned.match(/[?*]/g) || []).length;
  const normalizedLetters = cleaned.replace(/[?*]/g, "");
  const inputCounts = getLetterCount(normalizedLetters);
  const results: string[] = [];
  const startsWith = filters.startsWith.toLowerCase();
  const endsWith = filters.endsWith.toLowerCase();
  const contains = filters.contains.toLowerCase();

  for (const word of wordList) {
    const w = word.toLowerCase();
    if (w.length < filters.minLength || w.length > filters.maxLength) continue;
    if (startsWith && !w.startsWith(startsWith)) continue;
    if (endsWith && !w.endsWith(endsWith)) continue;
    if (contains && !w.includes(contains)) continue;
    if (canFormWord(inputCounts, getLetterCount(w), wildcardCount)) {
      results.push(word);
    }
  }

  results.sort((a, b) => {
    if (a.length !== b.length) return b.length - a.length;
    return a.localeCompare(b);
  });

  return [...new Set(results)];
}

export function groupByLength(words: readonly string[]): Record<number, string[]> {
  const groups: Record<number, string[]> = {};

  for (const word of words) {
    const len = word.length;
    if (!groups[len]) groups[len] = [];
    groups[len].push(word);
  }

  return groups;
}

export const exampleInputs = [
  { letters: "listen", label: "Listen" },
  { letters: "c?rte", label: "C?rte" },
  { letters: "earth", label: "Earth" },
  { letters: "rescue", label: "Rescue" },
  { letters: "heart", label: "Heart" },
  { letters: "triangle", label: "Triangle" },
  { letters: "astronomer", label: "Astronomer" },
  { letters: "teacher", label: "Teacher" },
];
