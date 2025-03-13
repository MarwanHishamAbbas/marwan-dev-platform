import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  accounts,
  db,
  sessions,
  users,
  verificationTokens,
} from "@workspace/database";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { getUserById } from "./lib/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, user }) {
      // Allow OAuth without email verification

      const existingUser = await getUserById(user.id as string);

      // Prevent Sign in without email verifiction
      if (!existingUser?.emailVerified) return false;

      // TODO: 2FA Check

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;

      // This token can be accessed inside the middelware.ts

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
