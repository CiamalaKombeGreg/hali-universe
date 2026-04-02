export type WorldEntryTypeValue =
  | "UNIVERSE"
  | "SERIES_COLLECTION"
  | "CONTINUITY"
  | "INSTALLMENT"
  | "SPINOFF"
  | "FANMADE"
  | "ORIGINAL_CREATION"
  | "CROSSOVER";

export type WorldCanonStatusValue =
  | "CANON"
  | "SEMI_CANON"
  | "NON_CANON"
  | "ALTERNATE_CANON";

export type WorldCosmologyTypeValue =
  | "SINGLE_UNIVERSE"
  | "MULTIVERSE"
  | "COMPLEX_MULTIVERSE"
  | "HIGHER_DIMENSIONAL_STRUCTURE";

export type WorldVisibilityStatusValue = "DRAFT" | "PUBLISHED";

export type UploadedWorldImage = {
  id: string;
  url: string;
  storageKey?: string;
  caption?: string;
  altText?: string;
  isPrimary?: boolean;
};

export type LinkedWorldPreview = {
  id: string;
  name: string;
  slug: string;
  type: string;
};

export type LinkedAbilityPreview = {
  id: string;
  name: string;
  slug: string;
  type: string;
};

export type WorldEntryCreatePayload = {
  name: string;
  slug: string;
  description: string;
  summary: string;
  type: WorldEntryTypeValue;
  canonStatus?: WorldCanonStatusValue | null;
  cosmologyType?: WorldCosmologyTypeValue | null;
  visibilityStatus: WorldVisibilityStatusValue;
  isPublished: boolean;

  sourceNote?: string;
  inspirationNote?: string;
  officialPublisher?: string;
  creator?: string;
  branchDescription?: string;
  divergenceNote?: string;
  approvalNote?: string;
  sourceSeriesNote?: string;
  installmentOrder?: number | null;
  installmentCode?: string | null;

  isStandaloneContainer?: boolean;
  allowOriginalCreations?: boolean;
  allowOfficialSeries?: boolean;
  hasMultipleContinuities?: boolean;
  isFullyIndependent?: boolean;
  officialCrossover?: boolean;

  parentId?: string | null;
  sourceEntryIds: string[];
  tags: string[];

  bannerImage: UploadedWorldImage | null;
  linkedAbilityIds: string[];
};