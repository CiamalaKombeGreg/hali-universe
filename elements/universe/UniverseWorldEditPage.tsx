"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import UniverseEntryCreateForm from "./UniverseEntryCreateForm";
import type {
  LinkedAbilityPreview,
  LinkedWorldPreview,
  UploadedWorldImage,
  WorldCanonStatusValue,
  WorldCosmologyTypeValue,
  WorldEntryTypeValue,
  WorldVisibilityStatusValue,
} from "./worldEntryTypes";
import type { UniverseContentSection } from "./universeContentTypes";

type Props = {
  slug: string;
};

type WorldEntryApiResponse = {
  entry: {
    id: string;
    name: string | null;
    slug: string;
    description: string | null;
    summary: string | null;
    type: string;
    canonStatus: string | null;
    cosmologyType: string | null;
    visibilityStatus: string | null;
    isPublished: boolean;

    sourceNote: string | null;
    inspirationNote: string | null;
    officialPublisher: string | null;
    creator: string | null;
    branchDescription: string | null;
    divergenceNote: string | null;
    approvalNote: string | null;
    sourceSeriesNote: string | null;
    installmentOrder: number | null;
    installmentCode: string | null;

    isStandaloneContainer: boolean | null;
    allowOriginalCreations: boolean | null;
    allowOfficialSeries: boolean | null;
    hasMultipleContinuities: boolean | null;
    isFullyIndependent: boolean | null;
    officialCrossover: boolean | null;

    infoSections: UniverseContentSection[] | null;
    notes: string[] | null;

    parent: {
      id: string;
      name: string;
      slug: string;
      type: string;
    } | null;

    crossoverSources: {
      sourceEntry: {
        id: string;
        name: string;
        slug: string;
        type: string;
      };
    }[];

    linkedAbilities: {
      abilityNode: {
        id: string;
        name: string;
        slug: string;
        type: string;
        status: string;
      };
    }[];

    tags: {
      id: string;
      label: string;
    }[];

    bannerImage: {
      id?: string;
      url: string;
      storageKey?: string | null;
    } | null;
  };
};

type WorldEntryFormInitialData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  summary: string;
  type: WorldEntryTypeValue;
  canonStatus: WorldCanonStatusValue | "";
  cosmologyType: WorldCosmologyTypeValue | "";
  visibilityStatus: WorldVisibilityStatusValue;
  isPublished: boolean;

  sourceNote: string;
  inspirationNote: string;
  officialPublisher: string;
  creator: string;
  branchDescription: string;
  divergenceNote: string;
  approvalNote: string;
  sourceSeriesNote: string;
  installmentOrder: string;
  installmentCode: string;

  isStandaloneContainer: boolean;
  allowOriginalCreations: boolean;
  allowOfficialSeries: boolean;
  hasMultipleContinuities: boolean;
  isFullyIndependent: boolean;
  officialCrossover: boolean;

  parent: LinkedWorldPreview | null;
  sourceEntries: LinkedWorldPreview[];
  linkedAbilities: LinkedAbilityPreview[];
  tags: string[];
  infoSections: UniverseContentSection[];
  notes: string[];

  bannerImage: UploadedWorldImage | null;
};

export default function UniverseWorldEditPage({ slug }: Props) {
  const [entry, setEntry] = useState<WorldEntryFormInitialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/world-entries/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to load world entry");
        }

        const data = (await response.json()) as WorldEntryApiResponse;
        const e = data.entry;

        const mappedEntry: WorldEntryFormInitialData = {
          id: e.id,
          name: e.name ?? "",
          slug: e.slug ?? "",
          description: e.description ?? "",
          summary: e.summary ?? "",
          type: e.type as WorldEntryTypeValue,
          canonStatus: (e.canonStatus as WorldCanonStatusValue | null) ?? "",
          cosmologyType:
            (e.cosmologyType as WorldCosmologyTypeValue | null) ?? "",
          visibilityStatus:
            (e.visibilityStatus as WorldVisibilityStatusValue | null) ?? "DRAFT",
          isPublished: Boolean(e.isPublished),

          sourceNote: e.sourceNote ?? "",
          inspirationNote: e.inspirationNote ?? "",
          officialPublisher: e.officialPublisher ?? "",
          creator: e.creator ?? "",
          branchDescription: e.branchDescription ?? "",
          divergenceNote: e.divergenceNote ?? "",
          approvalNote: e.approvalNote ?? "",
          sourceSeriesNote: e.sourceSeriesNote ?? "",
          installmentOrder:
            e.installmentOrder !== null && e.installmentOrder !== undefined
              ? String(e.installmentOrder)
              : "",
          installmentCode: e.installmentCode ?? "",

          isStandaloneContainer: Boolean(e.isStandaloneContainer),
          allowOriginalCreations: Boolean(e.allowOriginalCreations),
          allowOfficialSeries: Boolean(e.allowOfficialSeries),
          hasMultipleContinuities: Boolean(e.hasMultipleContinuities),
          isFullyIndependent: Boolean(e.isFullyIndependent),
          officialCrossover: Boolean(e.officialCrossover),

          parent: e.parent
            ? {
                id: e.parent.id,
                name: e.parent.name,
                slug: e.parent.slug,
                type: e.parent.type,
              }
            : null,

          sourceEntries: Array.isArray(e.crossoverSources)
            ? e.crossoverSources.map((source) => ({
                id: source.sourceEntry.id,
                name: source.sourceEntry.name,
                slug: source.sourceEntry.slug,
                type: source.sourceEntry.type,
              }))
            : [],

          linkedAbilities: Array.isArray(e.linkedAbilities)
            ? e.linkedAbilities.map((item) => ({
                id: item.abilityNode.id,
                name: item.abilityNode.name,
                slug: item.abilityNode.slug,
                type: item.abilityNode.type,
                status: item.abilityNode.status,
              }))
            : [],

          tags: Array.isArray(e.tags) ? e.tags.map((tag) => tag.label) : [],
          infoSections: Array.isArray(e.infoSections) ? e.infoSections : [],
          notes: Array.isArray(e.notes) ? e.notes : [],
          bannerImage: e.bannerImage
            ? {
                id: e.bannerImage.id ?? crypto.randomUUID(),
                url: e.bannerImage.url,
                storageKey: e.bannerImage.storageKey ?? undefined,
                isPrimary: true,
              }
            : null,
        };

        setEntry(mappedEntry);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [slug]);

  return (
    <main className="relative flex min-h-screen bg-[#02040b] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%),linear-gradient(to_bottom,#02040b,#040816,#02040b)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1650px] px-6 py-6 md:px-10">
          <div className="mb-6">
            <Link
              href="/universe/manage/database"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return
            </Link>
          </div>

          {loading ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Loading world entry...
            </div>
          ) : !entry ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              World entry not found.
            </div>
          ) : (
            <UniverseEntryCreateForm mode="edit" initialData={entry} />
          )}
        </div>
      </div>
    </main>
  );
}