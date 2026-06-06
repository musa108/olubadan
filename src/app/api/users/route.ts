import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { LineType, UserRole } from "@/generated/prisma/client";
import { apiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  role: z.nativeEnum(UserRole).default(UserRole.LINE_REPRESENTATIVE),
  line: z.nativeEnum(LineType).optional(),
  positionTitle: z.string().optional(),
});

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      line: true,
      positionTitle: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const json = await request.json().catch(() => null);
  const result = userSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid user payload.", 422);
  }

  const { password, ...data } = result.data;
  const user = await prisma.user.create({
    data: {
      ...data,
      passwordHash: await hash(password, 12),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      line: true,
      positionTitle: true,
      createdAt: true,
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: "USER_CREATED",
      entity: "User",
      entityId: user.id,
    },
  });

  return NextResponse.json({ user }, { status: 201 });
}
