"use client";

import Link from "next/link";
import { ArrowLeft, BookMarked } from "lucide-react";
import { useEffect, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

type NovelData = {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  summary: string | null;
  visibilityStatus: string;
  isPublished: boolean;
  tags: string[] | null;
  createdAt: string;
  coverImage: {
    url: string;
  } | null;
  linkedWorld: {
    id: string;
    name: string;
    slug: string;
    type: string;
  } | null;
  chapters: {
    id: string;
    title: string;
    slug: string;
    subtitle: string | null;
    orderIndex: number;
    status: string;
    coverImage: {
      url: string;
    } | null;
  }[];
};

type Props = {
  slug: string;
};

export default function NovelPrePage({ slug }: Props) {
  const [novel, setNovel] = useState<NovelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/novels/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to load novel");
        }

        const data = await response.json();
        setNovel(data.novel);
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

        <div className="relative z-10 mx-auto flex w-full max-w-[1650px] flex-col gap-8 px-6 py-6 md:px-10">
          <div className="flex items-center justify-end">
            <Link
              href="/universe/lorebook"
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
          ) : !novel ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Novel not found.
            </div>
          ) : (
            <>
              <section className="overflow-hidden rounded-[30px] border border-white/15 bg-white/8 backdrop-blur-xl">
                <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
                  <div className="min-h-[380px] border-b border-white/10 bg-black/20 md:border-b-0 md:border-r">
                    {novel.coverImage?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={novel.coverImage.url}
                        alt={novel.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-[380px] items-center justify-center text-white/35">
                        No cover
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-fuchsia-100">
                      <BookMarked className="h-4 w-4" />
                      Novel
                    </div>

                    <h1 className="mt-4 text-4xl font-black text-white">
                      {novel.title}
                    </h1>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <div className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100">
                          Author
                        </div>
                        <div className="mt-2 text-sm text-white/75">
                          {novel.authorName}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <div className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100">
                          Created
                        </div>
                        <div className="mt-2 text-sm text-white/75">
                          {new Date(novel.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {novel.linkedWorld ? (
                        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 md:col-span-2">
                          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100">
                            Linked To
                          </div>
                          <div className="mt-2 text-sm text-white/75">
                            {novel.linkedWorld.name}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100">
                        Summary
                      </div>
                      <p className="mt-3 text-sm leading-7 text-white/75">
                        {novel.summary || "No summary available."}
                      </p>
                    </div>

                    {novel.tags?.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {novel.tags.map((tag) => (
                          <div
                            key={tag}
                            className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                <h2 className="text-2xl font-black text-white">Chapters</h2>

                {novel.chapters.length === 0 ? (
                  <p className="mt-4 text-sm text-white/55">No chapters available yet.</p>
                ) : (
                  <div className="mt-5 space-y-4">
                    {novel.chapters.map((chapter) => (
                      <Link
                        key={chapter.id}
                        href={`/universe/lorebook/novels/${novel.slug}/chapter/${chapter.slug}`}
                        className="block rounded-[24px] border border-white/10 bg-black/20 p-4 transition hover:bg-white/5"
                      >
                        <div className="grid gap-4 md:grid-cols-[120px_1fr] md:items-center">
                          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                            {chapter.coverImage?.url || novel.coverImage?.url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={chapter.coverImage?.url || novel.coverImage?.url}
                                alt={chapter.title}
                                className="h-[100px] w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-[100px] items-center justify-center text-white/35">
                                No cover
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100">
                              Chapter {chapter.orderIndex}
                            </div>
                            <h3 className="mt-2 text-xl font-black text-white">
                              {chapter.title}
                            </h3>
                            {chapter.subtitle ? (
                              <p className="mt-1 text-sm text-white/60">
                                {chapter.subtitle}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}