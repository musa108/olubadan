import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { apiError } from "@/lib/api";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.role) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user) return null;

        const isValidPassword = await compare(credentials.password, user.passwordHash);
        if (!isValidPassword) return null;

        if (credentials.role === "admin" && user.role !== "SUPER_ADMIN") {
          return null;
        }

        if (credentials.role === "holder" && user.role !== "LINE_REPRESENTATIVE") {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          line: user.line,
          positionTitle: user.positionTitle,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as { role?: unknown; line?: unknown; positionTitle?: unknown };
        token.role = authUser.role;
        token.line = authUser.line;
        token.positionTitle = authUser.positionTitle;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id;
        session.user.role = token.role as string;
        session.user.line = token.line as string;
        session.user.positionTitle = token.positionTitle as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/portal",
  },
  secret: process.env.NEXTAUTH_SECRET || "insecure-development-secret",
};

export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function requireAdminSession(_request: Request) {
  const session = await getServerAuthSession();
  if (!session?.user?.id || session.user.role !== "SUPER_ADMIN") {
    return apiError("Admin access required.", 401);
  }
  return null;
}
