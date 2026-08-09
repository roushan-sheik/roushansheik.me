import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all routes under /cms/dashboard
  if (pathname.startsWith("/cms/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      // No token found, redirect to login
      const loginUrl = new URL("/cms/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key");
      await jwtVerify(token, secret);
      
      // Token is valid, let them pass
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired, clear it and redirect
      const loginUrl = new URL("/cms/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/dashboard/:path*"],
};
