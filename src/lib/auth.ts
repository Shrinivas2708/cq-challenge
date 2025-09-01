import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import { users } from "@/db/schema/media";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import authConfig from "../../auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
   ...authConfig,
    adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Add this callbacks section
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },providers: [
    ...authConfig.providers, // Keep the original providers
    // Override the credentials provider to add our authorize logic
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        });

        if (
          !user ||
          !user.hashedPassword ||
          !bcrypt.compareSync(credentials.password as string, user.hashedPassword)
        ) {
          return null;
        }

        return user;
      },
    }),
  ],

})
