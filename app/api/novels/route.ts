import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Payload = {
  title: string;
  slug: string;
  authorName: string;
  summary: string;
  visibilityStatus: "DRAFT" | "PUBLISHED";
  isPublished: boolean;
  coverImage: {
    url: string;
    storageKey?: string;
  } | null;
  tags: string[];
  linkedWorldId?: string | null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    if (!body.slug?.trim()) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    if (!body.authorName?.trim()) {
      return NextResponse.json({ error: "Author name is required." }, { status: 400 });
    }

    if (!body.coverImage?.url) {
      return NextResponse.json({ error: "Cover image is required." }, { status: 400 });
    }

    const created = await prisma.$transaction(async (tx) => {
      const cover = await tx.archiveImage.create({
        data: {
          url: body.coverImage!.url,
          storageKey: body.coverImage!.storageKey,
          isPrimary: true,
          sortOrder: 0,
        },
      });

      const novel = await tx.novel.create({
        data: {
          title: body.title,
          slug: body.slug,
          authorName: body.authorName,
          summary: body.summary || null,
          visibilityStatus: body.visibilityStatus,
          isPublished: body.isPublished,
          coverImageId: cover.id,
          tags: body.tags as Prisma.InputJsonValue,
          linkedWorldId: body.linkedWorldId ?? null,
        },
      });

      return novel;
    });

    return NextResponse.json({ success: true, novel: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create novel." },
      { status: 500 }
    );
  }
}