import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { WorldEntryCreatePayload } from "@/elements/universe/worldEntryTypes";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WorldEntryCreatePayload;

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!body.slug?.trim()) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    if (!body.bannerImage?.url) {
      return NextResponse.json({ error: "Banner image is required." }, { status: 400 });
    }

    if (
      (
        body.type === "CONTINUITY" ||
        body.type === "INSTALLMENT" ||
        body.type === "SPINOFF" ||
        body.type === "FANMADE"
      ) &&
      !body.parentId
    ) {
      return NextResponse.json(
        { error: "This entry type requires a parent series collection or Original Creation." },
        { status: 400 }
      );
    }

    if (body.parentId) {
      const parent = await prisma.worldEntry.findUnique({
        where: { id: body.parentId },
        select: { id: true, type: true },
      });

      if (!parent) {
        return NextResponse.json({ error: "Parent entry not found." }, { status: 404 });
      }

      if (body.type === "CONTINUITY" && parent.type !== "SERIES_COLLECTION" && parent.type !== "ORIGINAL_CREATION") {
        return NextResponse.json(
          { error: "A continuity must have a parent series collection or original creation." },
          { status: 400 }
        );
      }

      if (body.type === "INSTALLMENT" && parent.type !== "CONTINUITY" && parent.type !== "FANMADE" && parent.type !== "SPINOFF") {
        return NextResponse.json(
          { error: "An installment must have a parent continuity, fanmade or spinoff." },
          { status: 400 }
        );
      }

      if (body.type === "SPINOFF" && parent.type !== "SERIES_COLLECTION" && parent.type !== "ORIGINAL_CREATION") {
        return NextResponse.json(
          { error: "A spinoff must have a parent series collection or original creation." },
          { status: 400 }
        );
      }

      if (body.type === "FANMADE" && parent.type !== "SERIES_COLLECTION") {
        return NextResponse.json(
          { error: "A fanmade work must have a parent series collection." },
          { status: 400 }
        );
      }

      if (
        body.type === "SERIES_COLLECTION" &&
        parent.type !== "UNIVERSE"
      ) {
        return NextResponse.json(
          { error: "A series collection can only optionally belong to a universe." },
          { status: 400 }
        );
      }

      if (
        body.type === "ORIGINAL_CREATION" &&
        parent.type !== "UNIVERSE"
      ) {
        return NextResponse.json(
          { error: "An original creation can only optionally belong to a universe." },
          { status: 400 }
        );
      }

      if (body.type === "CROSSOVER") {
        return NextResponse.json(
          { error: "A crossover cannot belong to a parent universe or world entry." },
          { status: 400 }
        );
      }
    }

    if (body.type === "CROSSOVER" && body.sourceEntryIds.length < 2) {
      return NextResponse.json(
        { error: "A crossover requires at least 2 linked source materials." },
        { status: 400 }
      );
    }

    const existing = await prisma.worldEntry.findUnique({
      where: { slug: body.slug },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A world entry with this slug already exists." },
        { status: 409 }
      );
    }

    const created = await prisma.$transaction(async (tx) => {
      const banner = await tx.worldEntryImage.create({
        data: {
          url: body.bannerImage!.url,
          storageKey: body.bannerImage!.storageKey,
          sortOrder: 0,
          isPrimary: true,
        },
      });

      const entry = await tx.worldEntry.create({
        data: {
          name: body.name,
          slug: body.slug,
          description: body.description,
          summary: body.summary,
          type: body.type,
          canonStatus: body.canonStatus ?? null,
          cosmologyType: body.cosmologyType ?? null,
          visibilityStatus: body.visibilityStatus,
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
          installmentCode: body.installmentCode ?? null,

          infoSections: body.infoSections as Prisma.InputJsonValue,
          notes: body.notes as Prisma.InputJsonValue,
          
          isStandaloneContainer: body.isStandaloneContainer ?? null,
          allowOriginalCreations: body.allowOriginalCreations ?? null,
          allowOfficialSeries: body.allowOfficialSeries ?? null,
          hasMultipleContinuities: body.hasMultipleContinuities ?? null,
          isFullyIndependent: body.isFullyIndependent ?? null,
          officialCrossover: body.officialCrossover ?? null,

          parentId: body.parentId ?? null,
          bannerImageId: banner.id,
        },
      });

      if (body.tags.length > 0) {
        await tx.worldEntryTag.createMany({
          data: body.tags.map((label) => ({
            label,
            worldEntryId: entry.id,
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

      if (body.linkedAbilityIds.length > 0) {
        await tx.worldEntryAbility.createMany({
          data: body.linkedAbilityIds.map((abilityNodeId) => ({
            worldEntryId: entry.id,
            abilityNodeId,
          })),
        });
      }

      return entry;
    });

    return NextResponse.json({ success: true, entry: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create world entry." },
      { status: 500 }
    );
  }
}