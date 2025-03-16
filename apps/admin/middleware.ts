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
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  return NextResponse.next();
});
export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|public/|login).+)",
  ],
};
