import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FilterOptions, defaultFilters } from "../utils/wordUtils";

interface FiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  resultCount: number;
}

export function Filters({ filters, onFiltersChange, resultCount }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const update = (key: keyof FilterOptions, value: string | number) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const reset = () => onFiltersChange(defaultFilters);

  const hasActiveFilters =
    filters.minLength !== defaultFilters.minLength ||
    filters.maxLength !== defaultFilters.maxLength ||
    filters.startsWith !== "" ||
    filters.endsWith !== "" ||
    filters.contains !== "";

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-amber-700 transition-colors hover:text-amber-800"
        >
          <Settings className="h-4 w-4" />
          Filters
          {hasActiveFilters ? (
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          ) : null}
        </button>
        <span className="text-sm text-stone-500">
          {resultCount} word{resultCount !== 1 ? "s" : ""} found
        </span>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-1 block text-xs text-stone-500">Min Length</Label>
                  <Input
                    type="number"
                    min={2}
                    max={15}
                    value={filters.minLength}
                    onChange={(e) => update("minLength", parseInt(e.target.value, 10) || 2)}
                    className="h-10 border-stone-300 bg-white text-stone-900"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-xs text-stone-500">Max Length</Label>
                  <Input
                    type="number"
                    min={2}
                    max={15}
                    value={filters.maxLength}
                    onChange={(e) => update("maxLength", parseInt(e.target.value, 10) || 15)}
                    className="h-10 border-stone-300 bg-white text-stone-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div>
                  <Label className="mb-1 block text-xs text-stone-500">Starts With</Label>
                  <Input
                    type="text"
                    maxLength={4}
                    value={filters.startsWith}
                    onChange={(e) => update("startsWith", e.target.value.replace(/[^a-z]/gi, ""))}
                    placeholder="pre"
                    className="h-10 border-stone-300 bg-white text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-xs text-stone-500">Ends With</Label>
                  <Input
                    type="text"
                    maxLength={4}
                    value={filters.endsWith}
                    onChange={(e) => update("endsWith", e.target.value.replace(/[^a-z]/gi, ""))}
                    placeholder="ing"
                    className="h-10 border-stone-300 bg-white text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-xs text-stone-500">Contains</Label>
                  <Input
                    type="text"
                    maxLength={4}
                    value={filters.contains}
                    onChange={(e) => update("contains", e.target.value.replace(/[^a-z]/gi, ""))}
                    placeholder="art"
                    className="h-10 border-stone-300 bg-white text-stone-900 placeholder:text-stone-400"
                  />
                </div>
              </div>
              {hasActiveFilters ? (
                <Button
                  type="button"
                  onClick={reset}
                  variant="ghost"
                  size="sm"
                  className="w-full text-stone-600 hover:text-amber-700"
                >
                  <X className="mr-1 h-3 w-3" />
                  Reset Filters
                </Button>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
