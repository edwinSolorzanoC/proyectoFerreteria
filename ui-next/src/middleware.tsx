import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (!session) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
