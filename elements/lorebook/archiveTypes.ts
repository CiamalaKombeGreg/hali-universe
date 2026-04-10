export type ArchiveVisibilityStatusValue = "DRAFT" | "PUBLISHED";

export type RichColorValue =
  | "default"
  | "cyan"
  | "fuchsia"
  | "emerald"
  | "amber"
  | "rose"
  | "violet";

export type ArchiveInlinePart = {
  id: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: RichColorValue;
  referencePath?: string;
  referenceLabel?: string;
};

export type ArchiveTextBlock = {
  id: string;
  type: "text";
  parts: ArchiveInlinePart[];
};

export type ArchiveImageBlock = {
  id: string;
  type: "image";
  imageId: string;
  imageUrl: string;
  storageKey?: string;
  caption?: string;
  localFile?: File | null;
};

export type ArchiveSectionItem = ArchiveTextBlock | ArchiveImageBlock;

export type ArchiveSection = {
  id: string;
  title: string;
  items: ArchiveSectionItem[];
};

export type LorebookCreatePayload = {
  title: string;
  slug: string;
  description: string;
  visibilityStatus: ArchiveVisibilityStatusValue;
  isPublished: boolean;
  coverImage: {
    url: string;
    storageKey?: string;
  } | null;
  contentSections: ArchiveSection[];
  linkedWorldIds: string[];
  linkedLocationIds: string[];
  linkedCharacterIds: string[];
};

export type NovelCreatePayload = {
  title: string;
  slug: string;
  authorName: string;
  summary: string;
  visibilityStatus: ArchiveVisibilityStatusValue;
  isPublished: boolean;
  coverImage: {
    url: string;
    storageKey?: string;
  } | null;
  tags: string[];
  linkedWorldId?: string | null;
};