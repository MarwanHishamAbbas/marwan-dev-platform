import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  accounts,
  db,
  sessions,
  users,
  verificationTokens,
} from "@workspace/database";
import NextAuth from "next-auth";
import authConfig from "./config/auth.config";

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
  ...authConfig,
});
