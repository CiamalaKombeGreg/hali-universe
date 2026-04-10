"use client";

import { Search, Sparkles, Globe2, MapPinned, Orbit, BookOpenText, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

type WikiSearchResult = {
  id: string;
  label: string;
  slug: string;
  kind: "World" | "Location";
  subkind?: string;
  href: string;
};

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

export default function UniverseWikiHomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WikiSearchResult[]>([]);
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
          `/api/universe-wiki-search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          setResults([]);
          return;
        }

        const data = await response.json();
        setResults(data.results ?? []);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [query]);

  function handleSelectResult(result: WikiSearchResult) {
    router.push(result.href);
    setQuery("");
    setResults([]);
  }

  function handleClear() {
    setQuery("");
    setResults([]);
  }

  const showResults = query.trim().length > 0;

  return (
    <main className="relative flex min-h-screen bg-[#02040b] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%),linear-gradient(to_bottom,#02040b,#040816,#02040b)]" />

        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute left-[8%] top-[12%] h-1 w-1 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
          <div className="absolute left-[18%] top-[28%] h-1.5 w-1.5 rounded-full bg-cyan-200/80 shadow-[0_0_12px_rgba(103,232,249,0.8)] animate-pulse" />
          <div className="absolute left-[32%] top-[18%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[44%] top-[34%] h-1 w-1 rounded-full bg-fuchsia-200/70 animate-pulse" />
          <div className="absolute left-[58%] top-[20%] h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[70%] top-[12%] h-1 w-1 rounded-full bg-cyan-200/80 animate-pulse" />
          <div className="absolute left-[82%] top-[26%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[12%] top-[62%] h-1 w-1 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[24%] top-[74%] h-1.5 w-1.5 rounded-full bg-indigo-200/70 animate-pulse" />
          <div className="absolute left-[39%] top-[66%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[55%] top-[78%] h-1 w-1 rounded-full bg-cyan-100/70 animate-pulse" />
          <div className="absolute left-[68%] top-[64%] h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[78%] top-[82%] h-1 w-1 rounded-full bg-fuchsia-200/70 animate-pulse" />
          <div className="absolute left-[90%] top-[58%] h-1 w-1 rounded-full bg-white/60 animate-pulse" />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-[16%] top-[24%] h-[260px] w-[260px] rounded-full border border-cyan-300/10" />
          <div className="absolute left-[20%] top-[28%] h-[180px] w-[180px] rounded-full border border-white/10" />
          <div className="absolute right-[14%] top-[18%] h-[220px] w-[220px] rounded-full border border-fuchsia-300/10" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-6 py-6 md:px-10">
          <section className="rounded-[34px] border border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-sm">
            <div className="grid gap-8 xl:grid-cols-[1fr_560px] xl:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                  <Orbit className="h-4 w-4" />
                  Universe Public Wiki
                </div>

                <h1 className="mt-5 text-4xl font-black text-white md:text-6xl">
                  Explore Worlds, Realms, and Locations
                </h1>

                <p className="mt-5 max-w-4xl text-sm leading-8 text-white/68 md:text-base">
                  This wiki is the public-facing archive for universe entries and locations.
                  It allows readers, guests, and future collaborators to search for world
                  structures, discover places, and navigate the cosmology of your fictional
                  settings through clean, readable wiki pages.
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
                      placeholder="Search worlds or locations..."
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
                    />
                    {query ? (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="rounded-full p-1 text-white/45 transition hover:bg-white/10 hover:text-white/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  {showResults ? (
                    <div className="mt-3 overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1020]/98 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                      {loading ? (
                        <div className="px-4 py-6 text-sm text-white/50">
                          Searching...
                        </div>
                      ) : results.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                          {results.map((result) => {
                            const accent =
                              result.kind === "World"
                                ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
                                : "border-emerald-300/20 bg-emerald-400/10 text-emerald-100";

                            return (
                              <button
                                key={result.id}
                                type="button"
                                onClick={() => handleSelectResult(result)}
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
                        <div className="px-4 py-6 text-sm text-white/50">
                          No result found.
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[32px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
                  <BookOpenText className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-white">What this wiki is for</h2>
              </div>

              <div className="space-y-4 text-sm leading-8 text-white/72">
                <p>
                  The Universe Wiki is the reading layer of your world database. It is not
                  the creation interface, but the place where completed public information
                  can be explored through stylish and structured pages.
                </p>

                <p>
                  It is designed to help visitors understand how your fictional settings are
                  organized: universes, series collections, continuities, installments,
                  crossovers, original creations, and the locations contained inside them.
                </p>

                <p>
                  As the system grows, this page becomes the main discovery point for public
                  world knowledge before users move deeper into individual wiki pages.
                </p>
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <div className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                Discovery Axes
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/8 p-4">
                  <div className="text-sm font-black text-white">World Entries</div>
                  <p className="mt-2 text-sm leading-7 text-white/68">
                    Search universes, series collections, continuities, installments,
                    spinoffs, fanmade works, original creations, and crossovers.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/8 p-4">
                  <div className="text-sm font-black text-white">Locations</div>
                  <p className="mt-2 text-sm leading-7 text-white/68">
                    Search places nested inside those worlds: planets, cities, realms,
                    dimensions, structures, and conceptual spaces.
                  </p>
                </div>

                <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-400/8 p-4">
                  <div className="text-sm font-black text-white">Readable Wiki Pages</div>
                  <p className="mt-2 text-sm leading-7 text-white/68">
                    Results lead to dedicated view pages, not editing interfaces,
                    making this section ideal for visitors and guests.
                  </p>
                </div>
              </div>
            </section>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <InfoCard icon={Globe2} title="World Navigation">
              Browse large-scale structures such as universes, official series,
              alternate continuities, installments, and crossover constructs.
            </InfoCard>

            <InfoCard icon={MapPinned} title="Location Discovery">
              Explore nested places and sub-locations across your fictional cosmology,
              from planets and cities to abstract dimensions and conceptual realms.
            </InfoCard>

            <InfoCard icon={Sparkles} title="Guest-Friendly Archive">
              This page is meant to be readable and intuitive for visitors. It acts as a
              clean search-and-discovery shell before entering specific wiki pages.
            </InfoCard>
          </section>
        </div>
      </div>
    </main>
  );
}