import { NextResponse } from "next/server";
import { getServerAuthSession } from "./auth";

export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAdmin(request: Request) {
  const session = await getServerAuthSession();
  if (session?.user?.role === "SUPER_ADMIN") {
    return null;
  }

  const configuredKey = process.env.ADMIN_API_KEY;
  if (!configuredKey) {
    return apiError("Admin session or API key is required.", 401);
  }

  const providedKey = request.headers.get("x-admin-api-key");
  if (providedKey !== configuredKey) {
    return apiError("Admin API key is required.", 401);
  }

  return null;
}

export function parseEnumList<T extends string>(value: string | null, allowed: readonly T[]) {
  if (!value) {
    return undefined;
  }

  const normalized = value.toUpperCase().replaceAll("-", "_") as T;
  return allowed.includes(normalized) ? normalized : undefined;
}
