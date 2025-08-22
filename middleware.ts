// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// ✅ Our Edge-compatible middleware
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // role checks
  const isAdmin = req.auth?.user?.role === "ADMIN";
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/pricing"].includes(nextUrl.pathname);

  // --- Route protections ---

  // 1. Block access to /api/auth routes
  if (isApiAuthRoute) {
    return null; // let NextAuth handle
  }

  // 2. Auth pages (login/register)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/reddit-analytics", nextUrl));
    }
    return null; // allow access to login/register
  }

  // 3. Admin pages
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // 4. Public pages
  if (isPublicRoute) {
    return null; // let through
  }

  // 5. Protected pages (everything else)
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return null; // allow
});

// ✅ Apply middleware to selected routes
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/reddit-analytics/:path*"
  ],
};
