import { NextResponse } from "next/server";
import * as jose from "jose";
const secret = process.env.SECRET;

//Workaround to fix known issue https://github.com/vercel/next.js/issues/39262
export const config = {
  matcher: ["/", "/((?!api/).*)"],
};

export default async function middleware(req) {
  const { origin } = req.nextUrl;
  const jwt = req.cookies.get("BrightEyesJWTToken");
  const url = req.url;

  if (url.includes("/admin")) {
    if (jwt === undefined) {
      return NextResponse.redirect(`${origin}/login`);
      // return NextResponse.redirect(`/login`);
    }

    try {
      await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(`${origin}/login`);
      // return NextResponse.redirect(`/login`);
    }
  }

  return NextResponse.next();
}
