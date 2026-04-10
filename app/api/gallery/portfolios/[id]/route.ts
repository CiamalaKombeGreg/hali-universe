import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { minioClient, MINIO_BUCKET } from "@/lib/minio";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type Payload = {
  name: string;
  images: {
    id?: string;
    title?: string | null;
    altText?: string | null;
    externalLink?: string | null;
    sourceType: "UPLOADED" | "EXTERNAL";
    imageUrl: string;
    storageKey?: string | null;
    sortOrder: number;
  }[];
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const portfolio = await prisma.galleryPortfolio.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
    }

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load portfolio." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Payload;

    const existing = await prisma.galleryPortfolio.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
    }

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

    const incomingIds = new Set(
      body.images.map((image) => image.id).filter((id): id is string => Boolean(id))
    );

    const removedImages = existing.images.filter((image) => !incomingIds.has(image.id));

    for (const image of removedImages) {
      if (image.storageKey) {
        try {
          await minioClient.removeObject(MINIO_BUCKET, image.storageKey);
        } catch (error) {
          console.error(`Failed to delete removed gallery image ${image.storageKey}`, error);
        }
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.galleryPortfolio.update({
        where: { id },
        data: {
          name: body.name.trim(),
        },
      });

      await tx.galleryImage.deleteMany({
        where: {
          portfolioId: id,
          id: {
            notIn: Array.from(incomingIds),
          },
        },
      });

      for (const image of body.images) {
        if (image.id) {
          await tx.galleryImage.update({
            where: { id: image.id },
            data: {
              title: image.title?.trim() || null,
              altText: image.altText?.trim() || null,
              externalLink: image.externalLink?.trim() || null,
              sourceType: image.sourceType,
              imageUrl: image.imageUrl,
              storageKey: image.storageKey || null,
              sortOrder: image.sortOrder ?? 0,
            },
          });
        } else {
          await tx.galleryImage.create({
            data: {
              portfolioId: id,
              title: image.title?.trim() || null,
              altText: image.altText?.trim() || null,
              externalLink: image.externalLink?.trim() || null,
              sourceType: image.sourceType,
              imageUrl: image.imageUrl,
              storageKey: image.storageKey || null,
              sortOrder: image.sortOrder ?? 0,
            },
          });
        }
      }
    });

    const updated = await prisma.galleryPortfolio.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    return NextResponse.json({ success: true, portfolio: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update portfolio." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const portfolio = await prisma.galleryPortfolio.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
    }

    for (const image of portfolio.images) {
      if (image.storageKey) {
        try {
          await minioClient.removeObject(MINIO_BUCKET, image.storageKey);
        } catch (error) {
          console.error(`Failed to delete gallery object ${image.storageKey}`, error);
        }
      }
    }

    await prisma.galleryPortfolio.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete portfolio." },
      { status: 500 }
    );
  }
}