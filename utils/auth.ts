import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";
import dbConnect from "./dbConnect";
import userModel from "../models/userModel";
import { AdminUser, PermissionKey, toAdminUser } from "./adminAccess";

//Re-exported so server code can keep importing everything auth-related from
//here; client components must import from ./adminAccess directly instead.
export * from "./adminAccess";

export const AUTH_COOKIE = "BrightEyesJWTToken";

//Anything carrying the parsed session cookie — a NextApiRequest or the
//IncomingMessage Next.js passes to getServerSideProps.
type AuthCookieCarrier = {
  cookies?: Partial<{ [key: string]: string }>;
};

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
export const getAuthUser = (req: AuthCookieCarrier): AuthUser | null => {
  const secret = process.env.SECRET;
  if (!secret) {
    return null;
  }

  const token = req.cookies?.[AUTH_COOKIE];
  if (!token) {
    return null;
  }

  try {
    const decoded = verify(token, secret, { algorithms: ["HS256"] });
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

//Resolves the requester's account and effective permissions from the database
//(not the JWT), so access changes apply immediately and a deleted account
//loses access even while its cookie is still valid.
export const getAdminUser = async (
  req: AuthCookieCarrier
): Promise<AdminUser | null> => {
  const auth = getAuthUser(req);
  if (!auth) {
    return null;
  }

  await dbConnect();
  const record = await userModel
    .findOne({ username: auth.username })
    .lean<{ username: string; role?: string; permissions?: object } | null>();
  if (!record) {
    return null;
  }

  return toAdminUser(record);
};

export const FORBIDDEN_MESSAGE =
  "Your account doesn't have access to this. Ask a superuser on your team to update your access.";

//Wrapper for routes where every method needs one specific permission.
export const requirePermission = (
  permission: PermissionKey,
  handler: NextApiHandler
): NextApiHandler => {
  return async (req, res) => {
    const user = await getAdminUser(req);
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    if (!user.permissions[permission]) {
      res.status(403).json({ success: false, message: FORBIDDEN_MESSAGE });
      return;
    }

    return handler(req, res);
  };
};

/* eslint-disable no-unused-vars -- the base rule can't tell that named
   parameters in a function type are declarations, not unused variables */
export type SuperuserApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  requester: AdminUser
) => unknown;
/* eslint-enable no-unused-vars */

//Wrapper for routes only superusers may call. The handler receives the
//already-resolved requester so it can apply "not on yourself" style rules.
export const requireSuperuser = (
  handler: SuperuserApiHandler
): NextApiHandler => {
  return async (req, res) => {
    const user = await getAdminUser(req);
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    if (!user.isSuperuser) {
      res.status(403).json({ success: false, message: FORBIDDEN_MESSAGE });
      return;
    }

    return handler(req, res, user);
  };
};

type AdminPageGate =
  | { user: AdminUser; redirect?: undefined }
  | {
      user?: undefined;
      redirect: { redirect: { destination: string; permanent: false } };
    };

//getServerSideProps gate for admin pages. The middleware already bounces
//requests without a valid JWT, so this adds the permission check and hands
//back the user for the page to render (or a redirect to return directly).
export const gateAdminPage = async (
  req: AuthCookieCarrier,
  need?: PermissionKey | "superuser"
): Promise<AdminPageGate> => {
  const user = await getAdminUser(req);
  if (!user) {
    return {
      redirect: { redirect: { destination: "/login", permanent: false } },
    };
  }

  const allowed =
    need === undefined ||
    (need === "superuser" ? user.isSuperuser : user.permissions[need]);
  if (!allowed) {
    return {
      redirect: { redirect: { destination: "/admin", permanent: false } },
    };
  }

  return { user };
};
