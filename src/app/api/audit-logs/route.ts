import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const logs = await prisma.auditLog.findMany({
    include: {
      actor: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ logs });
}
