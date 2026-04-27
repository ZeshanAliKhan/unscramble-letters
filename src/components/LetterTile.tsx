import { motion } from "framer-motion";

interface LetterTileProps {
  letter: string;
  index: number;
  onRemove: (index: number) => void;
}

export function LetterTile({ letter, index, onRemove }: LetterTileProps) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, delay: index * 0.03 }}
      onClick={() => onRemove(index)}
      className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-lg font-bold text-stone-900 shadow-md transition-colors hover:bg-amber-400 hover:shadow-lg active:bg-amber-300 select-none sm:h-12 sm:w-12 sm:text-xl"
      aria-label={`Remove letter ${letter.toUpperCase()}`}
    >
      {letter.toUpperCase()}
    </motion.button>
  );
}
