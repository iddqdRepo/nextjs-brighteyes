import { serialize } from "cookie";

export default async function logout(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { cookies } = req;
  const jwt = cookies.BrightEyesJWTToken;

  if (!jwt) {
    return res.json({ message: "You are already not logged in" });
  } else {
    const serialised = serialize("BrightEyesJWTToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Successfully logged out" });
  }
}
