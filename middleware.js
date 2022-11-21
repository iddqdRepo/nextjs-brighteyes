import { NextResponse } from "next/server";
import * as jose from "jose";
const secret = process.env.SECRET;

//Workaround to fix known issue https://github.com/vercel/next.js/issues/39262
export const config = {
  matcher: ["/", "/((?!api/).*)"],
};

export default async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  console.log("pathname", pathname);
  console.log("origin", origin);

  const jwt = req.cookies.get("BrightEyesJWTToken");
  const url = req.url;
  console.log("url", url);

  if (url.includes("/admin")) {
    if (jwt === undefined) {
      console.log("jwt is undefined");
      return NextResponse.redirect(`${origin}/login`);
      // return NextResponse.redirect(`/login`);
    }

    try {
      console.log("trying to verify jwt");
      await jose
        .jwtVerify(jwt, new TextEncoder().encode(`${secret}`))
        .then(console.log("jwt verified"));
      return NextResponse.next();
    } catch (error) {
      console.log("error", error);
      return NextResponse.redirect(`${origin}/login`);
      // return NextResponse.redirect(`/login`);
    }
  }

  return NextResponse.next();
}
