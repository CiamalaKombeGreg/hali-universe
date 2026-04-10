"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import UniverseLocationCreateForm from "./UniverseLocationCreateForm";
import type {
  LinkedLocationParentPreview,
  LocationCanonStatusValue,
  LocationTypeValue,
  LocationOriginTypeValue,
} from "./locationTypes";
import type { UniverseContentSection } from "./universeContentTypes";
import type { UploadedWorldImage } from "./worldEntryTypes";

type Props = {
  slug: string;
};

type LocationEntryApiResponse = {
  entry: {
    id: string;
    name: string | null;
    slug: string;
    description: string | null;
    locationType: string;
    originType: string;
    canonStatus: string | null;
    orderIndex: number | null;
    coordinateNote: string | null;
    infoSections: UniverseContentSection[] | null;
    notes: string[] | null;
    bannerImage: {
      id?: string;
      url: string;
      storageKey?: string | null;
    } | null;
    parentWorld: {
      id: string;
      name: string;
      slug: string;
      type: string;
    } | null;
    parentLocation: {
      id: string;
      name: string;
      slug: string;
      locationType: string;
    } | null;
  };
};

type UniverseLocationFormInitialData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  locationType: LocationTypeValue;
  originType: LocationOriginTypeValue;
  canonStatus: LocationCanonStatusValue | "";
  orderIndex: string;
  coordinateNote: string;
  parent: LinkedLocationParentPreview | null;
  infoSections: UniverseContentSection[];
  notes: string[];
  bannerImage: UploadedWorldImage | null;
};

export default function UniverseLocationEditPage({ slug }: Props) {
  const [entry, setEntry] = useState<UniverseLocationFormInitialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/location-entries/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to load location");
        }

        const data = (await response.json()) as LocationEntryApiResponse;
        const e = data.entry;

        const mappedEntry: UniverseLocationFormInitialData = {
          id: e.id,
          name: e.name ?? "",
          slug: e.slug ?? "",
          description: e.description ?? "",
          locationType: e.locationType as LocationTypeValue,
          originType: e.originType as LocationOriginTypeValue,
          canonStatus: (e.canonStatus as LocationCanonStatusValue | null) ?? "",
          orderIndex:
            e.orderIndex !== null && e.orderIndex !== undefined
              ? String(e.orderIndex)
              : "",
          coordinateNote: e.coordinateNote ?? "",
          parent: e.parentLocation
            ? {
                id: e.parentLocation.id,
                name: e.parentLocation.name,
                slug: e.parentLocation.slug,
                kind: "LOCATION",
                type: e.parentLocation.locationType,
              }
            : e.parentWorld
              ? {
                  id: e.parentWorld.id,
                  name: e.parentWorld.name,
                  slug: e.parentWorld.slug,
                  kind: "WORLD_ENTRY",
                  type: e.parentWorld.type,
                }
              : null,
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
              Loading location...
            </div>
          ) : !entry ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Location not found.
            </div>
          ) : (
            <UniverseLocationCreateForm mode="edit" initialData={entry} />
          )}
        </div>
      </div>
    </main>
  );
}