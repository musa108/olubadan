import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus, NewsCategory } from "@/generated/prisma/client";
import { apiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const updateNewsSchema = z.object({
  headline: z.string().min(3).optional(),
  subtitle: z.string().nullable().optional(),
  content: z.string().min(10).optional(),
  featuredImageUrl: z.string().nullable().optional(),
  authorId: z.string().nullable().optional(),
  authorName: z.string().nullable().optional(),
  publishDate: z.string().datetime().nullable().optional(),
  category: z.nativeEnum(NewsCategory).optional(),
  status: z.nativeEnum(ContentStatus).optional(),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = await prisma.news.findFirst({
    where: { id, status: ContentStatus.PUBLISHED },
  });

  if (!news) {
    return apiError("News article not found.", 404);
  }

  return NextResponse.json({ news });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  const json = await request.json().catch(() => null);
  const result = updateNewsSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid news update.", 422);
  }

  const data = result.data;
  const news = await prisma.news.update({
    where: { id },
    data: {
      ...data,
      publishDate:
        data.publishDate === undefined
          ? undefined
          : data.publishDate
          ? new Date(data.publishDate)
          : null,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "NEWS_UPDATED",
      entity: "News",
      entityId: id,
      metadata: data,
    },
  });

  return NextResponse.json({ news });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  await prisma.news.delete({ where: { id } });
  await prisma.auditLog.create({
    data: {
      action: "NEWS_DELETED",
      entity: "News",
      entityId: id,
    },
  });

  return NextResponse.json({ ok: true });
}
