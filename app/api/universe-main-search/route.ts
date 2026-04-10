import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    const [worldEntries, locationEntries, lorebooks, novels] = await Promise.all([
      prisma.worldEntry.findMany({
        where: {
          name: {
            contains: q,
            mode: "insensitive",
          },
          isPublished: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
        },
        take: 8,
        orderBy: {
          name: "asc",
        },
      }),

      prisma.locationEntry.findMany({
        where: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          locationType: true,
        },
        take: 8,
        orderBy: {
          name: "asc",
        },
      }),

      prisma.lorebook.findMany({
        where: {
          title: {
            contains: q,
            mode: "insensitive",
          },
          isPublished: true,
        },
        select: {
          id: true,
          title: true,
          slug: true,
        },
        take: 8,
        orderBy: {
          title: "asc",
        },
      }),

      prisma.novel.findMany({
        where: {
          title: {
            contains: q,
            mode: "insensitive",
          },
          isPublished: true,
        },
        select: {
          id: true,
          title: true,
          slug: true,
        },
        take: 8,
        orderBy: {
          title: "asc",
        },
      }),
    ]);

    const results = [
      ...worldEntries.map((item) => ({
        id: `world-${item.id}`,
        label: item.name,
        slug: item.slug,
        kind: "World" as const,
        subkind: item.type,
        href: `/universe/wiki/${item.slug}?returnTo=${encodeURIComponent("/universe")}`,
      })),

      ...locationEntries.map((item) => ({
        id: `location-${item.id}`,
        label: item.name,
        slug: item.slug,
        kind: "Location" as const,
        subkind: item.locationType,
        href: `/universe/wiki/location/${item.slug}?returnTo=${encodeURIComponent("/universe")}`,
      })),

      ...lorebooks.map((item) => ({
        id: `lorebook-${item.id}`,
        label: item.title,
        slug: item.slug,
        kind: "Lorebook" as const,
        subkind: "Archive",
        href: `/universe/lorebook/${item.slug}?returnTo=${encodeURIComponent("/universe")}`,
      })),

      ...novels.map((item) => ({
        id: `novel-${item.id}`,
        label: item.title,
        slug: item.slug,
        kind: "Novel" as const,
        subkind: "Archive",
        href: `/universe/lorebook/novels/${item.slug}?returnTo=${encodeURIComponent("/universe")}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search universe main index." },
      { status: 500 }
    );
  }
}