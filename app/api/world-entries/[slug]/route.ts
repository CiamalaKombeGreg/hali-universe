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
  summary: string;
  type: string;
  canonStatus?: string | null;
  cosmologyType?: string | null;
  visibilityStatus: "DRAFT" | "PUBLISHED";
  isPublished: boolean;

  sourceNote?: string;
  inspirationNote?: string;
  officialPublisher?: string;
  creator?: string;
  branchDescription?: string;
  divergenceNote?: string;
  approvalNote?: string;
  sourceSeriesNote?: string;
  installmentOrder?: number | null;
  installmentCode?: string | null;

  isStandaloneContainer?: boolean;
  allowOriginalCreations?: boolean;
  allowOfficialSeries?: boolean;
  hasMultipleContinuities?: boolean;
  isFullyIndependent?: boolean;
  officialCrossover?: boolean;

  parentId?: string | null;
  sourceEntryIds: string[];
  linkedAbilityIds: string[];
  tags: string[];

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

    const entry = await prisma.worldEntry.findUnique({
      where: { slug },
      include: {
        bannerImage: true,
        tags: true,
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
            visibilityStatus: true,
            isPublished: true,
          },
          orderBy: {
            name: "asc",
          },
        },
        crossoverSources: {
          include: {
            sourceEntry: {
              select: {
                id: true,
                name: true,
                slug: true,
                type: true,
              },
            },
          },
        },
        linkedAbilities: {
          include: {
            abilityNode: {
              select: {
                id: true,
                name: true,
                slug: true,
                type: true,
                status: true,
              },
            },
          },
        },
        locations: {
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

    const [allLorebooks, allNovels] = await Promise.all([
      prisma.lorebook.findMany({
        where: {
          isPublished: true,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          linkedWorldIds: true,
        },
        orderBy: {
          title: "asc",
        },
      }),
      prisma.novel.findMany({
        where: {
          isPublished: true,
          linkedWorldId: entry.id,
        },
        select: {
          id: true,
          title: true,
          slug: true,
        },
        orderBy: {
          title: "asc",
        },
      }),
    ]);

    const relatedLorebooks = allLorebooks.filter((item) => {
      if (!Array.isArray(item.linkedWorldIds)) return false;
      return item.linkedWorldIds.includes(entry.id);
    });

    return NextResponse.json({
      entry: {
        ...entry,
        relatedLorebooks,
        relatedNovels: allNovels,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load world entry." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const body = (await request.json()) as Payload;

    const existing = await prisma.worldEntry.findUnique({
      where: { slug },
      include: {
        bannerImage: true,
        tags: true,
        linkedAbilities: true,
        crossoverSources: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      let nextBannerId = existing.bannerImageId;

      if (
        body.bannerImage?.url &&
        body.bannerImage.url !== existing.bannerImage?.url
      ) {
        const newBanner = await tx.worldEntryImage.create({
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
            console.error("Failed to delete old world banner", error);
          }
        }

        if (existing.bannerImageId) {
          await tx.worldEntryImage.deleteMany({
            where: { id: existing.bannerImageId },
          });
        }
      }

      await tx.worldEntryTag.deleteMany({
        where: { worldEntryId: existing.id },
      });

      await tx.worldEntryAbility.deleteMany({
        where: { worldEntryId: existing.id },
      });

      await tx.worldEntrySource.deleteMany({
        where: { worldEntryId: existing.id },
      });

      const entry = await tx.worldEntry.update({
        where: { id: existing.id },
        data: {
          name: body.name,
          slug: body.slug,
          description: body.description,
          summary: body.summary,
          type: body.type as never,
          canonStatus: body.canonStatus ? (body.canonStatus as never) : null,
          cosmologyType: body.cosmologyType
            ? (body.cosmologyType as never)
            : null,
          visibilityStatus: body.visibilityStatus as never,
          isPublished: body.isPublished,

          sourceNote: body.sourceNote || null,
          inspirationNote: body.inspirationNote || null,
          officialPublisher: body.officialPublisher || null,
          creator: body.creator || null,
          branchDescription: body.branchDescription || null,
          divergenceNote: body.divergenceNote || null,
          approvalNote: body.approvalNote || null,
          sourceSeriesNote: body.sourceSeriesNote || null,
          installmentOrder: body.installmentOrder ?? null,
          installmentCode: body.installmentCode || null,

          isStandaloneContainer: body.isStandaloneContainer ?? false,
          allowOriginalCreations: body.allowOriginalCreations ?? false,
          allowOfficialSeries: body.allowOfficialSeries ?? false,
          hasMultipleContinuities: body.hasMultipleContinuities ?? false,
          isFullyIndependent: body.isFullyIndependent ?? false,
          officialCrossover: body.officialCrossover ?? false,

          parentId: body.parentId ?? null,
          bannerImageId: nextBannerId,
          infoSections: body.infoSections as Prisma.InputJsonValue,
          notes: body.notes as Prisma.InputJsonValue,
        },
      });

      if (body.tags.length > 0) {
        await tx.worldEntryTag.createMany({
          data: body.tags.map((tag) => ({
            worldEntryId: entry.id,
            label: tag,
          })),
        });
      }

      if (body.linkedAbilityIds.length > 0) {
        await tx.worldEntryAbility.createMany({
          data: body.linkedAbilityIds.map((abilityId) => ({
            worldEntryId: entry.id,
            abilityNodeId: abilityId,
          })),
        });
      }

      if (body.sourceEntryIds.length > 0) {
        await tx.worldEntrySource.createMany({
          data: body.sourceEntryIds.map((sourceEntryId) => ({
            worldEntryId: entry.id,
            sourceEntryId,
          })),
        });
      }

      return entry;
    });

    return NextResponse.json({ success: true, entry: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update world entry." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const entry = await prisma.worldEntry.findUnique({
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
        console.error("Failed to delete world entry banner", error);
      }
    }

    await prisma.worldEntry.delete({
      where: { id: entry.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete world entry." },
      { status: 500 }
    );
  }
}