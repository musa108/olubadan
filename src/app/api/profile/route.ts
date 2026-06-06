import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/auth";
import { apiError } from "@/lib/api";

export async function GET() {
  const session = await getServerAuthSession();
  if (!session?.user?.id) {
    return apiError("Unauthorized.", 401);
  }

  const profile = await prisma.profile.findFirst({
    where: { userId: session.user.id },
    include: {
      media: true,
      documents: true,
      user: { select: { id: true, name: true, email: true, phone: true, positionTitle: true } },
    },
  });

  if (!profile) {
    return apiError("Representative profile not found.", 404);
  }

  return NextResponse.json({ profile, user: session.user });
}

export async function PUT(request: NextRequest) {
  const session = await getServerAuthSession();
  if (!session?.user?.id) {
    return apiError("Unauthorized.", 401);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body.", 400);
  }

  // Find the user's existing profile
  const existing = await prisma.profile.findFirst({
    where: { userId: session.user.id },
  });

  if (!existing) {
    return apiError("Profile not found. Please submit via the portal form.", 404);
  }

  const {
    // Core fields
    fullName,
    phone,
    fullTraditionalName,
    currentPosition,
    biography,
    familyHistory,
    achievements,
    palaceResponsibilities,
    profilePictureUrl,
    // New compact bio data fields
    dateOfBirth,
    familyCompound,
    familyVillage,
    localGovernment,
    highestQualification,
    fieldSpecialization,
    otherQualifications,
    currentOccupation,
    yearInstalled,
    languagesSpoken,
    expertiseInterest,
  } = body as Record<string, string | undefined>;

  // Update profile and optionally user name/phone in parallel
  const [updated] = await Promise.all([
    prisma.profile.update({
      where: { id: existing.id },
      data: {
        // Core fields — only update if provided
        ...(fullTraditionalName !== undefined && { fullTraditionalName }),
        ...(currentPosition !== undefined && { currentPosition }),
        ...(biography !== undefined && { biography }),
        ...(familyHistory !== undefined && { familyHistory }),
        ...(achievements !== undefined && { achievements }),
        ...(palaceResponsibilities !== undefined && { palaceResponsibilities }),
        ...(profilePictureUrl !== undefined && { profilePictureUrl }),
        // New compact bio data fields
        ...(dateOfBirth !== undefined && { dateOfBirth }),
        ...(familyCompound !== undefined && { familyCompound }),
        ...(familyVillage !== undefined && { familyVillage }),
        ...(localGovernment !== undefined && { localGovernment }),
        ...(highestQualification !== undefined && { highestQualification }),
        ...(fieldSpecialization !== undefined && { fieldSpecialization }),
        ...(otherQualifications !== undefined && { otherQualifications }),
        ...(currentOccupation !== undefined && { currentOccupation }),
        ...(yearInstalled !== undefined && { yearInstalled }),
        ...(languagesSpoken !== undefined && { languagesSpoken }),
        ...(expertiseInterest !== undefined && { expertiseInterest }),
        // Reset status to Pending Review so admin can re-review the updated record
        status: "PENDING_REVIEW",
        reviewNote: null,
      },
      include: {
        media: true,
        documents: true,
        user: { select: { id: true, name: true, email: true, phone: true, positionTitle: true } },
      },
    }),
    // Update user-level fields (name, phone) if provided
    (fullName || phone)
      ? prisma.user.update({
          where: { id: session.user.id },
          data: {
            ...(fullName && { name: fullName }),
            ...(phone && { phone }),
          },
        })
      : Promise.resolve(null),
  ]);

  return NextResponse.json({ profile: updated });
}
