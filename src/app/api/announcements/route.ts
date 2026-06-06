import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus } from "@/generated/prisma/client";
import { apiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const announcementSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
  authorId: z.string().optional(),
});

export async function GET(request: Request) {
  const includeUnpublished = new URL(request.url).searchParams.get("includeUnpublished") === "true";

  if (includeUnpublished) {
    const authError = await requireAdmin(request);
    if (authError) return authError;
  }

  const announcements = await prisma.announcement.findMany({
    where: includeUnpublished ? {} : { status: ContentStatus.PUBLISHED },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ announcements });
}

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const json = await request.json().catch(() => null);
  const result = announcementSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid announcement payload.", 422);
  }

  const announcement = await prisma.announcement.create({ data: result.data });
  await prisma.auditLog.create({
    data: {
      action: "ANNOUNCEMENT_CREATED",
      entity: "Announcement",
      entityId: announcement.id,
    },
  });

  return NextResponse.json({ announcement }, { status: 201 });
}
