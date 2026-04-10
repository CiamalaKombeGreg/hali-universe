import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { minioClient, MINIO_BUCKET } from "@/lib/minio";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

type Payload = {
  name: string;
  slug: string;
  description: string;
  locationType: string;
  originType: string;
  canonStatus?: string | null;
  orderIndex?: number | null;
  coordinateNote?: string | null;
  parentWorldId?: string | null;
  parentLocationId?: string | null;
  bannerImage: {
    url: string;
    storageKey?: string;
  } | null;
  infoSections: Prisma.InputJsonValue;
  notes: Prisma.InputJsonValue;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const entry = await prisma.locationEntry.findUnique({
      where: { slug },
      include: {
        bannerImage: true,
        parentWorld: {
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
          },
        },
        parentLocation: {
          select: {
            id: true,
            name: true,
            slug: true,
            locationType: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
            locationType: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const allLorebooks = await prisma.lorebook.findMany({
      where: {
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        linkedLocationIds: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    const relatedLorebooks = allLorebooks.filter((item) => {
      if (!Array.isArray(item.linkedLocationIds)) return false;
      return item.linkedLocationIds.includes(entry.id);
    });

    return NextResponse.json({
      entry: {
        ...entry,
        relatedLorebooks,
        relatedNovels: [],
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load location entry." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const body = (await request.json()) as Payload;

    const existing = await prisma.locationEntry.findUnique({
      where: { slug },
      include: {
        bannerImage: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let nextBannerId = existing.bannerImageId;

    const updated = await prisma.$transaction(async (tx) => {
      if (
        body.bannerImage?.url &&
        body.bannerImage.url !== existing.bannerImage?.url
      ) {
        const newBanner = await tx.locationImage.create({
          data: {
            url: body.bannerImage.url,
            storageKey: body.bannerImage.storageKey,
            isPrimary: true,
            sortOrder: 0,
          },
        });

        nextBannerId = newBanner.id;

        if (existing.bannerImage?.storageKey) {
          try {
            await minioClient.removeObject(
              MINIO_BUCKET,
              existing.bannerImage.storageKey
            );
          } catch (error) {
            console.error("Failed to delete old location banner", error);
          }
        }

        if (existing.bannerImageId) {
          await tx.locationImage.deleteMany({
            where: { id: existing.bannerImageId },
          });
        }
      }

      const entry = await tx.locationEntry.update({
        where: { id: existing.id },
        data: {
          name: body.name,
          slug: body.slug,
          description: body.description,
          locationType: body.locationType as never,
          originType: body.originType as never,
          canonStatus: body.canonStatus ? (body.canonStatus as never) : null,
          orderIndex: body.orderIndex ?? null,
          coordinateNote: body.coordinateNote ?? null,
          parentWorldId: body.parentWorldId ?? null,
          parentLocationId: body.parentLocationId ?? null,
          bannerImageId: nextBannerId,
          infoSections: body.infoSections as Prisma.InputJsonValue,
          notes: body.notes as Prisma.InputJsonValue,
        },
      });

      return entry;
    });

    return NextResponse.json({ success: true, entry: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update location entry." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const entry = await prisma.locationEntry.findUnique({
      where: { slug },
      include: {
        bannerImage: true,
      },
    });

    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (entry.bannerImage?.storageKey) {
      try {
        await minioClient.removeObject(MINIO_BUCKET, entry.bannerImage.storageKey);
      } catch (error) {
        console.error("Failed to delete location banner", error);
      }
    }

    await prisma.locationEntry.delete({
      where: { id: entry.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete location." },
      { status: 500 }
    );
  }
}