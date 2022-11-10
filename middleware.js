import { NextResponse } from "next/server";
import * as jose from "jose";
const secret = process.env.SECRET;

export default async function middleware(req) {
  const jwt = req.cookies.get("BrightEyesJWTToken");
  const url = req.url;

  if (url.includes("/admin")) {
    // console.log("Url contains admin");
    if (jwt === undefined) {
      console.log("jwt is undefined");
      return NextResponse.redirect("http://localhost:3000/login");
    }

    try {
      console.log("trying to verify jwt");
      await jose
        .jwtVerify(jwt, new TextEncoder().encode(`${secret}`))
        .then(console.log("jwt verified"));
      return NextResponse.next();
    } catch (error) {
      console.log("error", error);
      return NextResponse.redirect("http://localhost:3000/login");
    }
  }

  return NextResponse.next();
}
