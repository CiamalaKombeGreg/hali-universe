import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";

    const portfolios = await prisma.galleryPortfolio.findMany({
      where: q
        ? {
            name: {
              contains: q,
              mode: "insensitive",
            },
          }
        : undefined,
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            images: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      take: 20,
    });

    const results = portfolios.map((item) => ({
      id: item.id,
      name: item.name,
      imageCount: item._count.images,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search portfolios." },
      { status: 500 }
    );
  }
}