"use client";

import { Search, Sparkles, X } from "lucide-react";
import { ChangeEvent } from "react";
import type { SearchResultLike } from "./sharedSearchTypes";

type TieringSearchBannerProps = {
  badge?: string;
  title: string;
  description?: string;
  placeholder?: string;
  compact?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  results?: SearchResultLike[];
  onSelectResult?: (result: SearchResultLike) => void;
  onClear?: () => void;
};

export default function TieringSearchBanner({
  badge = "Tiering Search",
  title,
  description,
  placeholder = "Search stats, powers, abilities, tiers...",
  compact = false,
  value = "",
  onChange,
  results = [],
  onSelectResult,
  onClear,
}: TieringSearchBannerProps) {
  const showResults = value.trim().length > 0 && results.length > 0;

  return (
    <section
      className={`relative z-200 overflow-visible border border-white/15 bg-white/8 backdrop-blur-xl ${
        compact
          ? "rounded-3xl px-5 py-4 shadow-[0_0_24px_rgba(139,92,246,0.12)]"
          : "rounded-[30px] p-6 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
      }`}
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_22%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.18),transparent_24%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.12),transparent_22%)]" />

      <div className="relative z-210 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 text-cyan-100 ${
              compact
                ? "mb-2 px-3 py-1 text-[10px] tracking-[0.2em]"
                : "mb-3 px-4 py-1 text-xs tracking-[0.22em]"
            } font-semibold uppercase`}
          >
            <Sparkles className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            {badge}
          </div>

          <h2
            className={`font-black text-white ${
              compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
            }`}
          >
            {title}
          </h2>

          {description ? (
            <p
              className={`mt-2 max-w-2xl text-white/65 ${
                compact ? "text-xs leading-6 md:text-sm" : "text-sm leading-6 md:text-base"
              }`}
            >
              {description}
            </p>
          ) : null}
        </div>

        <div className={`relative z-220 w-full ${compact ? "max-w-md" : "max-w-xl"}`}>
          <div
            className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 ${
              compact ? "px-4 py-2.5" : "px-4 py-3"
            }`}
          >
            <Search className={`${compact ? "h-4.5 w-4.5" : "h-5 w-5"} text-white/50`} />
            <input
              type="text"
              value={value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange?.(event.target.value)
              }
              placeholder={placeholder}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
            {value ? (
              <button
                type="button"
                onClick={onClear}
                className="rounded-full p-1 text-white/45 transition hover:bg-white/10 hover:text-white/80"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {showResults ? (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-999 overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1020]/98 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              <div className="max-h-80 overflow-y-auto">
                {results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => onSelectResult?.(result)}
                    className="flex w-full items-center justify-between gap-4 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {result.label}
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/45">
                        {result.kind}
                      </div>
                    </div>

                    <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100">
                      Go
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}