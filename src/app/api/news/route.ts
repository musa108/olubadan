import { NextResponse } from "next/server";
import { z } from "zod";
import { ContentStatus, NewsCategory } from "@/generated/prisma/client";
import { apiError, parseEnumList, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const categories = Object.values(NewsCategory);
const statuses = Object.values(ContentStatus);

const newsSchema = z.object({
  headline: z.string().min(3),
  subtitle: z.string().optional(),
  content: z.string().min(10),
  featuredImageUrl: z.string().optional(),
  authorId: z.string().optional(),
  authorName: z.string().optional(),
  publishDate: z.string().datetime().optional(),
  category: z.nativeEnum(NewsCategory),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = parseEnumList(searchParams.get("category"), categories);
  const status = parseEnumList(searchParams.get("status"), statuses);
  const includeUnpublished = searchParams.get("includeUnpublished") === "true";

  if (includeUnpublished) {
    const authError = await requireAdmin(request);
    if (authError) return authError;
  }

  const news = await prisma.news.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(status ? { status } : includeUnpublished ? {} : { status: ContentStatus.PUBLISHED }),
    },
    orderBy: [{ publishDate: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ news });
}

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const json = await request.json().catch(() => null);
  const result = newsSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid news payload.", 422);
  }

  const data = result.data;
  const news = await prisma.news.create({
    data: {
      ...data,
      publishDate: data.publishDate ? new Date(data.publishDate) : null,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "NEWS_CREATED",
      entity: "News",
      entityId: news.id,
    },
  });

  return NextResponse.json({ news }, { status: 201 });
}
