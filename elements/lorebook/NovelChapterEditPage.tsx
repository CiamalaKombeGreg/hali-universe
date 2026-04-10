"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import NovelChapterForm from "./NovelChapterForm";
import type { ChapterContentBlock, NovelChapterStatusValue } from "./novelChapterTypes";

type Props = {
  slug: string;
  chapterSlug: string;
};

type InitialChapterData = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  orderIndex: number;
  status: NovelChapterStatusValue;
  coverImage: {
    url: string;
    storageKey?: string;
  } | null;
  contentBlocks: ChapterContentBlock[];
};

export default function NovelChapterEditPage({ slug, chapterSlug }: Props) {
  const [chapter, setChapter] = useState<InitialChapterData | null>(null);
  const [novelCoverUrl, setNovelCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(
          `/api/novels/${slug}/chapters/${chapterSlug}`
        );
        if (!response.ok) {
          throw new Error("Failed to load chapter");
        }

        const data = await response.json();

        setNovelCoverUrl(data.novel?.coverImage?.url ?? null);
        setChapter({
          id: data.chapter.id,
          title: data.chapter.title ?? "",
          slug: data.chapter.slug ?? "",
          subtitle: data.chapter.subtitle ?? "",
          orderIndex: data.chapter.orderIndex ?? 1,
          status: data.chapter.status ?? "DRAFT",
          coverImage: data.chapter.coverImage
            ? {
                url: data.chapter.coverImage.url,
                storageKey: data.chapter.coverImage.storageKey ?? undefined,
              }
            : null,
          contentBlocks: Array.isArray(data.chapter.contentBlocks)
            ? data.chapter.contentBlocks
            : [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [slug, chapterSlug]);

  return (
    <main className="relative flex min-h-screen bg-[#050712] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_24%),linear-gradient(to_bottom,#050712,#0a1020,#060816)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1700px] px-6 py-6 md:px-10">
          <div className="mb-6">
            <Link
              href={`/universe/lorebook/edit/novel/${slug}`}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Return
            </Link>
          </div>

          {loading ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Loading chapter...
            </div>
          ) : !chapter ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Chapter not found.
            </div>
          ) : (
            <>
              <section className="mb-8 rounded-[34px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <h1 className="text-4xl font-black text-white">Edit Chapter</h1>
              </section>

              <NovelChapterForm
                novelSlug={slug}
                mode="edit"
                initialChapter={chapter}
                novelCoverUrl={novelCoverUrl}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}