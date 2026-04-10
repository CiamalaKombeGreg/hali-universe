import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CANON_STATUSES = new Set([
  "CANON",
  "SEMI_CANON",
  "NON_CANON",
  "ALTERNATE_CANON",
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const entityKind = searchParams.get("entityKind");
  const canonStatus = searchParams.get("canonStatus")?.trim() ?? "";

  const safeCanonStatus = CANON_STATUSES.has(canonStatus)
    ? canonStatus
    : undefined;

  const worldPromise =
    entityKind === "LOCATION"
      ? Promise.resolve([])
      : prisma.worldEntry.findMany({
          where: {
            AND: [
              q
                ? {
                    name: {
                      contains: q,
                      mode: "insensitive",
                    },
                  }
                : {},
              safeCanonStatus ? { canonStatus: safeCanonStatus as never } : {},
            ],
          },
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
            canonStatus: true,
            visibilityStatus: true,
            isPublished: true,
            bannerImage: {
              select: {
                url: true,
              },
            },
          },
          take: 30,
          orderBy: {
            name: "asc",
          },
        });

  const locationPromise =
    entityKind === "WORLD"
      ? Promise.resolve([])
      : prisma.locationEntry.findMany({
          where: {
            AND: [
              q
                ? {
                    name: {
                      contains: q,
                      mode: "insensitive",
                    },
                  }
                : {},
              safeCanonStatus ? { canonStatus: safeCanonStatus as never } : {},
            ],
          },
          select: {
            id: true,
            name: true,
            slug: true,
            locationType: true,
            canonStatus: true,
            bannerImage: {
              select: {
                url: true,
              },
            },
          },
          take: 30,
          orderBy: {
            name: "asc",
          },
        });

  const [worldResults, locationResults] = await Promise.all([
    worldPromise,
    locationPromise,
  ]);

  const results = [
    ...worldResults.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      entityKind: "WORLD" as const,
      type: item.type,
      canonStatus: item.canonStatus,
      visibilityStatus: item.visibilityStatus,
      isPublished: item.isPublished,
      bannerImage: item.bannerImage,
    })),
    ...locationResults.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      entityKind: "LOCATION" as const,
      type: item.locationType,
      canonStatus: item.canonStatus,
      visibilityStatus: "PUBLISHED",
      isPublished: true,
      bannerImage: item.bannerImage,
    })),
  ];

  return NextResponse.json({ results });
}