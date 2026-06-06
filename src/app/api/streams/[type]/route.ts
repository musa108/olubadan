import { NextResponse } from "next/server";
import { z } from "zod";
import { StreamType } from "@/generated/prisma/client";
import { apiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const streamSchema = z.object({
  title: z.string().min(2),
  streamUrl: z.string().url(),
  embedUrl: z.string().url().optional(),
  isActive: z.boolean().default(false),
  description: z.string().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ type: string }> }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { type } = await params;
  const normalizedType = type.toUpperCase() as StreamType;

  if (!Object.values(StreamType).includes(normalizedType)) {
    return apiError("Invalid stream type.", 400);
  }

  const json = await request.json().catch(() => null);
  const result = streamSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid stream payload.", 422);
  }

  const stream = await prisma.streamSetting.upsert({
    where: { type: normalizedType },
    update: result.data,
    create: {
      type: normalizedType,
      ...result.data,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "STREAM_SETTING_UPDATED",
      entity: "StreamSetting",
      entityId: stream.id,
      metadata: { type: normalizedType },
    },
  });

  return NextResponse.json({ stream });
}
