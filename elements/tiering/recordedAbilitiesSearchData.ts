import { abilityHierarchy, abilityTypes } from "./recordedAbilitiesData";
import type { SearchResultLike } from "./sharedSearchTypes";

export type RecordedAbilitiesSearchResult = SearchResultLike & {
  kind: "section" | "subsection" | "type" | "keyword" | "hierarchy";
  keywords: string[];
};

const abilityTypeResults: RecordedAbilitiesSearchResult[] = abilityTypes.map((type) => ({
  id: `type-${type.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`,
  label: type,
  targetId: "abilities-type-wheel",
  kind: "type",
  keywords: [type],
}));

const hierarchyResults: RecordedAbilitiesSearchResult[] = abilityHierarchy.map((item) => ({
  id: `hierarchy-${item.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`,
  label: item,
  targetId: "abilities-hierarchy",
  kind: "hierarchy",
  keywords: [item],
}));

export const recordedAbilitiesSearchIndex: RecordedAbilitiesSearchResult[] = [
  {
    id: "section-framework",
    label: "Ability Framework",
    targetId: "abilities-framework",
    kind: "section",
    keywords: [
      "framework",
      "ability framework",
      "systems",
      "abilities",
      "tree logic",
      "validation rules",
      "structural roles",
    ],
  },
  {
    id: "section-types",
    label: "Ability Types",
    targetId: "abilities-type-wheel",
    kind: "section",
    keywords: ["types", "ability types", "categories", "wheel"],
  },
  {
    id: "section-hierarchy",
    label: "Ability Hierarchy",
    targetId: "abilities-hierarchy",
    kind: "section",
    keywords: ["hierarchy", "ability hierarchy", "scale"],
  },
  {
    id: "sub-core-principle",
    label: "Core principle",
    targetId: "abilities-core-principle",
    kind: "subsection",
    keywords: ["core principle", "system", "ability"],
  },
  {
    id: "sub-tree-logic",
    label: "Tree logic",
    targetId: "abilities-tree-logic",
    kind: "subsection",
    keywords: ["tree", "tree logic", "branch", "sub-system", "nested"],
  },
  {
    id: "sub-validation-rules",
    label: "Validation rules",
    targetId: "abilities-validation-rules",
    kind: "subsection",
    keywords: ["validation", "rules", "accepted", "rejected", "empty system"],
  },
  {
    id: "sub-structural-roles",
    label: "Structural roles",
    targetId: "abilities-structural-roles",
    kind: "subsection",
    keywords: [
      "roles",
      "structural roles",
      "parent system",
      "sub-system",
      "recorded ability",
      "association ability",
      "association system",
    ],
  },
  {
    id: "sub-why-structure-matters",
    label: "Why this structure matters",
    targetId: "abilities-why-structure-matters",
    kind: "subsection",
    keywords: ["why", "structure matters", "importance"],
  },
  {
    id: "keyword-association-ability",
    label: "Association Ability",
    targetId: "abilities-structural-roles",
    kind: "keyword",
    keywords: [
      "association ability",
      "mixed ability",
      "combined ability",
      "system with ability",
      "ability with ability",
    ],
  },
  {
    id: "keyword-association-system",
    label: "Association System",
    targetId: "abilities-structural-roles",
    kind: "keyword",
    keywords: [
      "association system",
      "mixed system",
      "combined system",
      "system with system",
      "gear 4",
      "bounce-man",
      "snake-man",
      "tank-man",
      "haki",
      "devil fruit",
    ],
  },
  ...abilityTypeResults,
  ...hierarchyResults,
];