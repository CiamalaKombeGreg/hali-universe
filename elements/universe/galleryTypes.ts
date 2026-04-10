export type GalleryImageSourceType = "UPLOADED" | "EXTERNAL";

export type GalleryPortfolioSummary = {
  id: string;
  name: string;
  imageCount: number;
};

export type GalleryDisplayImage = {
  id: string;
  portfolioId: string;
  portfolioName: string;
  title: string | null;
  altText: string | null;
  externalLink: string | null;
  sourceType: GalleryImageSourceType;
  imageUrl: string;
  storageKey: string | null;
  sortOrder: number;
};

export type PendingGalleryImage = {
  id: string;
  sourceType: GalleryImageSourceType;
  imageUrl: string;
  title: string;
  altText: string;
  externalLink: string;
  localFile?: File | null;
  storageKey?: string | null;
};

export type CreateGalleryPortfolioPayload = {
  name: string;
  images: {
    title?: string | null;
    altText?: string | null;
    externalLink?: string | null;
    sourceType: GalleryImageSourceType;
    imageUrl: string;
    storageKey?: string | null;
    sortOrder: number;
  }[];
};

export type UpdateGalleryPortfolioPayload = {
  name: string;
  images: {
    id?: string;
    title?: string | null;
    altText?: string | null;
    externalLink?: string | null;
    sourceType: GalleryImageSourceType;
    imageUrl: string;
    storageKey?: string | null;
    sortOrder: number;
  }[];
};