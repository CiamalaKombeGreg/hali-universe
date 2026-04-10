import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 100);
    const offset = Math.max(Number(searchParams.get("offset") ?? "0"), 0);

    if (!q) {
      return NextResponse.json({
        images: [],
        hasMore: false,
        total: 0,
      });
    }

    const [images, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where: {
          OR: [
            {
              title: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              altText: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              portfolio: {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            },
          ],
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
            createdAt: "desc",
          },
          {
            sortOrder: "asc",
          },
        ],
        skip: offset,
        take: limit,
      }),
      prisma.galleryImage.count({
        where: {
          OR: [
            {
              title: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              altText: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              portfolio: {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
      }),
    ]);

    return NextResponse.json({
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
      { error: "Failed to search gallery images." },
      { status: 500 }
    );
  }
}