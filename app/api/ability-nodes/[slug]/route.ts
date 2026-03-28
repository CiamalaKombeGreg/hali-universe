import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { minioClient, MINIO_BUCKET } from "@/lib/minio";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

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

export async function GET(_: Request, context: RouteContext) {
  const { slug } = await context.params;

  const node = await prisma.abilityNode.findUnique({
    where: {
      slug,
    },
    include: {
      mainImage: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
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

  if (!node) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ node });
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const body = (await request.json()) as Payload;

    const existingNode = await prisma.abilityNode.findUnique({
      where: { slug },
      include: {
        images: true,
        mainImage: true,
      },
    });

    if (!existingNode) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

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

    const updated = await prisma.$transaction(async (tx) => {
      const currentImageIds = new Set(existingNode.images.map((img) => img.id));

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

      const node = await tx.abilityNode.update({
        where: { slug },
        data: {
          name: body.name,
          slug: body.slug,
          type: body.type as never,
          family: body.family ? (body.family as never) : null,
          shortDescriptionParts: body.shortDescriptionParts,
          notes: body.notes,
          hierarchyLevel: body.hierarchyLevel,
          status: body.status,
          isActive: body.isActive,
          parentId: body.parentId ?? null,
          contentSections: body.contentSections,
          mainImageId: mainImageRecord.id,
          images: {
            set: [],
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

      const oldImagesToDelete = existingNode.images.filter((img) =>
        currentImageIds.has(img.id)
      );

      for (const image of oldImagesToDelete) {
        if (image.storageKey) {
          try {
            await minioClient.removeObject(MINIO_BUCKET, image.storageKey);
          } catch (error) {
            console.error(`Failed to delete old image ${image.storageKey}`, error);
          }
        }
      }

      await tx.abilityNodeImage.deleteMany({
        where: {
          id: {
            in: existingNode.images.map((img) => img.id),
          },
        },
      });

      return node;
    });

    return NextResponse.json({ success: true, node: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update ability node." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const node = await prisma.abilityNode.findUnique({
      where: { slug },
      include: {
        images: true,
      },
    });

    if (!node) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const keys = node.images
      .map((image) => image.storageKey)
      .filter((key): key is string => Boolean(key));

    if (keys.length > 0) {
      await Promise.all(
        keys.map(async (key) => {
          try {
            await minioClient.removeObject(MINIO_BUCKET, key);
          } catch (error) {
            console.error(`Failed to delete object ${key}`, error);
          }
        })
      );
    }

    await prisma.abilityNode.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete ability node." },
      { status: 500 }
    );
  }
}