"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import LorebookCreateTabs from "./LorebookCreateTabs";

type Props = {
  slug: string;
};

type NovelChapterPreview = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  orderIndex: number;
  status: "DRAFT" | "PUBLISHED";
};

type NovelEditData = {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  summary: string;
  visibilityStatus: "DRAFT" | "PUBLISHED";
  coverImage: {
    id?: string;
    url: string;
    storageKey?: string;
    isPrimary?: boolean;
  } | null;
  tags: string[];
  linkedWorldId: string | null;
  chapters: NovelChapterPreview[];
};

export default function NovelEditPage({ slug }: Props) {
  const [entry, setEntry] = useState<NovelEditData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/novels/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to load novel");
        }

        const data = await response.json();
        const novel = data.novel;

        setEntry({
          id: novel.id,
          title: novel.title ?? "",
          slug: novel.slug ?? "",
          authorName: novel.authorName ?? "",
          summary: novel.summary ?? "",
          visibilityStatus: novel.visibilityStatus ?? "DRAFT",
          coverImage: novel.coverImage
            ? {
                id: novel.coverImage.id,
                url: novel.coverImage.url,
                storageKey: novel.coverImage.storageKey ?? undefined,
                isPrimary: true,
              }
            : null,
          tags: Array.isArray(novel.tags) ? novel.tags : [],
          linkedWorldId: novel.linkedWorld?.id ?? null,
          chapters: Array.isArray(novel.chapters) ? novel.chapters : [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [slug]);

  return (
    <main className="relative flex min-h-screen bg-[#050712] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_24%),linear-gradient(to_bottom,#050712,#0a1020,#060816)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1700px] px-6 py-6 md:px-10">
          <div className="mb-6">
            <Link
              href="/universe/lorebook/manage"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return
            </Link>
          </div>

          {loading ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Loading novel...
            </div>
          ) : !entry ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Novel not found.
            </div>
          ) : (
            <LorebookCreateTabs pageMode="edit-novel" initialNovel={entry} />
          )}
        </div>
      </div>
    </main>
  );
}