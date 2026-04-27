import { motion } from "framer-motion";
import { useState } from "react";

interface ResultWordProps {
  word: string;
  index: number;
  inputLetters: string;
}

export function ResultWord({ word, index, inputLetters }: ResultWordProps) {
  const [copied, setCopied] = useState(false);
  const inputSet = new Set(inputLetters.toLowerCase().split(""));
  const isExactAnagram = word.length === inputLetters.replace(/[^a-z]/gi, "").length;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(word.toUpperCase());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.015, 0.6), duration: 0.25 }}
      onClick={() => void handleCopy()}
      className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
        isExactAnagram
          ? "bg-amber-500 text-stone-900 shadow-sm"
          : "bg-stone-800 text-amber-50 hover:bg-stone-700"
      }`}
      title={copied ? "Copied" : isExactAnagram ? "Full anagram. Click to copy." : `Made from ${inputLetters}. Click to copy.`}
    >
      <span className="flex items-center gap-2">
        <span>
          {word.toUpperCase().split("").map((ch, i) => (
            <span key={`${ch}-${i}`} className={inputSet.has(ch.toLowerCase()) ? "" : "opacity-60"}>
              {ch}
            </span>
          ))}
        </span>
        {copied ? <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Copied</span> : null}
      </span>
    </motion.div>
  );
}
