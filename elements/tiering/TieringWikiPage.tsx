"use client";

import VerticalNavbar from "@/elements/home/VerticalNavbar";
import TieringSearchBanner from "./TieringSearchBanner";
import TieringPyramid from "./TieringPyramid";
import TierBracketSection from "./TierBracketSection";
import TieringFrameworkSection from "./TieringFrameworkSection";
import TieringWikiTableOfContents from "./TieringWikiTableOfContents";
import { tierBrackets } from "./tieringWikiData";
import { useTieringWikiSearch } from "./useTieringWikiSearch";

const tocItems = [
  {
    id: "tiering-framework",
    label: "System Framework",
    description: "Rules, sub-tiers, modifiers, philosophy, and interpretation.",
  },
  {
    id: "tiering-pyramid",
    label: "Scaling Pyramid",
    description: "Visual bracket navigation from basic life to transcendental.",
  },
  ...tierBrackets.map((bracket) => ({
    id: bracket.id,
    label: bracket.title,
    description: bracket.range,
  })),
];

export default function TieringWikiPage() {
  const { query, setQuery, results, clear, goToResult } = useTieringWikiSearch();

  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1 overflow-visible">
        <div className="mx-auto flex w-full max-w-400 flex-col gap-6 overflow-visible px-6 py-6 md:px-10">
          <div className="relative z-200">
            <TieringSearchBanner
              compact
              badge="Tiering Wiki Search"
              title="Search tiers, brackets, and scaling concepts"
              description="Browse your full tiering structure, from basic life to transcendental existence."
              placeholder="Search a section, title, keyword, or type Tier 10..."
              value={query}
              onChange={setQuery}
              results={results}
              onSelectResult={goToResult}
              onClear={clear}
            />
          </div>

          <div className="relative z-10">
            <TieringWikiTableOfContents items={tocItems} />
          </div>

          <div className="relative z-10">
            <TieringFrameworkSection />
          </div>

          <div className="relative z-10">
            <TieringPyramid />
          </div>

          <div className="relative z-10 space-y-6">
            {tierBrackets.map((bracket) => (
              <TierBracketSection key={bracket.id} bracket={bracket} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}