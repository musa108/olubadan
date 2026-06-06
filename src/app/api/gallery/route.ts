import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus, GalleryCategory, MediaType } from "@/generated/prisma/client";
import { apiError, parseEnumList, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const categories = Object.values(GalleryCategory);

const gallerySchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  url: z.string(),
  type: z.nativeEnum(MediaType).default(MediaType.IMAGE),
  category: z.nativeEnum(GalleryCategory),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.PUBLISHED),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = parseEnumList(searchParams.get("category"), categories);
  const includeUnpublished = searchParams.get("includeUnpublished") === "true";

  if (includeUnpublished) {
    const authError = await requireAdmin(request);
    if (authError) return authError;
  }

  const gallery = await prisma.galleryItem.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(includeUnpublished ? {} : { status: ContentStatus.PUBLISHED }),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ gallery });
}

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const json = await request.json().catch(() => null);
  const result = gallerySchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid gallery payload.", 422);
  }

  const item = await prisma.galleryItem.create({ data: result.data });
  await prisma.auditLog.create({
    data: {
      action: "GALLERY_ITEM_CREATED",
      entity: "GalleryItem",
      entityId: item.id,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}
