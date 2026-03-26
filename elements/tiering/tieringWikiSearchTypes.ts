import type { SearchResultLike } from "./sharedSearchTypes";

export type SearchResultKind =
  | "section"
  | "subsection"
  | "title"
  | "tier"
  | "keyword";

export type SearchResult = SearchResultLike & {
  kind: SearchResultKind;
  keywords: string[];
};