// src/lib/auth.ts

import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { authConfig } from "../../auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // Spread the base config
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    ...authConfig.callbacks, // Spread the authorized callback from the base config
    // Add JWT and session callbacks here
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
export const GET = handlers.GET
export const POST = handlers.POST
