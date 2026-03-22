"use client";

import { useMemo, useState } from "react";
import {
  statisticsSearchIndex,
  type StatisticsSearchResult,
} from "./statisticsWikiSearchData";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function useStatisticsWikiSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = normalize(query);

    if (!normalized) {
      return [];
    }

    return statisticsSearchIndex
      .filter((item) => {
        if (item.label.toLowerCase().includes(normalized)) {
          return true;
        }

        return item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(normalized)
        );
      })
      .slice(0, 8);
  }, [query]);

  const clear = () => setQuery("");

  const goToResult = (result: StatisticsSearchResult) => {
    const element = document.getElementById(result.targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setQuery("");
  };

  return {
    query,
    setQuery,
    results,
    clear,
    goToResult,
  };
}