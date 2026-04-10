import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_WORLD_PARENT_TYPES = [
  "SERIES_COLLECTION",
  "CONTINUITY",
  "INSTALLMENT",
  "SPINOFF",
  "FANMADE",
  "ORIGINAL_CREATION",
  "CROSSOVER",
] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const [worldEntries, locations] = await Promise.all([
    prisma.worldEntry.findMany({
      where: {
        type: {
          in: [...VALID_WORLD_PARENT_TYPES],
        },
        name: {
          contains: q,
          mode: "insensitive",
        },
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
  ]);

  const results = [
    ...worldEntries.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      kind: "WORLD_ENTRY" as const,
      type: item.type,
    })),
    ...locations.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      kind: "LOCATION" as const,
      type: item.locationType,
    })),
  ].slice(0, 12);

  return NextResponse.json({ results });
}