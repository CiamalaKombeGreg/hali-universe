import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Payload = {
  name: string;
  images: {
    title?: string | null;
    altText?: string | null;
    externalLink?: string | null;
    sourceType: "UPLOADED" | "EXTERNAL";
    imageUrl: string;
    storageKey?: string | null;
    sortOrder: number;
  }[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;

    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "Portfolio name is required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.images) || body.images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required." },
        { status: 400 }
      );
    }

    const created = await prisma.$transaction(async (tx) => {
      const portfolio = await tx.galleryPortfolio.create({
        data: {
          name: body.name.trim(),
        },
      });

      await tx.galleryImage.createMany({
        data: body.images.map((image) => ({
          portfolioId: portfolio.id,
          title: image.title?.trim() || null,
          altText: image.altText?.trim() || null,
          externalLink: image.externalLink?.trim() || null,
          sourceType: image.sourceType as Prisma.EnumGalleryImageSourceTypeFieldUpdateOperationsInput["set"] extends never
            ? never
            : "UPLOADED" | "EXTERNAL",
          imageUrl: image.imageUrl,
          storageKey: image.storageKey || null,
          sortOrder: image.sortOrder ?? 0,
        })),
      });

      return tx.galleryPortfolio.findUnique({
        where: { id: portfolio.id },
        include: {
          _count: {
            select: {
              images: true,
            },
          },
        },
      });
    });

    return NextResponse.json({ success: true, portfolio: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create portfolio." },
      { status: 500 }
    );
  }
}