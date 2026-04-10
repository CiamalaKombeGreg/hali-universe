import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { LocationEntryCreatePayload } from "@/elements/universe/locationTypes";

const VALID_WORLD_PARENT_TYPES = new Set([
  "SERIES_COLLECTION",
  "CONTINUITY",
  "INSTALLMENT",
  "SPINOFF",
  "FANMADE",
  "ORIGINAL_CREATION",
  "CROSSOVER",
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LocationEntryCreatePayload;

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!body.slug?.trim()) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    if (!body.description?.trim()) {
      return NextResponse.json({ error: "Description is required." }, { status: 400 });
    }

    if (!body.bannerImage?.url) {
      return NextResponse.json({ error: "Location visual is required." }, { status: 400 });
    }

    if (!body.parentWorldId && !body.parentLocationId) {
      return NextResponse.json({ error: "A valid parent is required." }, { status: 400 });
    }

    if (body.parentWorldId && body.parentLocationId) {
      return NextResponse.json(
        { error: "A location can only have one parent target at creation." },
        { status: 400 }
      );
    }

    const existing = await prisma.locationEntry.findUnique({
      where: { slug: body.slug },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A location with this slug already exists." },
        { status: 409 }
      );
    }

    if (body.parentWorldId) {
      const parentWorld = await prisma.worldEntry.findUnique({
        where: { id: body.parentWorldId },
        select: { id: true, type: true, canonStatus: true },
      });

      if (!parentWorld) {
        return NextResponse.json({ error: "Parent world entry not found." }, { status: 404 });
      }

      if (!VALID_WORLD_PARENT_TYPES.has(parentWorld.type as never)) {
        return NextResponse.json(
          { error: "This world entry cannot contain locations." },
          { status: 400 }
        );
      }

      if (
        body.originType === "CANON" &&
        parentWorld.type === "FANMADE"
      ) {
        return NextResponse.json(
          {
            error:
              "A canon location cannot be attached directly to a purely fanmade source.",
          },
          { status: 400 }
        );
      }
    }

    if (body.parentLocationId) {
      const parentLocation = await prisma.locationEntry.findUnique({
        where: { id: body.parentLocationId },
        select: { id: true },
      });

      if (!parentLocation) {
        return NextResponse.json({ error: "Parent location not found." }, { status: 404 });
      }
    }

    const created = await prisma.$transaction(async (tx) => {
      const banner = await tx.locationImage.create({
        data: {
          url: body.bannerImage!.url,
          storageKey: body.bannerImage!.storageKey,
          sortOrder: 0,
          isPrimary: true,
        },
      });

      const entry = await tx.locationEntry.create({
        data: {
          name: body.name,
          slug: body.slug,
          description: body.description,
          locationType: body.locationType,
          originType: body.originType,
          canonStatus: body.canonStatus ?? null,
          orderIndex: body.orderIndex ?? null,
          coordinateNote: body.coordinateNote ?? null,
          parentWorldId: body.parentWorldId ?? null,
          parentLocationId: body.parentLocationId ?? null,
          bannerImageId: banner.id,
          infoSections: body.infoSections as Prisma.InputJsonValue,
          notes: body.notes as Prisma.InputJsonValue,
        },
      });

      return entry;
    });

    return NextResponse.json({ success: true, entry: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create location." },
      { status: 500 }
    );
  }
}