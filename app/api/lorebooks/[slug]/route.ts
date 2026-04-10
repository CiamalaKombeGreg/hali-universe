import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { minioClient, MINIO_BUCKET } from "@/lib/minio";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const lorebook = await prisma.lorebook.findUnique({
      where: { slug },
      include: {
        coverImage: true,
      },
    });

    if (!lorebook) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ lorebook });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load lorebook." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const lorebook = await prisma.lorebook.findUnique({
      where: { slug },
      include: {
        coverImage: true,
      },
    });

    if (!lorebook) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (lorebook.coverImage?.storageKey) {
      try {
        await minioClient.removeObject(MINIO_BUCKET, lorebook.coverImage.storageKey);
      } catch (error) {
        console.error("Failed to delete lorebook cover", error);
      }
    }

    await prisma.lorebook.delete({
      where: { id: lorebook.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete lorebook." },
      { status: 500 }
    );
  }
}