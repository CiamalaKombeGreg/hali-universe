import { statisticsSections } from "./statisticsWikiData";

export type StatisticsSearchResult = {
  id: string;
  label: string;
  targetId: string;
  kind: "section" | "subsection" | "keyword";
  keywords: string[];
};

const baseSections: StatisticsSearchResult[] = [
  {
    id: "stats-framework",
    label: "Statistics Framework",
    targetId: "statistics-framework",
    kind: "section",
    keywords: ["framework", "stats framework", "level", "relevancy"],
  },
  {
    id: "stats-tree",
    label: "Statistics Tree",
    targetId: "statistics-tree-contents",
    kind: "section",
    keywords: ["tree", "contents", "table of contents", "navigation"],
  },
  {
    id: "stats-tier-rank-reference",
    label: "Tier Rank Reference",
    targetId: "statistics-tier-rank-reference",
    kind: "section",
    keywords: [
      "tier rank",
      "tier rank reference",
      "tier value",
      "tier values",
      "subtier modifier",
      "low",
      "medium",
      "average",
      "high",
      "comparison value",
    ],
  },
];

const sectionEntries: StatisticsSearchResult[] = statisticsSections.flatMap((section) => [
  {
    id: `section-${section.id}`,
    label: section.title,
    targetId: section.id,
    kind: "section" as const,
    keywords: [section.title, section.shortTitle, section.description],
  },
  ...section.subSections.map((sub) => ({
    id: `sub-${sub.id}`,
    label: sub.title,
    targetId: section.id,
    kind: "subsection" as const,
    keywords: [sub.title, section.title],
  })),
]);

const frameworkKeywords: StatisticsSearchResult[] = [
  {
    id: "keyword-level",
    label: "Level system",
    targetId: "statistics-level-system",
    kind: "keyword",
    keywords: ["level", "magnitude", "tier rank", "subtier modifier"],
  },
  {
    id: "keyword-relevancy",
    label: "Relevancy system",
    targetId: "statistics-relevancy-system",
    kind: "keyword",
    keywords: ["relevancy", "importance", "impact", "1", "7"],
  },
  {
    id: "keyword-effective-value",
    label: "Effective value",
    targetId: "statistics-effective-value",
    kind: "keyword",
    keywords: ["effective value", "comparison", "ranking ui"],
  },
  {
    id: "keyword-bypass",
    label: "Bypass system",
    targetId: "statistics-special-cases",
    kind: "keyword",
    keywords: ["bypass", "ignore scaling", "hax bypass"],
  },
];

export const statisticsSearchIndex: StatisticsSearchResult[] = [
  ...baseSections,
  ...sectionEntries,
  ...frameworkKeywords,
];