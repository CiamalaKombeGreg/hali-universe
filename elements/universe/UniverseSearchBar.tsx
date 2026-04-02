"use client";

import { Search, Sparkles } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function UniverseSearchBar({ value, onChange }: Props) {
  return (
    <div className="relative z-20 mx-auto w-full max-w-5xl">
      <div className="absolute inset-0 rounded-[30px] bg-cyan-400/10 blur-2xl" />

      <div className="relative flex items-center gap-4 rounded-[30px] border border-cyan-300/20 bg-[#07111f]/80 px-6 py-5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.12)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
          <Sparkles className="h-5 w-5" />
        </div>

        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <Search className="h-5 w-5 text-cyan-100/60" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search universes, locations, lore books, novels..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
        </div>
      </div>
    </div>
  );
}