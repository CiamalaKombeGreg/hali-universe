"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import type { ArchiveSection } from "./archiveTypes";
import { renderArchiveInlinePart } from "./archiveRenderUtils";

type LorebookData = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  visibilityStatus: string;
  isPublished: boolean;
  coverImage: {
    url: string;
  } | null;
  contentSections: ArchiveSection[] | null;
  linkedWorldIds: string[] | null;
  linkedLocationIds: string[] | null;
  linkedCharacterIds: string[] | null;
};

type Props = {
  slug: string;
};

export default function LorebookWikiPage({ slug }: Props) {
  const [lorebook, setLorebook] = useState<LorebookData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/lorebooks/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to load lorebook");
        }

        const data = await response.json();
        setLorebook(data.lorebook);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [slug]);

  const tocItems = useMemo(() => {
    if (!lorebook?.contentSections?.length) return [];

    return lorebook.contentSections.map((section, index) => ({
      id: `section-${section.id}`,
      title: section.title?.trim() || `Section ${index + 1}`,
    }));
  }, [lorebook]);

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
              Loading lorebook...
            </div>
          ) : !lorebook ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Lorebook not found.
            </div>
          ) : (
            <>
              <section className="overflow-hidden rounded-[30px] border border-white/15 bg-white/8 backdrop-blur-xl">
                <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
                  <div className="min-h-[300px] border-b border-white/10 bg-black/20 md:border-b-0 md:border-r">
                    {lorebook.coverImage?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={lorebook.coverImage.url}
                        alt={lorebook.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-[300px] items-center justify-center text-white/35">
                        No cover
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                      <BookOpen className="h-4 w-4" />
                      Lorebook
                    </div>

                    <h1 className="mt-4 text-4xl font-black text-white">
                      {lorebook.title}
                    </h1>

                    <p className="mt-4 text-sm leading-7 text-white/72">
                      {lorebook.description || "No description available."}
                    </p>
                  </div>
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                  <h2 className="text-2xl font-black text-white">Table of contents</h2>

                  {tocItems.length === 0 ? (
                    <p className="mt-4 text-sm text-white/55">No sections available yet.</p>
                  ) : (
                    <div className="mt-5 grid gap-3">
                      {tocItems.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </section>

                <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                  <h2 className="text-2xl font-black text-white">Linked Assets</h2>

                  <div className="mt-5 space-y-4 text-sm text-white/72">
                    <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/8 px-4 py-3">
                      Worlds linked: {lorebook.linkedWorldIds?.length ?? 0}
                    </div>

                    <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-400/8 px-4 py-3">
                      Locations linked: {lorebook.linkedLocationIds?.length ?? 0}
                    </div>

                    <div className="rounded-2xl border border-violet-300/15 bg-violet-400/8 px-4 py-3">
                      Characters linked: {lorebook.linkedCharacterIds?.length ?? 0}
                    </div>
                  </div>
                </section>
              </section>

              <section className="space-y-6">
                {(lorebook.contentSections ?? []).map((section, index) => (
                  <section
                    key={section.id}
                    id={`section-${section.id}`}
                    className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl"
                  >
                    <h2 className="mb-5 text-2xl font-black text-white">
                      {section.title?.trim() || `Section ${index + 1}`}
                    </h2>

                    <div className="space-y-5">
                      {section.items.map((item) => {
                        if (item.type === "text") {
                          return (
                            <p
                              key={item.id}
                              className="text-sm leading-8 text-white/75"
                            >
                              {item.parts.map(renderArchiveInlinePart)}
                            </p>
                          );
                        }

                        if (item.type === "image") {
                          return (
                            <div key={item.id} className="space-y-3">
                              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={item.imageUrl}
                                  alt={item.caption || "Lorebook section image"}
                                  className="max-h-[520px] w-full rounded-[18px] object-contain"
                                />
                              </div>
                              {item.caption ? (
                                <p className="text-sm text-white/55">{item.caption}</p>
                              ) : null}
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </section>
                ))}
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}