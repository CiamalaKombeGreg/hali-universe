import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type RouteContext = {
  params: Promise<{
    slug: string;
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

export async function POST(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const body = (await request.json()) as Payload;

    const novel = await prisma.novel.findUnique({
      where: { slug },
      include: {
        coverImage: true,
      },
    });

    if (!novel) {
      return NextResponse.json({ error: "Novel not found." }, { status: 404 });
    }

    let coverImageId: string | undefined;

    if (body.coverImage?.url) {
      const cover = await prisma.archiveImage.create({
        data: {
          url: body.coverImage.url,
          storageKey: body.coverImage.storageKey,
          isPrimary: true,
          sortOrder: 0,
        },
      });

      coverImageId = cover.id;
    }

    const created = await prisma.novelChapter.create({
      data: {
        novelId: novel.id,
        title: body.title,
        slug: body.slug,
        subtitle: body.subtitle || null,
        orderIndex: body.orderIndex,
        status: body.status,
        coverImageId,
        contentBlocks: body.contentBlocks,
      },
    });

    return NextResponse.json({ success: true, chapter: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create chapter." },
      { status: 500 }
    );
  }
}