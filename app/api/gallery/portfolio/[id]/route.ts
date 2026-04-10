import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 100);
    const offset = Math.max(Number(searchParams.get("offset") ?? "0"), 0);

    const portfolio = await prisma.galleryPortfolio.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
    }

    const [images, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where: {
          portfolioId: id,
        },
        include: {
          portfolio: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
        skip: offset,
        take: limit,
      }),
      prisma.galleryImage.count({
        where: {
          portfolioId: id,
        },
      }),
    ]);

    return NextResponse.json({
      portfolio,
      images: images.map((image) => ({
        id: image.id,
        portfolioId: image.portfolio.id,
        portfolioName: image.portfolio.name,
        title: image.title,
        altText: image.altText,
        externalLink: image.externalLink,
        sourceType: image.sourceType,
        imageUrl: image.imageUrl,
        storageKey: image.storageKey,
        sortOrder: image.sortOrder,
      })),
      hasMore: offset + images.length < total,
      total,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load portfolio images." },
      { status: 500 }
    );
  }
}