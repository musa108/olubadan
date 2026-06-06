import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus, GalleryCategory, MediaType } from "@/generated/prisma/client";
import { apiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const updateGallerySchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().nullable().optional(),
  url: z.string().optional(),
  type: z.nativeEnum(MediaType).optional(),
  category: z.nativeEnum(GalleryCategory).optional(),
  status: z.nativeEnum(ContentStatus).optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  const json = await request.json().catch(() => null);
  const result = updateGallerySchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid gallery update.", 422);
  }

  const item = await prisma.galleryItem.update({
    where: { id },
    data: result.data,
  });

  await prisma.auditLog.create({
    data: {
      action: "GALLERY_ITEM_UPDATED",
      entity: "GalleryItem",
      entityId: id,
      metadata: result.data,
    },
  });

  return NextResponse.json({ item });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  await prisma.galleryItem.delete({ where: { id } });
  await prisma.auditLog.create({
    data: {
      action: "GALLERY_ITEM_DELETED",
      entity: "GalleryItem",
      entityId: id,
    },
  });

  return NextResponse.json({ ok: true });
}
