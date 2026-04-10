import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { minioClient, MINIO_BUCKET } from "@/lib/minio";

type RouteContext = {
  params: Promise<{
    slug: string;
    chapterSlug: string;
  }>;
};

type Payload = {
  title: string;
  slug: string;
  subtitle?: string;
  orderIndex: number;
  status: "DRAFT" | "PUBLISHED";
  coverImage: {
    url: string;
    storageKey?: string;
  } | null;
  contentBlocks: Prisma.InputJsonValue;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { slug, chapterSlug } = await context.params;

    const novel = await prisma.novel.findUnique({
      where: { slug },
    });

    if (!novel) {
      return NextResponse.json({ error: "Novel not found." }, { status: 404 });
    }

    const chapter = await prisma.novelChapter.findFirst({
      where: {
        novelId: novel.id,
        slug: chapterSlug,
      },
      include: {
        coverImage: true,
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found." }, { status: 404 });
    }

    return NextResponse.json({ chapter, novel });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load chapter." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { slug, chapterSlug } = await context.params;
    const body = (await request.json()) as Payload;

    const novel = await prisma.novel.findUnique({
      where: { slug },
    });

    if (!novel) {
      return NextResponse.json({ error: "Novel not found." }, { status: 404 });
    }

    const chapter = await prisma.novelChapter.findFirst({
      where: {
        novelId: novel.id,
        slug: chapterSlug,
      },
      include: {
        coverImage: true,
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found." }, { status: 404 });
    }

    let nextCoverImageId = chapter.coverImageId;

    if (
      body.coverImage?.url &&
      body.coverImage.url !== chapter.coverImage?.url
    ) {
      const newCover = await prisma.archiveImage.create({
        data: {
          url: body.coverImage.url,
          storageKey: body.coverImage.storageKey,
          isPrimary: true,
          sortOrder: 0,
        },
      });

      nextCoverImageId = newCover.id;

      if (chapter.coverImage?.storageKey) {
        try {
          await minioClient.removeObject(MINIO_BUCKET, chapter.coverImage.storageKey);
        } catch (error) {
          console.error("Failed to delete old chapter cover", error);
        }
      }

      if (chapter.coverImageId) {
        await prisma.archiveImage.deleteMany({
          where: { id: chapter.coverImageId },
        });
      }
    }

    const updated = await prisma.novelChapter.update({
      where: { id: chapter.id },
      data: {
        title: body.title,
        slug: body.slug,
        subtitle: body.subtitle || null,
        orderIndex: body.orderIndex,
        status: body.status,
        coverImageId: nextCoverImageId,
        contentBlocks: body.contentBlocks,
      },
    });

    return NextResponse.json({ success: true, chapter: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update chapter." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { slug, chapterSlug } = await context.params;

    const novel = await prisma.novel.findUnique({
      where: { slug },
    });

    if (!novel) {
      return NextResponse.json({ error: "Novel not found." }, { status: 404 });
    }

    const chapter = await prisma.novelChapter.findFirst({
      where: {
        novelId: novel.id,
        slug: chapterSlug,
      },
      include: {
        coverImage: true,
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found." }, { status: 404 });
    }

    if (chapter.coverImage?.storageKey) {
      try {
        await minioClient.removeObject(MINIO_BUCKET, chapter.coverImage.storageKey);
      } catch (error) {
        console.error("Failed to delete chapter cover", error);
      }
    }

    await prisma.novelChapter.delete({
      where: { id: chapter.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete chapter." },
      { status: 500 }
    );
  }
}