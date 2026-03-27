"use client";

import Link from "next/link";
import { ArrowLeft, CircleHelp, PenSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import { abilityHierarchy } from "./recordedAbilitiesData";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  type: string;
  family: string | null;
  hierarchyLevel: string | null;
  mainImage: {
    url: string;
  } | null;
};

const families = [
  { value: "", label: "All families" },
  { value: "BODY_ALTERATION", label: "Body Alteration" },
  { value: "EXTERNAL_MANIPULATION", label: "External Manipulation" },
  { value: "MENTAL_PERCEPTUAL", label: "Mental & Perceptual Powers" },
  { value: "SPIRITUAL_SOUL", label: "Spiritual & Soul Powers" },
  { value: "CREATION_SUMMONING", label: "Creation & Summoning" },
  { value: "CONCEPTUAL_ABSTRACT", label: "Conceptual & Abstract Powers" },
  { value: "METAPOWER", label: "Metapower" },
  { value: "DIMENSIONAL_MOVEMENT", label: "Dimensional & Movement Powers" },
  { value: "DEFENSE_NEGATION", label: "Defense & Negation" },
  { value: "UTILITY_SUPPORT", label: "Utility & Support" },
];

export default function ExistingAbilitySearchPage() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("");
  const [hierarchyLevel, setHierarchyLevel] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (query.trim()) params.set("q", query.trim());
        if (family) params.set("family", family);
        if (hierarchyLevel) params.set("hierarchyLevel", hierarchyLevel);

        const response = await fetch(`/api/ability-nodes/filter?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch ability nodes");
        }

        const data = await response.json();
        setResults(data.results ?? []);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }

    void run();

    return () => controller.abort();
  }, [query, family, hierarchyLevel]);

  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 py-6 md:px-10">
          <div className="flex items-center justify-between">
            <Link
              href="/tiering-power/recorded-abilities/edit"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-fuchsia-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Edit Hub
            </Link>
          </div>

          <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]">
            <div className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
              Existing Abilities
            </div>

            <h1 className="text-3xl font-black text-white md:text-4xl">
              Search and select existing ability nodes
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
              Search by name, family, and hierarchy level to find an ability or system.
            </p>

            <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
              <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-3">
                <Search className="h-5 w-5 text-white/45" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search abilities or systems..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
              </div>

              <select
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                className="form-select-dark w-full rounded-[22px] px-4 py-3 text-white outline-none"
              >
                {families.map((option) => (
                  <option key={option.value || "all"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={hierarchyLevel}
                onChange={(e) => setHierarchyLevel(e.target.value)}
                className="form-select-dark w-full rounded-[22px] px-4 py-3 text-white outline-none"
              >
                <option value="">All hierarchy levels</option>
                {abilityHierarchy.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-[30px] border border-white/15 bg-white/8 p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.10)]">
            {loading ? (
              <div className="flex min-h-[260px] items-center justify-center text-sm text-white/55">
                Loading results...
              </div>
            ) : results.length === 0 ? (
              <div className="flex min-h-[260px] items-center justify-center text-center text-lg font-semibold text-white/45">
                No abilities or systems selected
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        {item.mainImage?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.mainImage.url}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-white/35">
                            No img
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-lg font-black text-white">
                          {item.name}
                        </div>
                        <div className="truncate text-sm text-white/45">
                          {item.type}
                          {item.family ? ` • ${item.family}` : ""}
                          {item.hierarchyLevel ? ` • ${item.hierarchyLevel}` : ""}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tiering-power/recorded-abilities/edit/${item.slug}`}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100 transition hover:bg-cyan-400/20"
                        title="Open info page"
                      >
                        <CircleHelp className="h-5 w-5" />
                      </Link>

                      <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100 transition hover:bg-fuchsia-400/20"
                        title="Edit node"
                      >
                        <PenSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}