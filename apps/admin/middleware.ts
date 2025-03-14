import NextAuth from "next-auth";
import authConfig from "./config/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (request.auth && pathname === "/login") {
    console.log("Redirecting authenticated user from login page to home");
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (!request.auth && pathname !== "/login") {
    console.log("Redirecting unauthenticated user to login page");
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
