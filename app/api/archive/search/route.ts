import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    const [lorebooks, novels] = await Promise.all([
      prisma.lorebook.findMany({
        where: {
          isPublished: true,
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
          slug: true,
        },
        take: 10,
        orderBy: {
          title: "asc",
        },
      }),
      prisma.novel.findMany({
        where: {
          isPublished: true,
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
          slug: true,
        },
        take: 10,
        orderBy: {
          title: "asc",
        },
      }),
    ]);

    const results = [
      ...lorebooks.map((item) => ({
        id: `lorebook-${item.id}`,
        label: item.title,
        slug: item.slug,
        kind: "Lorebook",
        href: `/universe/lorebook/${item.slug}`,
      })),
      ...novels.map((item) => ({
        id: `novel-${item.id}`,
        label: item.title,
        slug: item.slug,
        kind: "Novel",
        href: `/universe/lorebook/novels/${item.slug}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search archive." },
      { status: 500 }
    );
  }
}