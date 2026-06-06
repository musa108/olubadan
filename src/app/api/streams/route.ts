import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const streams = await prisma.streamSetting.findMany({
    orderBy: { type: "asc" },
  });

  return NextResponse.json({ streams });
}
