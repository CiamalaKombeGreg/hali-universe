import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function shuffleArray<T>(items: T[]) {
  const array = [...items];

  for (let index = array.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]];
  }

  return array;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit") ?? "30"), 100);

    const rawImages = await prisma.galleryImage.findMany({
      include: {
        portfolio: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 500,
      orderBy: {
        createdAt: "desc",
      },
    });

    const shuffled = shuffleArray(rawImages).slice(0, limit);

    const images = shuffled.map((image) => ({
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
    }));

    return NextResponse.json({
      images,
      hasMore: false,
      total: images.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load random gallery images." },
      { status: 500 }
    );
  }
}