import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

//Workaround to fix known issue https://github.com/vercel/next.js/issues/39262
export const config = {
  matcher: ["/", "/((?!api/).*)"],
};

const getMiddlewareAuth = (req) => {
  //Bracket access keeps this request-time value available in tests and
  //self-hosted deployments instead of letting a build transform inline it.
  const secret = process.env["SECRET"];
  const cookie = req.cookies.get("BrightEyesJWTToken");
  //Next 12 returned the value directly; newer supported Next releases return
  //a { name, value } object. Accept both during the framework upgrade path.
  const jwt = typeof cookie === "string" ? cookie : cookie?.value;

  return { jwt, secret };
};

export default async function middleware(req) {
  const { origin, pathname } = req.nextUrl;
  const { jwt, secret } = getMiddlewareAuth(req);

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!jwt || !secret) {
      return NextResponse.redirect(`${origin}/login`);
      // return NextResponse.redirect(`/login`);
    }

    try {
      await jwtVerify(jwt, new TextEncoder().encode(secret), {
        algorithms: ["HS256"],
      });
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(`${origin}/login`);
      // return NextResponse.redirect(`/login`);
    }
  }

  return NextResponse.next();
}
