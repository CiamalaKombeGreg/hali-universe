"use client";

import Link from "next/link";
import {
  BookOpen,
  Feather,
  FilePenLine,
  Library,
  NotebookPen,
  Search,
  Sparkles,
  ScrollText,
} from "lucide-react";
import { useEffect, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-black text-white">{title}</h3>
      </div>

      <div className="text-sm leading-7 text-white/70">{children}</div>
    </section>
  );
}

function BookActionCard({
  href,
  title,
  description,
  accent,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  accent: "cyan" | "fuchsia";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const accentClasses =
    accent === "cyan"
      ? {
          glow: "bg-cyan-400/15",
          border: "border-cyan-300/20",
          badge: "bg-cyan-400/10 text-cyan-100 border-cyan-300/20",
          hover: "hover:border-cyan-300/35 hover:bg-cyan-400/5",
        }
      : {
          glow: "bg-fuchsia-400/15",
          border: "border-fuchsia-300/20",
          badge: "bg-fuchsia-400/10 text-fuchsia-100 border-fuchsia-300/20",
          hover: "hover:border-fuchsia-300/35 hover:bg-fuchsia-400/5",
        };

  return (
    <Link
      href={href}
      className={`group relative block min-h-[420px] overflow-hidden rounded-[34px] border ${accentClasses.border} bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 transition ${accentClasses.hover}`}
    >
      <div className={`absolute inset-0 opacity-70 blur-3xl ${accentClasses.glow}`} />

      <div className="relative z-10 flex h-full flex-col">
        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] ${accentClasses.badge}`}
        >
          <Icon className="h-4 w-4" />
          Library Action
        </div>

        <div className="mt-8 flex flex-1 items-center justify-center">
          <div className="relative h-[220px] w-[160px] rounded-r-[18px] rounded-l-[10px] border border-white/10 bg-[linear-gradient(135deg,#1b2133,#101522_55%,#0b1020)] shadow-[18px_18px_40px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-y-0 left-0 w-3 rounded-l-[10px] bg-white/10" />
            <div className="absolute inset-y-4 left-5 w-[2px] bg-white/10" />
            <div className="absolute inset-x-6 top-8 h-[2px] bg-white/10" />
            <div className="absolute inset-x-6 top-16 h-[2px] bg-white/10" />
            <div className="absolute inset-x-6 top-24 h-[2px] bg-white/10" />

            <div className="absolute inset-x-0 top-[42%] flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white/90 shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                <Icon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-black text-white">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-white/65">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function MiniRule({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
        {title}
      </div>
      <p className="mt-2 text-sm leading-7 text-white/70">{text}</p>
    </div>
  );
}

export default function LorebookMainPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { id: string; label: string; kind: string; href: string }[]
  >([]);

  useEffect(() => {
    async function run() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const response = await fetch(
        `/api/archive/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        setResults([]);
        return;
      }

      const data = await response.json();
      setResults(data.results ?? []);
    }

    void run();
  }, [query]);
  return (
    <main className="relative flex min-h-screen bg-[#050712] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_24%),linear-gradient(to_bottom,#050712,#0a1020,#060816)]" />

        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(to_top,rgba(27,18,10,0.9),rgba(27,18,10,0.2),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[repeating-linear-gradient(90deg,rgba(96,64,32,0.18)_0px,rgba(96,64,32,0.18)_18px,rgba(54,34,18,0.18)_18px,rgba(54,34,18,0.18)_28px)]" />
          <div className="absolute inset-x-12 bottom-[20%] h-[2px] bg-amber-200/10" />
          <div className="absolute inset-x-16 bottom-[34%] h-[2px] bg-amber-200/10" />
          <div className="absolute inset-x-8 bottom-[48%] h-[2px] bg-amber-200/10" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-6 py-6 md:px-10">
          <section className="rounded-[34px] border border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-sm">
            <div className="grid gap-6 xl:grid-cols-[1fr_560px] xl:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                  <Library className="h-4 w-4" />
                  Lorebook Library
                </div>

                <h1 className="mt-5 text-4xl font-black text-white md:text-6xl">
                  Lorebooks & Novels
                </h1>

                <p className="mt-5 max-w-4xl text-sm leading-8 text-white/68 md:text-base">
                  This archive stores expanded world information, narrative material,
                  and story-driven written content. Use lorebooks to document
                  structured background knowledge, and novels to build full written
                  stories with chapters, covers, summaries, and installment logic.
                </p>
              </div>

              <div className="relative z-20">
                <div className="rounded-[28px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1020]/90 px-4 py-4">
                    <Search className="h-5 w-5 text-white/45" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search lorebooks or novels..."
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
                    />
                  </div>

                  {query.trim().length > 0 && results.length > 0 ? (
                    <div className="mt-3 overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1020]/98 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                      <div className="max-h-80 overflow-y-auto">
                        {results.map((result) => (
                          <Link
                            key={result.id}
                            href={result.href}
                            className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5"
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
                              Open
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent)]" />

            <div className="relative z-10 grid gap-8 xl:grid-cols-2">
              <BookActionCard
                href="/universe/lorebook/create"
                title="Create Lorebooks / Novels"
                description="Open the writing flow to create a new lorebook or define a new novel. This is where written archive content begins."
                accent="cyan"
                icon={NotebookPen}
              />

              <BookActionCard
                href="/universe/lorebook/manage"
                title="Edit Existing Archives"
                description="Search, open, and revise existing lorebooks or novels. This section will later handle update, deletion, and linked asset management."
                accent="fuchsia"
                icon={FilePenLine}
              />
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <InfoCard icon={BookOpen} title="Lorebook Logic">
              Lorebooks are structured supplemental entries linked to world layers such
              as universes, series collections, continuities, installments, fanmade
              works, original creations, crossovers, locations, and later characters.
              They are not stories by themselves: they are organized knowledge files.
            </InfoCard>

            <InfoCard icon={ScrollText} title="Novel Logic">
              Novels are narrative works. They can be completely independent or tied to
              an installment. A novel starts with a presentation page including cover,
              author, summary, tags, and automatic creation date, then expands through
              editable chapters.
            </InfoCard>

            <InfoCard icon={Sparkles} title="Archive Linking">
              Both systems are meant to connect your written content to the rest of the
              database. Lorebooks especially act as attached documents for worlds and,
              later, characters. Novels can also live independently when they are not
              bound to a world structure.
            </InfoCard>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
                  <NotebookPen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-white">How Lorebooks Work</h2>
              </div>

              <div className="space-y-4">
                <MiniRule
                  title="Core identity"
                  text="A lorebook needs a title, a short description, and structured sections."
                />
                <MiniRule
                  title="Section content"
                  text="Each lorebook section can contain text and images. The text follows the rich text logic you already built, with bold, italic, underline, internal links, and now color styling."
                />
                <MiniRule
                  title="Linked assets"
                  text="At the bottom of the lorebook, the attached assets are displayed: worlds, locations, and later characters."
                />
              </div>
            </section>

            <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100">
                  <Feather className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-white">How Novels Work</h2>
              </div>

              <div className="space-y-4">
                <MiniRule
                  title="Novel pre-page"
                  text="Before writing chapters, a novel needs a cover, author name, summary, custom tags, and an automatically added creation date."
                />
                <MiniRule
                  title="Chapter structure"
                  text="Each chapter has a cover, a main title, optional subtitles, rich text blocks, and dialogue blocks automatically wrapped in quotation marks."
                />
                <MiniRule
                  title="Novel positioning"
                  text="A novel can be fully standalone or tied to an installment, depending on whether it is meant to function as an independent story or as a chaptered narrative inside a wider world structure."
                />
              </div>
            </section>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white">System Overview</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[24px] border border-cyan-300/15 bg-cyan-400/8 p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                  Lorebook
                </div>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Structured additional information linked to world assets.
                </p>
              </div>

              <div className="rounded-[24px] border border-fuchsia-300/15 bg-fuchsia-400/8 p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-fuchsia-100">
                  Novel
                </div>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  A story object with a pre-page and expandable chapter content.
                </p>
              </div>

              <div className="rounded-[24px] border border-violet-300/15 bg-violet-400/8 p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
                  Linked archive
                </div>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Can attach to universes, collections, continuities, installments,
                  locations, and later characters.
                </p>
              </div>

              <div className="rounded-[24px] border border-amber-300/15 bg-amber-400/8 p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-100">
                  Chapter flow
                </div>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Chapters support draft/published logic and simpler writing blocks.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}