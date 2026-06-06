import { NextResponse } from "next/server";
import { z } from "zod";
import { ProfileStatus } from "@/generated/prisma/client";
import { apiError } from "@/lib/api";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const updateProfileSchema = z.object({
  title: z.string().min(2).optional(),
  fullTraditionalName: z.string().min(2).optional(),
  currentPosition: z.string().min(2).optional(),
  biography: z.string().min(10).optional(),
  familyHistory: z.string().min(10).optional(),
  achievements: z.string().min(2).optional(),
  palaceResponsibilities: z.string().min(2).optional(),
  profilePictureUrl: z.string().nullable().optional(),
  status: z.nativeEnum(ProfileStatus).optional(),
  reviewNote: z.string().nullable().optional(),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: {
      media: true,
      documents: true,
      user: { select: { id: true, name: true, email: true, phone: true } },
    },
  });

  if (!profile || profile.status !== ProfileStatus.PUBLISHED) {
    return apiError("Profile not found.", 404);
  }

  return NextResponse.json({ profile });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminSession(request);
  if (authError) return authError;

  const { id } = await params;
  const json = await request.json().catch(() => null);
  const result = updateProfileSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid profile update.", 422);
  }

  const data = result.data;
  const profile = await prisma.profile.update({
    where: { id },
    data: {
      ...data,
      reviewedAt: data.status ? new Date() : undefined,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: data.status ? `PROFILE_${data.status}` : "PROFILE_UPDATED",
      entity: "Profile",
      entityId: id,
      metadata: data,
    },
  });

  return NextResponse.json({ profile });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminSession(request);
  if (authError) return authError;

  const { id } = await params;
  await prisma.profile.delete({ where: { id } });
  await prisma.auditLog.create({
    data: {
      action: "PROFILE_DELETED",
      entity: "Profile",
      entityId: id,
    },
  });

  return NextResponse.json({ ok: true });
}
