// src/middleware.ts
import { auth } from "@/lib/auth";

// Export the auth function as the default export
export default auth;

// The matcher remains the same
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
