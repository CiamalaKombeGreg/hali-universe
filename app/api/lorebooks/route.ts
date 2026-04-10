import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Payload = {
  title: string;
  slug: string;
  description: string;
  visibilityStatus: "DRAFT" | "PUBLISHED";
  isPublished: boolean;
  coverImage: {
    url: string;
    storageKey?: string;
  } | null;
  contentSections: Prisma.InputJsonValue;
  linkedWorldIds: string[];
  linkedLocationIds: string[];
  linkedCharacterIds: string[];
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

      const lorebook = await tx.lorebook.create({
        data: {
          title: body.title,
          slug: body.slug,
          description: body.description || null,
          visibilityStatus: body.visibilityStatus,
          isPublished: body.isPublished,
          coverImageId: cover.id,
          contentSections: body.contentSections,
          linkedWorldIds: body.linkedWorldIds as Prisma.InputJsonValue,
          linkedLocationIds: body.linkedLocationIds as Prisma.InputJsonValue,
          linkedCharacterIds: body.linkedCharacterIds as Prisma.InputJsonValue,
        },
      });

      return lorebook;
    });

    return NextResponse.json({ success: true, lorebook: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create lorebook." },
      { status: 500 }
    );
  }
}