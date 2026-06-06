import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { apiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const result = loginSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid login payload.", 422);
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (!user || !(await compare(result.data.password, user.passwordHash))) {
    return apiError("Invalid email or password.", 401);
  }

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: "USER_LOGIN",
      entity: "User",
      entityId: user.id,
    },
  });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      line: user.line,
      positionTitle: user.positionTitle,
    },
  });
}
