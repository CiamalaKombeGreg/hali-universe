import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Payload = {
  name: string;
  slug: string;
  type: string;
  family?: string | null;
  shortDescriptionParts: Prisma.InputJsonValue;
  notes: Prisma.InputJsonValue;
  hierarchyLevel?: string | null;
  status: "DRAFT" | "PUBLISHED";
  isActive: boolean;
  mainImage: {
    url: string;
    storageKey?: string;
  } | null;
  secondaryImages: {
    url: string;
    storageKey?: string;
    caption?: string;
    altText?: string;
  }[];
  parentId?: string | null;
  childIds: string[];
  contentSections: Prisma.InputJsonValue;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!body.slug?.trim()) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    if (!body.mainImage?.url) {
      return NextResponse.json({ error: "Main image is required." }, { status: 400 });
    }

    const requiresChildAbility =
      body.type === "SYSTEM" ||
      body.type === "SUBSYSTEM" ||
      body.type === "ASSOCIATION_SYSTEM";

    if (
      requiresChildAbility &&
      body.status === "PUBLISHED" &&
      body.childIds.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Published systems and sub-systems require at least one child ability or node.",
        },
        { status: 400 }
      );
    }

    const existingSlug = await prisma.abilityNode.findUnique({
      where: { slug: body.slug },
      select: { id: true },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "A node with this slug already exists." },
        { status: 409 }
      );
    }

    const created = await prisma.$transaction(async (tx) => {
      const secondaryImageRecords = await Promise.all(
        body.secondaryImages.map((image, index) =>
          tx.abilityNodeImage.create({
            data: {
              url: image.url,
              storageKey: image.storageKey,
              caption: image.caption,
              altText: image.altText,
              sortOrder: index + 1,
              isPrimary: false,
            },
          })
        )
      );

      const mainImageRecord = await tx.abilityNodeImage.create({
        data: {
          url: body.mainImage!.url,
          storageKey: body.mainImage!.storageKey,
          sortOrder: 0,
          isPrimary: true,
        },
      });

      const node = await tx.abilityNode.create({
        data: {
          name: body.name,
          slug: body.slug,
          type: body.type as never,
          family: body.family ? (body.family as never) : null,
          shortDescriptionParts: body.shortDescriptionParts,
          notes: body.notes,
          hierarchyLevel: body.hierarchyLevel ?? null,
          status: body.status,
          isActive: body.isActive,
          parentId: body.parentId ?? null,
          contentSections: body.contentSections,
          mainImageId: mainImageRecord.id,
          images: {
            connect: [
              { id: mainImageRecord.id },
              ...secondaryImageRecords.map((image) => ({ id: image.id })),
            ],
          },
        },
      });

      if (body.childIds.length > 0) {
        await tx.abilityNode.updateMany({
          where: {
            id: {
              in: body.childIds,
            },
          },
          data: {
            parentId: node.id,
          },
        });
      }

      return tx.abilityNode.findUnique({
        where: { id: node.id },
        include: {
          mainImage: true,
          parent: {
            select: {
              id: true,
              name: true,
              slug: true,
              type: true,
            },
          },
          children: {
            select: {
              id: true,
              name: true,
              slug: true,
              type: true,
            },
            orderBy: {
              name: "asc",
            },
          },
        },
      });
    });

    return NextResponse.json({ success: true, node: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create ability node." },
      { status: 500 }
    );
  }
}