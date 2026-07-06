import { IncomingMessage, ServerResponse } from "http";
import { parse, serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";

export const DONATION_CHECKOUT_COOKIE = "BrightEyesDonationCheckout";
//Kept as a fallback for access cookies issued before per-donation names were
//introduced.
export const DONATION_ACCESS_COOKIE = "BrightEyesDonationAccess";

type DonationTokenType = "checkout" | "access";

type DonationTokenPayload = {
  donationId: string;
  type: DonationTokenType;
  checkoutNonce?: string;
  customerId?: string;
};

const getDonationAuthSecret = () => {
  const secret = process.env.DONATION_LINK_SECRET || process.env.SECRET;

  if (!secret) {
    throw new Error("DONATION_LINK_SECRET or SECRET must be set");
  }

  return secret;
};

const createCookie = (name: string, value: string, maxAge: number) => {
  return serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge,
    path: "/",
  });
};

export const appendSetCookie = (res: ServerResponse, cookieValue: string) => {
  const existingHeader = res.getHeader("Set-Cookie");

  if (!existingHeader) {
    res.setHeader("Set-Cookie", [cookieValue]);
    return;
  }

  const existingCookies = Array.isArray(existingHeader)
    ? existingHeader.map((header) => String(header))
    : [String(existingHeader)];

  res.setHeader("Set-Cookie", [...existingCookies, cookieValue]);
};

export const createDonationCheckoutCookie = (
  donationId: string,
  checkoutNonce: string
) => {
  const token = sign(
    {
      donationId,
      checkoutNonce,
      type: "checkout",
    },
    getDonationAuthSecret(),
    {
      expiresIn: "2h",
    }
  );

  return createCookie(DONATION_CHECKOUT_COOKIE, token, 60 * 60 * 2);
};

export const createDonationAccessCookie = (
  donationId: string,
  customerId: string
) => {
  const token = sign(
    {
      donationId,
      customerId,
      type: "access",
    },
    getDonationAuthSecret(),
    {
      expiresIn: "30d",
    }
  );

  return createCookie(
    getDonationAccessCookieName(donationId),
    token,
    60 * 60 * 24 * 30
  );
};

export const getDonationAccessCookieName = (donationId: string) =>
  `${DONATION_ACCESS_COOKIE}_${donationId}`;

export const clearDonationCookie = (cookieName: string) => {
  return serialize(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
};

export const getCookieValue = (
  req: IncomingMessage,
  cookieName: string
): string | undefined => {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return undefined;
  }

  return parse(cookieHeader)[cookieName];
};

export const verifyDonationToken = (
  token: string | undefined,
  expectedType: DonationTokenType
) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = verify(token, getDonationAuthSecret(), {
      algorithms: ["HS256"],
    });

    if (typeof decoded === "string") {
      return null;
    }

    const payload = decoded as DonationTokenPayload;

    if (payload.type !== expectedType) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
};
