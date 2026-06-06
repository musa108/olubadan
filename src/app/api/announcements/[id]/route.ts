import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus, Prisma } from "@/generated/prisma/client";
import { apiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const updateAnnouncementSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  status: z.nativeEnum(ContentStatus).optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  const json = await request.json().catch(() => null);
  const result = updateAnnouncementSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid announcement update.", 422);
  }

  const announcement = await prisma.announcement.update({
    where: { id },
    data: result.data,
  });

  await prisma.auditLog.create({
    data: {
      action: "ANNOUNCEMENT_UPDATED",
      entity: "Announcement",
      entityId: id,
      metadata: result.data as Prisma.InputJsonValue,
    },
  });

  return NextResponse.json({ announcement });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  await prisma.announcement.delete({ where: { id } });
  await prisma.auditLog.create({
    data: {
      action: "ANNOUNCEMENT_DELETED",
      entity: "Announcement",
      entityId: id,
    },
  });

  return NextResponse.json({ ok: true });
}
