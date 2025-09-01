import NextAuth from "next-auth";

import authConfig from "../auth.config";

const { auth } = NextAuth(authConfig);

// The "auth" middleware now directly handles the request and session
// without needing explicit type annotations.
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute =
    ["/", "/login", "/register"].includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/public");

  if (isApiAuthRoute || isPublicRoute) {
    return; // Allow request to proceed
  }

  if (!isLoggedIn) {
    // Redirect unauthenticated users to the login page
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

// Match all routes except for static files and image optimization files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
