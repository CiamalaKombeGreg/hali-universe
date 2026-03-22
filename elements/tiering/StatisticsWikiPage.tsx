"use client";

import VerticalNavbar from "@/elements/home/VerticalNavbar";
import TieringSearchBanner from "./TieringSearchBanner";
import StatisticsTreeContents from "./StatisticsTreeContents";
import StatisticsFrameworkSection from "./StatisticsFrameworkSection";
import StatisticsBigSection from "./StatisticsBigSection";
import StatisticsTierRankReference from "./StatisticsTierRankReference";
import { statisticsSections } from "./statisticsWikiData";
import { useStatisticsWikiSearch } from "./useStatisticsWikiSearch";

export default function StatisticsWikiPage() {
  const { query, setQuery, results, clear, goToResult } = useStatisticsWikiSearch();

  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1 overflow-visible">
        <div className="mx-auto flex w-full max-w-400 flex-col gap-6 overflow-visible px-6 py-6 md:px-10">
          <div className="relative z-200">
            <TieringSearchBanner
              compact
              badge="Statistics Wiki Search"
              title="Search stats, sections, and framework concepts"
              description="Browse the full stat system, from raw attributes to advanced matchup mechanics."
              placeholder="Search a section, stat, or keyword..."
              value={query}
              onChange={setQuery}
              results={results as never}
              onSelectResult={goToResult as never}
              onClear={clear}
            />
          </div>

          <StatisticsTreeContents />

          <StatisticsFrameworkSection />

          <StatisticsTierRankReference />

          <div className="space-y-6">
            {statisticsSections.map((section) => (
              <StatisticsBigSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}