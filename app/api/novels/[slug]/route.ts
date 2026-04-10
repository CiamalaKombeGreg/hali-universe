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

    const novel = await prisma.novel.findUnique({
      where: { slug },
      include: {
        coverImage: true,
        linkedWorld: {
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
          },
        },
        chapters: {
          select: {
            id: true,
            title: true,
            slug: true,
            subtitle: true,
            orderIndex: true,
            status: true,
            coverImage: {
              select: {
                id: true,
                url: true,
                storageKey: true,
              },
            },
          },
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });

    if (!novel) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ novel });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load novel." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const novel = await prisma.novel.findUnique({
      where: { slug },
      include: {
        coverImage: true,
        chapters: {
          include: {
            coverImage: true,
          },
        },
      },
    });

    if (!novel) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const keys = [
      novel.coverImage?.storageKey,
      ...novel.chapters.map((chapter) => chapter.coverImage?.storageKey),
    ].filter((key): key is string => Boolean(key));

    await Promise.all(
      keys.map(async (key) => {
        try {
          await minioClient.removeObject(MINIO_BUCKET, key);
        } catch (error) {
          console.error(`Failed to delete object ${key}`, error);
        }
      })
    );

    await prisma.novel.delete({
      where: { id: novel.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete novel." },
      { status: 500 }
    );
  }
}