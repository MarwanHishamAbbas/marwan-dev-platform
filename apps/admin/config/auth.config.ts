import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { getUserById } from "@/lib/users";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  //   callbacks: {
  //     async jwt({ token }) {
  //       if (!token.sub) return token;
  //       const existingUser = await getUserById(token.sub);
  //       if (!existingUser) return token;
  //       token.role = existingUser.role;

  //       // This token can be accessed inside the middelware.ts

  //       return token;
  //     },
  //     async session({ token, session }) {
  //       if (token.sub && session.user) {
  //         session.user.id = token.sub;
  //       }
  //       if (token.role && session.user) {
  //         session.user.role = token.role;
  //       }

  //       return session;
  //     },
  //   },
} satisfies NextAuthConfig;
