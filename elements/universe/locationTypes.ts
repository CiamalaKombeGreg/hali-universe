import type { UploadedWorldImage } from "./worldEntryTypes";
import type { UniverseContentSection } from "./universeContentTypes";

export type LocationTypeValue =
  | "WORLD"
  | "PLANET"
  | "CONTINENT"
  | "COUNTRY"
  | "REGION"
  | "CITY"
  | "BUILDING"
  | "ARENA"
  | "REALM"
  | "POCKET_DIMENSION"
  | "CONCEPTUAL_SPACE";

export type LocationOriginTypeValue =
  | "ORIGINAL"
  | "CANON"
  | "SPINOFF_DERIVED";

export type LocationCanonStatusValue =
  | "CANON"
  | "SEMI_CANON"
  | "NON_CANON"
  | "ALTERNATE_CANON";

export type LinkedLocationParentPreview = {
  id: string;
  name: string;
  slug: string;
  kind: "WORLD_ENTRY" | "LOCATION";
  type: string;
};

export type LocationEntryCreatePayload = {
  name: string;
  slug: string;
  description: string;
  locationType: LocationTypeValue;
  originType: LocationOriginTypeValue;
  canonStatus?: LocationCanonStatusValue | null;
  orderIndex?: number | null;
  coordinateNote?: string | null;

  infoSections: UniverseContentSection[];
  notes: string[];

  parentWorldId?: string | null;
  parentLocationId?: string | null;

  bannerImage: UploadedWorldImage | null;
};