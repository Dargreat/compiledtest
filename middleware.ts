import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
} from "@/routes";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const isAdminRoute = adminRoutes.some((route) =>
      nextUrl.pathname.startsWith(route)
    );

    // Handle admin routes
    if (isAdminRoute) {
      const isAdmin = req.nextauth.token?.role === "ADMIN";
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/unauthorized", nextUrl));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { nextUrl } = req;
        
        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
        const isAuthRoute = authRoutes.includes(nextUrl.pathname);
        
        if (isApiAuthRoute) return true;
        
        if (isAuthRoute) {
          return !token; // Allow access if not logged in
        }
        
        if (!token && !isPublicRoute) {
          return false;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/reddit-analytics/:path*",
  ],
};
