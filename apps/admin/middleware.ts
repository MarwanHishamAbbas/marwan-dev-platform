import { auth } from "@/auth";

export default auth((req) => {
  // If user is authenticated and trying to access login page
  // Redirect them to the dashboard or home page
  if (req.auth && req.nextUrl.pathname === "/login") {
    const redirectUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(redirectUrl);
  }

  // If user is not authenticated and trying to access a protected route
  // Redirect them to the login page
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
