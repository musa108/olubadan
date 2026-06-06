import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  ContentStatus,
  GalleryCategory,
  LineType,
  MediaType,
  NewsCategory,
  PrismaClient,
  ProfileStatus,
  StreamType,
  UserRole,
} from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@olubadan-palace.local";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-this-password";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: UserRole.SUPER_ADMIN,
    },
    create: {
      name: "Palace Super Admin",
      email: adminEmail,
      passwordHash: await hash(adminPassword, 12),
      role: UserRole.SUPER_ADMIN,
      positionTitle: "Palace Administrator",
    },
  });

  const otunRep = await prisma.user.upsert({
    where: { email: "otun.rep@olubadan-palace.local" },
    update: {},
    create: {
      name: "Otun Line Secretariat",
      email: "otun.rep@olubadan-palace.local",
      passwordHash: await hash("change-this-password", 12),
      role: UserRole.LINE_REPRESENTATIVE,
      line: LineType.OTUN,
      positionTitle: "Line Representative",
    },
  });

  await prisma.profile.upsert({
    where: { id: "seed-otun-profile" },
    update: {},
    create: {
      id: "seed-otun-profile",
      userId: otunRep.id,
      line: LineType.OTUN,
      title: "His Royal Majesty",
      fullTraditionalName: "Oba Abiodun Kola-Daisi",
      currentPosition: "Osi Olubadan of Ibadanland",
      biography:
        "A respected member of the Olubadan traditional council, known for civic leadership and service to Ibadanland.",
      familyHistory:
        "The Otun line preserves senior civil chieftaincy service and family leadership records.",
      achievements: "Council representation; community mediation; cultural preservation",
      palaceResponsibilities:
        "Palace advisory duties; line representation; public ceremonial leadership",
      profilePictureUrl: "/oba/otun2.jpeg",
      status: ProfileStatus.PUBLISHED,
      reviewedById: admin.id,
      reviewedAt: new Date(),
    },
  });

  await prisma.news.upsert({
    where: { id: "seed-community-guard" },
    update: {},
    create: {
      id: "seed-community-guard",
      headline: "Olubadan inaugurates Ibadan Community Guard",
      subtitle: "The palace unveils a grassroots security initiative and Gaari Ibadan programme.",
      content:
        "Oba Rashidi Adewolu Ladoja formally inaugurated the Ibadan Community Guard to support community policing across Ibadanland.",
      featuredImageUrl: "/oluband-with-garri.jpeg",
      authorId: admin.id,
      authorName: "Palace of the Olubadan of Ibadanland",
      publishDate: new Date(),
      category: NewsCategory.CULTURAL_EVENTS,
      status: ContentStatus.PUBLISHED,
    },
  });

  await prisma.galleryItem.upsert({
    where: { id: "seed-royal-palace" },
    update: {},
    create: {
      id: "seed-royal-palace",
      title: "Royal Palace",
      url: "/royal_palace.jpeg",
      type: MediaType.IMAGE,
      category: GalleryCategory.PALACE_EVENTS,
      status: ContentStatus.PUBLISHED,
    },
  });

  await prisma.streamSetting.upsert({
    where: { type: StreamType.RADIO },
    update: {},
    create: {
      type: StreamType.RADIO,
      title: "Olubadan Palace Radio",
      streamUrl: "https://stream-ssl.arenastreaming.com:8000/freshfmibadan",
      isActive: true,
      description: "Official palace radio stream.",
    },
  });

  await prisma.streamSetting.upsert({
    where: { type: StreamType.VIDEO },
    update: {},
    create: {
      type: StreamType.VIDEO,
      title: "Olubadan Live Video Stream",
      streamUrl: "https://www.youtube.com/@olubadanpalace/live",
      isActive: false,
      description: "YouTube Live stream for palace events.",
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "DATABASE_SEEDED",
      entity: "System",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
