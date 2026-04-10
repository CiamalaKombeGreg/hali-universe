import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    const [worldEntries, locationEntries] = await Promise.all([
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
        take: 10,
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
        take: 10,
        orderBy: {
          name: "asc",
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
        href: `/universe/wiki/${item.slug}?returnTo=${encodeURIComponent("/universe/wiki")}`,
      })),

      ...locationEntries.map((item) => ({
        id: `location-${item.id}`,
        label: item.name,
        slug: item.slug,
        kind: "Location" as const,
        subkind: item.locationType,
        href: `/universe/wiki/location/${item.slug}?returnTo=${encodeURIComponent("/universe/wiki")}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search universe wiki." },
      { status: 500 }
    );
  }
}