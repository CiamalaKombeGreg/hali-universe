"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import LorebookCreateTabs from "./LorebookCreateTabs";
import type { ArchiveSection } from "./archiveTypes";

type Props = {
  slug: string;
};

type LorebookEditData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  visibilityStatus: "DRAFT" | "PUBLISHED";
  coverImage: {
    id?: string;
    url: string;
    storageKey?: string;
    isPrimary?: boolean;
  } | null;
  contentSections: ArchiveSection[];
  linkedWorldIds: string[];
  linkedLocationIds: string[];
  linkedCharacterIds: string[];
};

export default function LorebookEditPage({ slug }: Props) {
  const [entry, setEntry] = useState<LorebookEditData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/lorebooks/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to load lorebook");
        }

        const data = await response.json();
        const lorebook = data.lorebook;

        setEntry({
          id: lorebook.id,
          title: lorebook.title ?? "",
          slug: lorebook.slug ?? "",
          description: lorebook.description ?? "",
          visibilityStatus: lorebook.visibilityStatus ?? "DRAFT",
          coverImage: lorebook.coverImage
            ? {
                id: lorebook.coverImage.id,
                url: lorebook.coverImage.url,
                storageKey: lorebook.coverImage.storageKey ?? undefined,
                isPrimary: true,
              }
            : null,
          contentSections: Array.isArray(lorebook.contentSections)
            ? lorebook.contentSections
            : [],
          linkedWorldIds: Array.isArray(lorebook.linkedWorldIds)
            ? lorebook.linkedWorldIds
            : [],
          linkedLocationIds: Array.isArray(lorebook.linkedLocationIds)
            ? lorebook.linkedLocationIds
            : [],
          linkedCharacterIds: Array.isArray(lorebook.linkedCharacterIds)
            ? lorebook.linkedCharacterIds
            : [],
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
              Loading lorebook...
            </div>
          ) : !entry ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Lorebook not found.
            </div>
          ) : (
            <LorebookCreateTabs pageMode="edit-lorebook" initialLorebook={entry} />
          )}
        </div>
      </div>
    </main>
  );
}