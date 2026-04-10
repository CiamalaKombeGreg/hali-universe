"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import UniverseSearchBar from "./UniverseSearchBar";
import CelestialNavBody from "./CelestialNavBody";

type UniverseMainSearchResult = {
  id: string;
  label: string;
  slug: string;
  kind: "World" | "Location" | "Lorebook" | "Novel";
  subkind?: string;
  href: string;
};

export default function UniversePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UniverseMainSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearchChange(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/universe-main-search?q=${encodeURIComponent(value)}`
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

  function handleSelectResult(result: UniverseMainSearchResult) {
    router.push(result.href);
    setQuery("");
    setResults([]);
  }

  function handleClear() {
    setQuery("");
    setResults([]);
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#02040b] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%),linear-gradient(to_bottom,#02040b,#040816,#02040b)]" />

        <div className="pointer-events-none absolute inset-0 opacity-70">
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

        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-10%] top-[20%] h-[2px] w-[60%] rotate-[8deg] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-[1px]" />
          <div className="absolute right-[-12%] top-[70%] h-[2px] w-[50%] -rotate-[10deg] bg-gradient-to-r from-transparent via-fuchsia-300/70 to-transparent blur-[1px]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1700px] flex-col px-6 py-6 md:px-10">
          <div className="mb-8">
            <UniverseSearchBar
              value={query}
              onChange={handleSearchChange}
              results={results}
              loading={loading}
              onClear={handleClear}
              onSelectResult={handleSelectResult}
            />
          </div>

          <div className="relative flex-1 overflow-hidden rounded-[36px] border border-white/8 bg-white/[0.02] backdrop-blur-[1px]">
            <div className="absolute left-[10%] top-[56%] h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute right-[14%] top-[24%] h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="absolute bottom-[12%] left-[44%] h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

            <CelestialNavBody
              kind="universe"
              title="Universe"
              description="Manage universes and locations."
              href="/universe/manage"
              size="large"
              className="left-[8%] top-[18%]"
            />

            <CelestialNavBody
              kind="wiki"
              title="Wiki"
              description="Open informational world pages."
              href="/universe/wiki"
              size="medium"
              className="right-[18%] top-[12%]"
            />

            <CelestialNavBody
              kind="lorebook"
              title="Lorebook"
              description="Create and organize lore books."
              href="/universe/lorebook"
              size="large"
              className="left-[34%] bottom-[10%]"
            />

            <CelestialNavBody
              kind="gallery"
              title="Gallery"
              description="A visual archive for future use."
              href="/universe/gallery"
              size="small"
              className="right-[10%] bottom-[18%]"
            />

            <div className="pointer-events-none absolute bottom-6 left-6 max-w-md rounded-[24px] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100/80">
                Universe Navigation Core
              </div>
              <p className="mt-2 text-sm leading-7 text-white/60">
                Celestial bodies will become your navigation hubs for universe management,
                lore books, world wiki pages, and gallery systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}