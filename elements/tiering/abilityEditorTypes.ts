export type InlineTextPart = {
  id: string;
  text: string;
  bold?: boolean;
  underline?: boolean;
  referenceType?: "ABILITY_NODE" | "PAGE";
  referenceId?: string;
  referenceLabel?: string;
  referencePath?: string;
};

export type RichListItem = {
  id: string;
  parts: InlineTextPart[];
};

export type SubtitleBlock = {
  id: string;
  type: "subtitle";
  text: string;
};

export type TextBlock = {
  id: string;
  type: "text";
  parts: InlineTextPart[];
};

export type ListBlock = {
  id: string;
  type: "list";
  items: RichListItem[];
};

export type ImageBlock = {
  id: string;
  type: "image";
  imageId: string;
  imageUrl: string;
  storageKey?: string;
  caption?: string;
  framed: boolean;
  localFile?: File | null;
};

export type TableCell = {
  id: string;
  kind: "value" | "empty";
  value: string;
};

export type TableBlock = {
  id: string;
  type: "table";
  rows: number;
  cols: number;
  cells: TableCell[][];
};

export type SectionItem =
  | SubtitleBlock
  | TextBlock
  | ListBlock
  | ImageBlock
  | TableBlock;

export type ContentSection = {
  id: string;
  title: string;
  items: SectionItem[];
};

export type AbilityNodeTypeValue =
  | "SYSTEM"
  | "SUBSYSTEM"
  | "ABILITY"
  | "ASSOCIATION_SYSTEM"
  | "ASSOCIATION_ABILITY";

export type AbilityFamilyValue =
  | "BODY_ALTERATION"
  | "EXTERNAL_MANIPULATION"
  | "MENTAL_PERCEPTUAL"
  | "SPIRITUAL_SOUL"
  | "CREATION_SUMMONING"
  | "CONCEPTUAL_ABSTRACT"
  | "METAPOWER"
  | "DIMENSIONAL_MOVEMENT"
  | "DEFENSE_NEGATION"
  | "UTILITY_SUPPORT";

export type UploadedImage = {
  id: string;
  url: string;
  storageKey?: string;
  caption?: string;
  altText?: string;
  isPrimary?: boolean;
};

export type LinkedNodePreview = {
  id: string;
  name: string;
  slug: string;
  type: string;
  status?: "DRAFT" | "PUBLISHED";
};

export type AbilityNodeCreatePayload = {
  name: string;
  slug: string;
  type: AbilityNodeTypeValue;
  family?: AbilityFamilyValue | null;
  shortDescriptionParts: InlineTextPart[];
  notes: string[];
  hierarchyLevel?: string | null;
  status: "DRAFT" | "PUBLISHED";
  isActive: boolean;
  mainImage: UploadedImage | null;
  secondaryImages: UploadedImage[];
  parentId?: string | null;
  childIds: string[];
  contentSections: ContentSection[];
};

export type AbilityNodeFormInitialData = {
  id: string;
  name: string;
  slug: string;
  type: string;
  family?: string | null;
  shortDescriptionParts: InlineTextPart[];
  notes: string[];
  hierarchyLevel?: string | null;
  status: "DRAFT" | "PUBLISHED";
  isActive: boolean;
  mainImage: UploadedImage | null;
  contentSections: ContentSection[];
  parent?: LinkedNodePreview | null;
  children?: LinkedNodePreview[];
};