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

export type TextBlock = {
  id: string;
  type: "text";
  title?: string;
  parts: InlineTextPart[];
};

export type RichListItem = {
  id: string;
  parts: InlineTextPart[];
};

export type ListBlock = {
  id: string;
  type: "list";
  title?: string;
  items: RichListItem[];
};

export type ImageBlock = {
  id: string;
  type: "image";
  title?: string;
  imageId: string;
  imageUrl: string;
  caption?: string;
  framed: boolean;
};

export type TableCell = {
  id: string;
  kind: "value" | "empty";
  value: string;
};

export type TableBlock = {
  id: string;
  type: "table";
  title?: string;
  rows: number;
  cols: number;
  cells: TableCell[][];
};

export type ContentBlock = TextBlock | ListBlock | ImageBlock | TableBlock;

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
};

export type AbilityNodeCreatePayload = {
  name: string;
  slug: string;
  type: AbilityNodeTypeValue;
  family?: AbilityFamilyValue | null;
  shortDescription?: string;
  notes?: string;
  hierarchyLevel?: string | null;
  status: "DRAFT" | "PUBLISHED";
  isActive: boolean;
  mainImage: UploadedImage | null;
  secondaryImages: UploadedImage[];
  parentId?: string | null;
  childIds: string[];
  contentBlocks: ContentBlock[];
};