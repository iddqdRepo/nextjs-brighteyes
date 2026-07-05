import { NextApiRequest, NextApiResponse } from "next";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";

//Short-lived cookie carrying the signed WebAuthn challenge between the
//options request and the verify request — stateless, so it works across
//serverless invocations.
export const CHALLENGE_COOKIE = "BrightEyesWebAuthnChallenge";

export type ChallengePurpose = "register" | "login";

export type StoredChallenge = {
  challenge: string;
  username: string;
  purpose: ChallengePurpose;
};

//The relying party is derived from the request host, so the same code works
//on localhost, Vercel previews, and the production domain.
export const relyingParty = (req: NextApiRequest) => {
  const host = req.headers.host || "localhost:3000";
  const rpID = host.split(":")[0];
  const proto =
    (req.headers["x-forwarded-proto"] as string | undefined) ||
    (rpID === "localhost" ? "http" : "https");
  return {
    rpID,
    rpName: "Bright Eyes Animal Sanctuary",
    origin: `${proto}://${host}`,
  };
};

export const buildChallengeCookie = (payload: StoredChallenge): string => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  const token = sign(payload, secret, { expiresIn: "5m" });
  return serialize(CHALLENGE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 300,
    path: "/",
  });
};

export const clearChallengeCookie = (): string =>
  serialize(CHALLENGE_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

export const readChallenge = (
  req: NextApiRequest,
  purpose: ChallengePurpose
): StoredChallenge | null => {
  const secret = process.env.SECRET;
  const token = req.cookies?.[CHALLENGE_COOKIE];
  if (!secret || !token) {
    return null;
  }
  try {
    const decoded = verify(token, secret);
    if (typeof decoded === "string") {
      return null;
    }
    const payload = decoded as JwtPayload;
    if (
      payload.purpose !== purpose ||
      typeof payload.challenge !== "string" ||
      typeof payload.username !== "string"
    ) {
      return null;
    }
    return {
      challenge: payload.challenge,
      username: payload.username,
      purpose,
    };
  } catch {
    return null;
  }
};

export const setCookies = (res: NextApiResponse, cookies: string[]) => {
  res.setHeader("Set-Cookie", cookies);
};
