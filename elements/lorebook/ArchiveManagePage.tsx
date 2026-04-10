"use client";

import Link from "next/link";
import { ArrowLeft, FilePenLine, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

type ArchiveSearchResult = {
  id: string;
  label: string;
  slug: string;
  kind: "Lorebook" | "Novel";
  visibilityStatus?: "DRAFT" | "PUBLISHED";
};

export default function ArchiveManagePage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);
  const [results, setResults] = useState<ArchiveSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function run() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `/api/archive/manage-search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          setResults([]);
          return;
        }

        const data = await response.json();
        setResults(data.results ?? []);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [query]);

  const emptyState = useMemo(() => {
    if (!query.trim()) {
      return "Search for an existing lorebook or novel.";
    }

    if (loading) {
      return "Searching archive...";
    }

    return "No archive entry found.";
  }, [loading, query]);

  return (
    <main className="relative flex min-h-screen bg-[#050712] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_24%),linear-gradient(to_bottom,#050712,#0a1020,#060816)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1650px] flex-col gap-8 px-6 py-6 md:px-10">
          <div className="flex items-center justify-between">
            <Link
              href="/universe/lorebook"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return
            </Link>
          </div>

          <section className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-fuchsia-100">
              <FilePenLine className="h-4 w-4" />
              Archive Editing Hub
            </div>

            <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">
              Edit Existing Lorebooks & Novels
            </h1>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/65">
              Search an archive entry, then open its edit version directly. Lorebooks
              go to their standard editor. Novels open their editor with chapter
              management.
            </p>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Archive Search</h2>

              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/10"
              >
                {open ? "Close Popup" : "Open Popup"}
              </button>
            </div>

            <div className="mt-6 rounded-[26px] border border-white/10 bg-[#0b1020]/75 p-6">
              <div className="text-sm leading-7 text-white/60">
                Search for an existing archive entry. Clicking a result opens the
                editing flow, not the public page.
              </div>

              {open ? (
                <div className="mt-6 rounded-[26px] border border-white/10 bg-black/25 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1020]/90 px-4 py-4">
                    <Search className="h-5 w-5 text-white/45" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search lorebooks or novels..."
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
                    />
                    {query ? (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="rounded-full p-1 text-white/45 transition hover:bg-white/10 hover:text-white/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-4 overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1020]/98">
                    {results.length > 0 ? (
                      <div className="max-h-[420px] overflow-y-auto">
                        {results.map((result) => {
                          const href =
                            result.kind === "Lorebook"
                              ? `/universe/lorebook/edit/lorebook/${result.slug}`
                              : `/universe/lorebook/edit/novel/${result.slug}`;

                          const accent =
                            result.kind === "Lorebook"
                              ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
                              : "border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100";

                          return (
                            <Link
                              key={result.id}
                              href={href}
                              className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-4 transition hover:bg-white/5"
                            >
                              <div>
                                <div className="text-sm font-semibold text-white">
                                  {result.label}
                                </div>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                                    {result.kind}
                                  </span>
                                  {result.visibilityStatus ? (
                                    <span className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                                      {result.visibilityStatus}
                                    </span>
                                  ) : null}
                                </div>
                              </div>

                              <div
                                className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${accent}`}
                              >
                                Edit
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-sm text-white/50">{emptyState}</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 px-5 py-6 text-sm text-white/50">
                  Popup closed.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}