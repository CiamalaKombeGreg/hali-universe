"use client";

import { useEffect, useState } from "react";
import SectionCard from "@/elements/ui/SectionCard";

type VerseRow = {
  id: number;
  name: string;
  characterCount: number;
  genres: string[];
  scaling: string;
};

export default function VerseLeaderboard() {
  const [verses, setVerses] = useState<VerseRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const response = await fetch("/api/verses");
        const data = await response.json();
        setVerses(data);
      } catch (error) {
        console.error("Failed to fetch verses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, []);

  return (
    <SectionCard className="min-h-105">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Verse Leaderboard</h2>
          <p className="mt-1 text-sm text-white/60">
            Track all your worlds, their population, genre identity, and power
            scale.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
        <div className="grid grid-cols-[1.6fr_0.8fr_1.2fr_1fr] border-b border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
          <div>Verse</div>
          <div>Characters</div>
          <div>Genres</div>
          <div>Scaling</div>
        </div>

        <div className="max-h-85 overflow-y-auto custom-scroll">
          {loading ? (
            <div className="px-6 py-8 text-white/60">Loading verses...</div>
          ) : verses.length === 0 ? (
            <div className="px-6 py-8 text-white/60">
              No verses yet. Your database is ready for its first world.
            </div>
          ) : (
            verses.map((verse, index) => (
              <div
                key={verse.id}
                className="grid grid-cols-[1.6fr_0.8fr_1.2fr_1fr] items-center border-b border-white/5 px-6 py-4 text-sm text-white/85 transition hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500/80 to-cyan-400/80 text-xs font-black text-white">
                    {index + 1}
                  </div>
                  <span className="font-semibold">{verse.name}</span>
                </div>

                <div>{verse.characterCount}</div>

                <div className="flex flex-wrap gap-2">
                  {verse.genres.map((genre) => (
                    <span
                      key={`${verse.id}-${genre}`}
                      className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div>
                  <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1 text-xs font-medium text-fuchsia-100">
                    {verse.scaling}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SectionCard>
  );
}