import { motion } from "framer-motion";
import { groupByLength } from "../utils/wordUtils";
import { ResultWord } from "./ResultWord";

interface ResultsPanelProps {
  results: string[];
  inputLetters: string;
}

export function ResultsPanel({ results, inputLetters }: ResultsPanelProps) {
  if (!inputLetters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-stone-500">
        <div className="mb-4 text-6xl opacity-30">A-Z</div>
        <p className="text-lg font-medium">Enter scrambled letters above</p>
        <p className="mt-1 text-sm">Find all possible words hidden in your letters</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-stone-500">
        <div className="mb-4 text-6xl opacity-30">?</div>
        <p className="text-lg font-medium">No words found</p>
        <p className="mt-1 text-sm">Try different letters or adjust your filters</p>
      </div>
    );
  }

  const groups = groupByLength(results);
  const lengths = Object.keys(groups)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <motion.div
      key={inputLetters}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      {lengths.map((len) => (
        <div key={len}>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400">
              {len} {len === 1 ? "letter" : "letters"}
            </span>
            <span className="text-xs text-stone-500">
              {groups[len].length} word{groups[len].length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {groups[len].map((word, i) => (
              <ResultWord
                key={word}
                word={word}
                index={i}
                inputLetters={inputLetters}
              />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
