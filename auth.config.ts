import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      // We will handle the authorize logic in the main auth.ts file
      // This is just to define the provider
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
