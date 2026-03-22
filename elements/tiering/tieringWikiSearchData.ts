import { tierBrackets } from "./tieringWikiData";
import type { SearchResult } from "./tieringWikiSearchTypes";

const majorSections: SearchResult[] = [
  {
    id: "search-section-framework",
    label: "System Framework",
    targetId: "tiering-framework",
    kind: "section",
    keywords: ["framework", "system", "rules", "tiering framework", "philosophy"],
  },
  {
    id: "search-section-contents",
    label: "Table of Contents",
    targetId: "tiering-wiki-contents",
    kind: "section",
    keywords: ["contents", "table of contents", "navigation", "toc"],
  },
  {
    id: "search-section-pyramid",
    label: "Scaling Pyramid",
    targetId: "tiering-pyramid",
    kind: "section",
    keywords: ["pyramid", "scaling pyramid", "brackets", "tier brackets"],
  },
];

const frameworkSections: SearchResult[] = [
  {
    id: "search-framework-subdivisions",
    label: "Tier subdivisions",
    targetId: "framework-subdivisions",
    kind: "subsection",
    keywords: ["subdivisions", "tier subdivisions", "low medium high", "sub tiers"],
  },
  {
    id: "search-framework-relative-scale",
    label: "Relative scale of capability",
    targetId: "framework-relative-scale",
    kind: "subsection",
    keywords: ["scale", "relative scale", "capability range", "range"],
  },
  {
    id: "search-framework-interaction",
    label: "Interaction vs destruction",
    targetId: "framework-interaction-vs-destruction",
    kind: "subsection",
    keywords: ["interaction", "destruction", "interaction vs destruction"],
  },
  {
    id: "search-framework-plus",
    label: "The + modifier",
    targetId: "framework-plus-modifier",
    kind: "subsection",
    keywords: ["plus", "+", "modifier", "plus modifier"],
  },
  {
    id: "search-framework-guide",
    label: "Quick reading guide",
    targetId: "framework-reading-guide",
    kind: "subsection",
    keywords: ["guide", "reading guide", "how to read", "steps"],
  },
  {
    id: "search-framework-philosophy",
    label: "Core philosophy",
    targetId: "framework-core-philosophy",
    kind: "subsection",
    keywords: ["philosophy", "core philosophy", "principles"],
  },
  {
    id: "search-title-low-tier",
    label: "Low Tier",
    targetId: "framework-subdivisions",
    kind: "title",
    keywords: ["low tier", "low"],
  },
  {
    id: "search-title-medium-tier",
    label: "Medium Tier",
    targetId: "framework-subdivisions",
    kind: "title",
    keywords: ["medium tier", "medium"],
  },
  {
    id: "search-title-high-tier",
    label: "High Tier",
    targetId: "framework-subdivisions",
    kind: "title",
    keywords: ["high tier", "high"],
  },
];

const bracketSections: SearchResult[] = tierBrackets.map((bracket) => ({
  id: `search-bracket-${bracket.id}`,
  label: bracket.title,
  targetId: bracket.id,
  kind: "section" as const,
  keywords: [
    bracket.title,
    bracket.range,
    bracket.id.replaceAll("-", " "),
  ],
}));

const tierEntries: SearchResult[] = tierBrackets.flatMap((bracket) =>
  bracket.entries.map((entry) => ({
    id: `search-tier-${entry.fullTitle.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`,
    label: entry.fullTitle,
    targetId: `tier-${entry.fullTitle.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`,
    kind: "tier" as const,
    keywords: [
      entry.tierName,
      entry.fullTitle,
      entry.tierNumber,
      `tier ${entry.tierNumber}`.toLowerCase(),
      ...entry.keyPoints,
      ...entry.limitations,
    ],
  }))
);

// Add your custom keyword mapping here later
const customKeywords: SearchResult[] = [
  {
    id: "keyword-scale",
    label: "Relative scale of capability",
    targetId: "framework-relative-scale",
    kind: "keyword",
    keywords: ["scale", "scaling", "power range", "relative scale of capability"],
  },
  {
    id: "keyword-ap",
    label: "Interaction vs destruction",
    targetId: "framework-interaction-vs-destruction",
    kind: "keyword",
    keywords: ["ap", "dc", "attack potency", "destructive capacity"],
  },
];

export const tieringWikiSearchIndex: SearchResult[] = [
  ...majorSections,
  ...frameworkSections,
  ...bracketSections,
  ...tierEntries,
  ...customKeywords,
];