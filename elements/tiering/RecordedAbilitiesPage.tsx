"use client";

import VerticalNavbar from "@/elements/home/VerticalNavbar";
import TieringSearchBanner from "./TieringSearchBanner";
import AbilitiesTypeWheel from "./AbilitiesTypeWheel";
import AbilitiesFrameworkSection from "./AbilitiesFrameworkSection";
import AbilitiesHierarchyDisplay from "./AbilitiesHierarchyDisplay";
import RecordedAbilitiesFloatingEdit from "./RecordedAbilitiesFloatingEdit";
import { useRecordedAbilitiesSearch } from "./useRecordedAbilitiesSearch";

export default function RecordedAbilitiesPage() {
  const { query, setQuery, results, clear, goToResult } =
    useRecordedAbilitiesSearch();

  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1 overflow-visible">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 overflow-visible px-6 py-6 md:px-10">
          <RecordedAbilitiesFloatingEdit />

          <div className="relative z-[200]">
            <TieringSearchBanner
              compact
              badge="Recorded Abilities Search"
              title="Search ability types, systems, and structures"
              description="Browse the future architecture of your recorded abilities and system trees."
              placeholder="Search an ability type, system, node, or concept..."
              value={query}
              onChange={setQuery}
              results={results}
              onSelectResult={goToResult}
              onClear={clear}
            />
          </div>

          <AbilitiesTypeWheel />

          <AbilitiesFrameworkSection />

          <AbilitiesHierarchyDisplay />
        </div>
      </div>
    </main>
  );
}