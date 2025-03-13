// middleware.js
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"; // Import your auth mechanism

export async function middleware(request: NextRequest) {
  console.log("==== Middleware Execution Started ====");
  console.log("Request path:", request.nextUrl.pathname);

  try {
    // Get auth session
    const session = await auth();
    console.log("Auth session:", session ? "Authenticated" : "Unauthenticated");

    const path = request.nextUrl.pathname;

    // Your logic here
    if (session && path === "/login") {
      console.log("Redirecting authenticated user from login page to home");
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    if (!session && path !== "/login") {
      console.log("Redirecting unauthenticated user to login page");
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }

    if (
      session &&
      path.startsWith("/admin") &&
      session.user?.role === "BASIC"
    ) {
      console.log("Redirecting BASIC user from admin area to home");
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    console.log("Request allowed to proceed");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // You can decide how to handle errors - either redirect to an error page or let it proceed
    return NextResponse.next();
  } finally {
    console.log("==== Middleware Execution Completed ====");
  }
}

export const config = {
  matcher: [
    "/login",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|public/|login).+)",
  ],
};
