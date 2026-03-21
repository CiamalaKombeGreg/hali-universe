"use client";

import { Search, Sparkles } from "lucide-react";

export default function TieringSearchBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/8 px-5 py-4 backdrop-blur-xl shadow-[0_0_24px_rgba(139,92,246,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_22%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.18),transparent_24%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.12),transparent_22%)]" />

      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100">
            <Sparkles className="h-3.5 w-3.5" />
            Tiering Search
          </div>

          <h2 className="text-xl font-black text-white md:text-2xl">
            Search powers, stats, tiers, and abilities
          </h2>

          <p className="mt-1 max-w-xl text-xs leading-6 text-white/60 md:text-sm">
            Fast access to scaling information and recorded systems.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-2.5">
            <Search className="h-4.5 w-4.5 text-white/50" />
            <input
              type="text"
              placeholder="Search stats, powers, abilities, tiers..."
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}