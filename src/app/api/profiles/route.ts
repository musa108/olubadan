import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { LineType, ProfileStatus } from "@/generated/prisma/client";
import { apiError, parseEnumList } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { requireAdminSession, getServerAuthSession } from "@/lib/auth";

const lineTypes = Object.values(LineType);
const profileStatuses = Object.values(ProfileStatus);

const profileRegistrationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5).optional(),
  password: z.string().min(8).optional(),
  positionTitle: z.string().min(2),
  line: z.nativeEnum(LineType),
  title: z.string().min(2),
  fullTraditionalName: z.string().min(2),
  currentPosition: z.string().min(2),
  biography: z.string().min(10),
  familyHistory: z.string().min(10),
  achievements: z.string().min(2),
  palaceResponsibilities: z.string().min(2),
  profilePictureUrl: z.string().optional().or(z.literal("")),
  additionalPhotoUrls: z.array(z.string()).default([]),
  // Documents uploaded as URLs (title + url)
  documentUrls: z.array(z.object({ title: z.string().min(1), url: z.string() })).default([]),
  // Optional video URLs (stored as media items). If you don't use videos yet, you can omit this.
  videoUrls: z.array(z.string()).default([]),
  // New Compact Bio Data Fields
  dateOfBirth: z.string().optional().nullable(),
  familyCompound: z.string().optional().nullable(),
  familyVillage: z.string().optional().nullable(),
  localGovernment: z.string().optional().nullable(),
  highestQualification: z.string().optional().nullable(),
  fieldSpecialization: z.string().optional().nullable(),
  otherQualifications: z.string().optional().nullable(),
  currentOccupation: z.string().optional().nullable(),
  yearInstalled: z.string().optional().nullable(),
  languagesSpoken: z.string().optional().nullable(),
  expertiseInterest: z.string().optional().nullable(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const line = parseEnumList(searchParams.get("line"), lineTypes);
  const status = parseEnumList(searchParams.get("status"), profileStatuses);
  const includeUnpublished = searchParams.get("includeUnpublished") === "true";

  let isAdmin = false;
  if (includeUnpublished) {
    const authError = await requireAdminSession(request);
    if (authError) return authError;
    isAdmin = true;
  } else {
    const session = await getServerAuthSession();
    if (session?.user?.role === "SUPER_ADMIN") {
      isAdmin = true;
    }
  }

  const profiles = await prisma.profile.findMany({
    where: {
      ...(line ? { line } : {}),
      ...(status
        ? { status }
        : includeUnpublished
          ? {}
          : { status: ProfileStatus.PUBLISHED }),
    },
    include: {
      media: true,
      documents: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          positionTitle: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const sanitizedProfiles = isAdmin
    ? profiles
      : profiles.map((p) => {
        const { familyHistory: _familyHistory, ...rest } = p;
        void _familyHistory;
        return {
          ...rest,
          // Hide dossier-like fields from public users.
          familyHistory: "[REDACTED]",
          documents: [],
          user: rest.user
            ? {
                ...rest.user,
                email: "[REDACTED]",
                phone: "[REDACTED]",
              }
            : null,
        };
      });

  return NextResponse.json({ profiles: sanitizedProfiles });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const result = profileRegistrationSchema.safeParse(json);

  if (!result.success) {
    return apiError("Invalid profile submission.", 422);
  }

  const data = result.data;
  const passwordHash = await hash(data.password ?? crypto.randomUUID(), 12);

  try {
    const created = await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { email: data.email },
        update: {
          name: data.fullName,
          phone: data.phone,
          line: data.line,
          positionTitle: data.positionTitle,
        },
        create: {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          passwordHash,
          line: data.line,
          positionTitle: data.positionTitle,
        },
      });

      const profile = await tx.profile.create({
        data: {
          userId: user.id,
          line: data.line,
          title: data.title,
          fullTraditionalName: data.fullTraditionalName,
          currentPosition: data.currentPosition,
          biography: data.biography,
          familyHistory: data.familyHistory,
          achievements: data.achievements,
          palaceResponsibilities: data.palaceResponsibilities,
          profilePictureUrl: data.profilePictureUrl,
          // New Compact Bio Data Fields
          dateOfBirth: data.dateOfBirth,
          familyCompound: data.familyCompound,
          familyVillage: data.familyVillage,
          localGovernment: data.localGovernment,
          highestQualification: data.highestQualification,
          fieldSpecialization: data.fieldSpecialization,
          otherQualifications: data.otherQualifications,
          currentOccupation: data.currentOccupation,
          yearInstalled: data.yearInstalled,
          languagesSpoken: data.languagesSpoken,
          expertiseInterest: data.expertiseInterest,
          media: {
            create: data.additionalPhotoUrls.map((url) => ({
              url,
              type: "IMAGE",
            })),
          },
          documents: {
            create: data.documentUrls,
          },
        },
        include: {
          media: true,
          documents: true,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: user.id,
          action: "PROFILE_SUBMITTED",
          entity: "Profile",
          entityId: profile.id,
        },
      });

      return profile;
    });

    return NextResponse.json({ profile: created }, { status: 201 });
  } catch {
    return apiError("Unable to submit profile.", 500);
  }
}
