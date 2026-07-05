import { NextApiHandler, NextApiRequest } from "next";
import { verify, JwtPayload } from "jsonwebtoken";

export const AUTH_COOKIE = "BrightEyesJWTToken";

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
