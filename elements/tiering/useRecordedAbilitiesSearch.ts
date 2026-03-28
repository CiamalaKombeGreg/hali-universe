"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchResultLike } from "./sharedSearchTypes";

type AbilitySearchResult = SearchResultLike & {
  id: string;
  slug: string;
};

function normalize(value: string) {
  return value.trim();
}

export function useRecordedAbilitiesSearch() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AbilitySearchResult[]>([]);

  useEffect(() => {
    const normalized = normalize(query);

    if (!normalized) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function run() {
      try {
        const params = new URLSearchParams();
        params.set("q", normalized);
        params.set("public", "1");

        const response = await fetch(
          `/api/ability-nodes/filter?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recorded abilities search results");
        }

        const data = await response.json();

        const mapped: AbilitySearchResult[] = (data.results ?? []).map(
          (item: {
            id: string;
            name: string;
            slug: string;
            type: string;
            family?: string | null;
            hierarchyLevel?: string | null;
          }) => ({
            id: item.id,
            slug: item.slug,
            label: item.name,
            targetId: item.slug,
            keywords: [
              item.type,
              item.family ?? "",
              item.hierarchyLevel ?? "",
            ].filter(Boolean),
          })
        );

        setResults(mapped.slice(0, 8));
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error(error);
          setResults([]);
        }
      }
    }

    void run();

    return () => controller.abort();
  }, [query]);

  const clear = () => setQuery("");

  const goToResult = (result: SearchResultLike) => {
    const wikiResult = result as AbilitySearchResult;
    router.push(`/tiering-power/recorded-abilities/${wikiResult.slug}`);
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