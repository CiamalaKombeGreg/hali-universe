export type SearchResultKind =
  | "section"
  | "subsection"
  | "title"
  | "tier"
  | "keyword";

export type SearchResult = {
  id: string;
  label: string;
  targetId: string;
  kind: SearchResultKind;
  keywords: string[];
};