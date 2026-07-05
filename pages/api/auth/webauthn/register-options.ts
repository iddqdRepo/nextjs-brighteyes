import { NextApiRequest, NextApiResponse } from "next";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import type { AuthenticatorTransportFuture } from "@simplewebauthn/types";
import userModel from "../../../../models/userModel";
import dbConnect from "../../../../utils/dbConnect";
import { getAuthUser, requireAuth } from "../../../../utils/auth";
import {
  buildChallengeCookie,
  relyingParty,
  setCookies,
} from "../../../../utils/webauthn";

//Step 1 of registering a passkey: a logged-in admin asks for registration
//options; the challenge is handed back in a short-lived signed cookie.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const authUser = getAuthUser(req);

  try {
    await dbConnect();
    const user = await userModel
      .findOne({ username: authUser!.username })
      .lean();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { rpID, rpName } = relyingParty(req);
    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: String(user._id),
      userName: user.username,
      attestationType: "none",
      excludeCredentials: (user.authenticators || []).map(
        (authenticator: { credentialID: string; transports?: string[] }) => ({
          id: isoBase64URL.toBuffer(authenticator.credentialID),
          type: "public-key" as const,
          transports: authenticator.transports as
            | AuthenticatorTransportFuture[]
            | undefined,
        })
      ),
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "preferred",
      },
    });

    setCookies(res, [
      buildChallengeCookie({
        challenge: options.challenge,
        username: user.username,
        purpose: "register",
      }),
    ]);
    return res.status(200).json({ success: true, options });
  } catch (error) {
    console.error("webauthn/register-options error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default requireAuth(handler);
