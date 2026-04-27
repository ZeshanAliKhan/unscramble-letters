import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, Sparkles, Wand2, X } from "lucide-react";
import { Header } from "./components/Header";
import { LetterTile } from "./components/LetterTile";
import { Filters } from "./components/Filters";
import { ResultsPanel } from "./components/ResultsPanel";
import { SEOContent } from "./components/SEOContent";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { getWordList, preloadWordList } from "./data/wordListClient";
import {
  defaultFilters,
  exampleInputs,
  FilterOptions,
  normalizeLetters,
  unscramble,
} from "./utils/wordUtils";

const MAX_INPUT_LENGTH = 15;

export default function App() {
  const [inputLetters, setInputLetters] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [isWordListReady, setIsWordListReady] = useState(false);

  useEffect(() => {
    preloadWordList();
    void getWordList()
      .then(() => setIsWordListReady(true))
      .catch(() => {
        setIsWordListReady(false);
        setLoadError("The full word list could not be loaded, so the fallback dictionary will be used.");
      });
  }, []);

  const sanitizedInput = useMemo(() => normalizeLetters(inputLetters).slice(0, MAX_INPUT_LENGTH), [inputLetters]);

  const handleSearch = useCallback(async () => {
    if (!sanitizedInput) {
      setResults([]);
      setHasSearched(true);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      setLoadError("");
      const wordList = await getWordList();
      setIsWordListReady(true);
      const nextResults = unscramble(sanitizedInput, wordList, filters);
      setResults(nextResults);
    } catch (error) {
      console.error(error);
      setLoadError("The tool could not load the main word list right now. Try again in a moment.");
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [filters, sanitizedInput]);

  const handleRemoveLetter = useCallback(
    (index: number) => {
      const next = sanitizedInput.slice(0, index) + sanitizedInput.slice(index + 1);
      setInputLetters(next);
    },
    [sanitizedInput],
  );

  const handleExample = useCallback((letters: string) => {
    setInputLetters(letters);
    setResults([]);
    setHasSearched(false);
  }, []);

  const handleClear = useCallback(() => {
    setInputLetters("");
    setResults([]);
    setFilters(defaultFilters);
    setHasSearched(false);
    setLoadError("");
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <section
          id="unscramble-letters-tool"
          className="overflow-hidden rounded-[20px] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(28,25,23,0.08)]"
        >
          <div className="border-b border-stone-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white px-6 py-8 md:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Fast letter solver
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                  Turn scrambled letters into real words
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
                  Enter up to 15 letters, use <code className="rounded bg-white px-1.5 py-0.5 text-stone-800">?</code> or <code className="rounded bg-white px-1.5 py-0.5 text-stone-800">*</code> for wildcard tiles, and narrow the list with quick filters when you already know part of the answer.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-3 lg:min-w-[360px]">
                <div className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="font-semibold text-stone-900">Browser-based</div>
                  <div className="mt-1 text-xs leading-6">No signup, no install, no backend dependency.</div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="font-semibold text-stone-900">Wildcard support</div>
                  <div className="mt-1 text-xs leading-6">Use blank tile placeholders for missing letters.</div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="font-semibold text-stone-900">Ready for games</div>
                  <div className="mt-1 text-xs leading-6">Good for puzzles, anagrams, and letter practice.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-stone-200 p-6 md:p-8 lg:border-b-0 lg:border-r">
              <label htmlFor="letters-input" className="mb-2 block text-sm font-semibold text-stone-800">
                Enter your letters
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                  <input
                    id="letters-input"
                    type="text"
                    value={inputLetters}
                    onChange={(event) => setInputLetters(normalizeLetters(event.target.value).slice(0, MAX_INPUT_LENGTH))}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        void handleSearch();
                      }
                    }}
                    maxLength={MAX_INPUT_LENGTH}
                    placeholder="Example: listen or c?rte"
                    className="h-14 w-full rounded-2xl border border-stone-300 bg-stone-50 pl-12 pr-4 text-lg font-medium text-stone-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => void handleSearch()}
                  disabled={isSearching}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Wand2 className="h-4 w-4" />
                  {isSearching ? "Searching..." : "Unscramble"}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span>Only letters plus wildcard characters are allowed.</span>
                <span className="rounded-full bg-stone-100 px-2.5 py-1 font-medium text-stone-700">
                  {sanitizedInput.length}/{MAX_INPUT_LENGTH}
                </span>
                {isWordListReady ? (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">Full dictionary loaded</span>
                ) : (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 font-medium text-amber-700">Fallback dictionary active</span>
                )}
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-4">
                {sanitizedInput ? (
                  <AnimatePresence mode="popLayout">
                    <div className="flex flex-wrap gap-2">
                      {sanitizedInput.split("").map((letter, index) => (
                        <LetterTile key={`${letter}-${index}`} letter={letter} index={index} onRemove={handleRemoveLetter} />
                      ))}
                    </div>
                  </AnimatePresence>
                ) : (
                  <p className="text-sm leading-6 text-stone-500">
                    Your letters will appear here as removable tiles. Click a tile if you want to drop one letter and rerun the search.
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {exampleInputs.map((item) => (
                  <button
                    key={item.letters}
                    type="button"
                    onClick={() => handleExample(item.letters)}
                    className="rounded-full border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-amber-300 hover:text-amber-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <Filters filters={filters} onFiltersChange={setFilters} resultCount={results.length} />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
                <a
                  href="#unscramble-letters-faq"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
                >
                  Common questions
                </a>
              </div>

              {loadError ? (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                  {loadError}
                </div>
              ) : null}
            </div>

            <div className="bg-stone-950 p-6 text-amber-50 md:p-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Results</div>
                  <div className="mt-1 text-sm text-stone-300">
                    {hasSearched
                      ? `Showing matches for ${sanitizedInput.toUpperCase() || "your letters"}`
                      : "Run a search to see grouped words"}
                  </div>
                </div>
                <div className="rounded-full border border-stone-700 px-3 py-1 text-xs font-medium text-stone-300">
                  {results.length} result{results.length === 1 ? "" : "s"}
                </div>
              </div>
              <ResultsPanel results={results} inputLetters={sanitizedInput} />
            </div>
          </div>
        </section>

        <div className="my-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Use wildcards smartly</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              A wildcard expands the result set fast. Start without one if you already know most letters, then add a blank tile only when the list feels too narrow.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Trim your results</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              If you know the answer starts with a prefix or ends with a suffix, use the filters first. It saves time when you are checking longer lists.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Check the longer words first</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              This tool sorts longer matches first. That makes it easier to spot full anagrams and stronger word-game plays before you review short filler words.
            </p>
          </div>
        </div>

        <SEOContent />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
