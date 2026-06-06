import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  () => NextResponse.next(),
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        if (pathname.startsWith("/admin")) {
          return token?.role === "SUPER_ADMIN";
        }
        if (pathname.startsWith("/portal/dashboard")) {
          return token?.role === "LINE_REPRESENTATIVE";
        }
        return true;
      },
    },
    pages: {
      signIn: "/portal",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/portal/dashboard/:path*"],
};
