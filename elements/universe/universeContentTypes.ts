export type UniverseInlinePart = {
  id: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  referencePath?: string;
  referenceLabel?: string;
};

export type UniverseTextBlock = {
  id: string;
  type: "text";
  parts: UniverseInlinePart[];
};

export type UniverseListItem = {
  id: string;
  parts: UniverseInlinePart[];
};

export type UniverseListBlock = {
  id: string;
  type: "list";
  items: UniverseListItem[];
};

export type UniverseImageBlock = {
  id: string;
  type: "image";
  imageId: string;
  imageUrl: string;
  storageKey?: string;
  caption?: string;
  framed: boolean;
  localFile?: File | null;
};

export type UniverseTableCell = {
  id: string;
  kind: "value" | "empty";
  value: string;
};

export type UniverseTableBlock = {
  id: string;
  type: "table";
  rows: number;
  cols: number;
  cells: UniverseTableCell[][];
};

export type UniverseSubtitleBlock = {
  id: string;
  type: "subtitle";
  text: string;
};

export type UniverseSectionItem =
  | UniverseSubtitleBlock
  | UniverseTextBlock
  | UniverseListBlock
  | UniverseImageBlock
  | UniverseTableBlock;

export type UniverseContentSection = {
  id: string;
  title: string;
  items: UniverseSectionItem[];
};