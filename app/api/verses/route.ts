import { prisma } from "@/lib/prisma";

export async function GET() {
  const verses = await prisma.verse.findMany({
    include: {
      scaleTier: true,
      genres: {
        include: {
          genre: true,
        },
      },
      _count: {
        select: {
          characters: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const formatted = verses.map((verse) => ({
    id: verse.id,
    name: verse.name,
    characterCount: verse._count.characters,
    genres: verse.genres.map((item) => item.genre.name),
    scaling: verse.scaleTier.title,
  }));

  return Response.json(formatted);
}