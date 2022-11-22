import { serialize } from "cookie";

export default async function logout(req, res) {
  const { cookies } = req;
  const jwt = cookies.BrightEyesJWTToken;

  if (!jwt) {
    return res.json({ message: "You are already not logged in" });
  } else {
    const serialised = serialize("BrightEyesJWTToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1, //cookie cleared max age expired
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Successfully logged out" });
  }
}
