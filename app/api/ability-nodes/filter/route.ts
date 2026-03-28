import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q")?.trim() ?? "";
  const isPublic = searchParams.get("public") === "1";
  const family = searchParams.get("family")?.trim() ?? "";
  const hierarchyLevel = searchParams.get("hierarchyLevel")?.trim() ?? "";

  const results = await prisma.abilityNode.findMany({
    where: {
      AND: [
        isPublic
          ? {
              status: "PUBLISHED",
            }
          : {},
        q
          ? {
              name: {
                contains: q,
                mode: "insensitive",
              },
            }
          : {},
        family
          ? {
              family: family as never,
            }
          : {},
        hierarchyLevel
          ? {
              hierarchyLevel,
            }
          : {},
      ],
    },
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      type: true,
      family: true,
      hierarchyLevel: true,
      mainImage: {
        select: {
          url: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
    take: 30,
  });

  return NextResponse.json({ results });
}