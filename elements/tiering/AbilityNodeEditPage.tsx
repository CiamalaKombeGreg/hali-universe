"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import AbilityNodeCreateForm from "./AbilityNodeCreateForm";
import type {
  ContentSection,
  InlineTextPart,
  UploadedImage,
} from "./abilityEditorTypes";

type AbilityNodeFormInitialData = {
  id: string;
  name: string;
  slug: string;
  type: string;
  family?: string | null;
  shortDescriptionParts: InlineTextPart[];
  notes: string[];
  hierarchyLevel?: string | null;
  status: "DRAFT" | "PUBLISHED";
  isActive: boolean;
  mainImage: UploadedImage | null;
  contentSections: ContentSection[];
  parent?: {
    id: string;
    name: string;
    slug: string;
    type: string;
  } | null;
  children?: {
    id: string;
    name: string;
    slug: string;
    type: string;
  }[];
};

type Props = {
  slug: string;
};

export default function AbilityNodeEditPage({ slug }: Props) {
  const [node, setNode] = useState<AbilityNodeFormInitialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      const response = await fetch(`/api/ability-nodes/${slug}`);
      const data = await response.json();

      if (!data.node) {
        setNode(null);
        setLoading(false);
        return;
      }

      setNode({
        id: data.node.id,
        name: data.node.name,
        slug: data.node.slug,
        type: data.node.type,
        family: data.node.family ?? null,
        shortDescriptionParts: Array.isArray(data.node.shortDescriptionParts)
          ? data.node.shortDescriptionParts
          : [],
        notes: Array.isArray(data.node.notes) ? data.node.notes : [],
        hierarchyLevel: data.node.hierarchyLevel ?? null,
        status: data.node.status,
        isActive: data.node.isActive,
        mainImage: data.node.mainImage
          ? {
              id: data.node.mainImage.id ?? crypto.randomUUID(),
              url: data.node.mainImage.url,
              storageKey: data.node.mainImage.storageKey,
              caption: data.node.mainImage.caption,
              altText: data.node.mainImage.altText,
              isPrimary: true,
            }
          : null,
        contentSections: Array.isArray(data.node.contentSections)
          ? data.node.contentSections
          : [],
          parent: data.node.parent
          ? {
              id: data.node.parent.id,
              name: data.node.parent.name,
              slug: data.node.parent.slug,
              type: data.node.parent.type,
            }
          : null,
        children: Array.isArray(data.node.children)
          ? data.node.children.map(
              (child: { id: string; name: string; slug: string; type: string }) => ({
                id: child.id,
                name: child.name,
                slug: child.slug,
                type: child.type,
              })
            )
          : [],
      });

      setLoading(false);
    }

    void run();
  }, [slug]);

  const backHref =
    node?.status === "DRAFT"
      ? "/tiering-power/recorded-abilities/edit/existing"
      : `/tiering-power/recorded-abilities/edit/${slug}`;

  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 py-6 md:px-10">
          <div className="flex items-center justify-between">
            <Link
              href={backHref}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Link>
          </div>

          {loading ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Loading editor...
            </div>
          ) : (
            <AbilityNodeCreateForm mode="edit" initialNode={node ?? undefined} />
          )}
        </div>
      </div>
    </main>
  );
}