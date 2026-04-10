"use client";

import { Search, Sparkles, X } from "lucide-react";

type UniverseMainSearchResult = {
  id: string;
  label: string;
  slug: string;
  kind: "World" | "Location" | "Lorebook" | "Novel";
  subkind?: string;
  href: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  results: UniverseMainSearchResult[];
  loading?: boolean;
  onClear: () => void;
  onSelectResult: (result: UniverseMainSearchResult) => void;
};

export default function UniverseSearchBar({
  value,
  onChange,
  results,
  loading = false,
  onClear,
  onSelectResult,
}: Props) {
  const showResults = value.trim().length > 0;

  return (
    <div className="relative z-[220] mx-auto w-full max-w-5xl">
      <div className="absolute inset-0 rounded-[30px] bg-cyan-400/10 blur-2xl" />

      <div className="relative rounded-[30px] border border-cyan-300/20 bg-[#07111f]/80 px-6 py-5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.12)]">
        <div className="flex items-center gap-4">
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
        </div>

        {showResults ? (
          <div className="mt-4 overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1020]/98 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            {loading ? (
              <div className="px-4 py-6 text-sm text-white/50">Searching...</div>
            ) : results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {results.map((result) => {
                  const accent =
                    result.kind === "World"
                      ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
                      : result.kind === "Location"
                        ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"
                        : result.kind === "Lorebook"
                          ? "border-sky-300/20 bg-sky-400/10 text-sky-100"
                          : "border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100";

                  return (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => onSelectResult(result)}
                      className="flex w-full items-center justify-between gap-4 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {result.label}
                        </div>

                        <div className="mt-1 flex flex-wrap gap-2">
                          <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                            {result.kind}
                          </span>

                          {result.subkind ? (
                            <span className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                              {result.subkind}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div
                        className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${accent}`}
                      >
                        Open
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-6 text-sm text-white/50">No result found.</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}