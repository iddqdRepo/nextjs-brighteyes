import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { getUserByUsername } from "../../../routes/userRoutes";
import bcrypt from "bcrypt";

const secret = process.env.SECRET;

export default async function login(req, res) {
  const { username, password } = req.body;

  const isInDb = await getUserByUsername(username);
  let bcryptPasswordHashesMatch = false;

  if (isInDb.success) {
    bcryptPasswordHashesMatch = bcrypt.compareSync(
      password,
      isInDb.data[0].password
    ); // true
  }

  if (bcryptPasswordHashesMatch) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //30 days
        username,
        password,
      },
      secret
    );

    const serialised = serialize("BrightEyesJWTToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, //when the cookie expires
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ success: true });
  } else {
    res
      .status(200)
      .json({ success: false, message: "Invalid username or password" });
  }
}
