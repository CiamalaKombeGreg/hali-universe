export type NovelChapterStatusValue = "DRAFT" | "PUBLISHED";

export type ChapterInlinePart = {
  id: string;
  text: string;
  italic?: boolean;
};

export type ChapterSubtitleBlock = {
  id: string;
  type: "subtitle";
  text: string;
};

export type ChapterParagraphBlock = {
  id: string;
  type: "paragraph";
  parts: ChapterInlinePart[];
};

export type ChapterConversationBlock = {
  id: string;
  type: "conversation";
  parts: ChapterInlinePart[];
};

export type ChapterContentBlock =
  | ChapterSubtitleBlock
  | ChapterParagraphBlock
  | ChapterConversationBlock;

export type NovelChapterCreatePayload = {
  title: string;
  slug: string;
  subtitle?: string;
  orderIndex: number;
  status: NovelChapterStatusValue;
  coverImage: {
    url: string;
    storageKey?: string;
  } | null;
  contentBlocks: ChapterContentBlock[];
};