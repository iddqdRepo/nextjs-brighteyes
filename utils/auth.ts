import { NextApiHandler, NextApiRequest } from "next";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";

export const AUTH_COOKIE = "BrightEyesJWTToken";

//Serialized session cookie for a successfully authenticated admin — shared by
//the password login and the WebAuthn login so both issue identical sessions.
export const buildAuthCookie = (username: string): string => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  const token = sign({ username }, secret, { expiresIn: "30d" });
  return serialize(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, //when the cookie expires
    path: "/",
  });
};

export type AuthUser = {
  username: string;
};

//Returns the admin encoded in the request's JWT cookie, or null if the request
//is unauthenticated / the token is invalid. Fails closed when SECRET is unset.
export const getAuthUser = (req: NextApiRequest): AuthUser | null => {
  const secret = process.env.SECRET;
  if (!secret) {
    return null;
  }

  const token = req.cookies?.[AUTH_COOKIE];
  if (!token) {
    return null;
  }

  try {
    const decoded = verify(token, secret);
    if (typeof decoded === "string") {
      return null;
    }

    const username = (decoded as JwtPayload).username;
    if (typeof username !== "string" || username.length === 0) {
      return null;
    }

    return { username };
  } catch {
    return null;
  }
};

//Convenience wrapper for routes where every method is admin-only.
export const requireAuth = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    if (!getAuthUser(req)) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    return handler(req, res);
  };
};
