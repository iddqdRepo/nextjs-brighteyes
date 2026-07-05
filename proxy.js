import { NextResponse } from "next/server";
import * as jose from "jose";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function proxy(request) {
  const jwt = request.cookies.get("BrightEyesJWTToken")?.value;
  const secret = process.env.SECRET;

  if (!jwt || !secret) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jose.jwtVerify(jwt, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
