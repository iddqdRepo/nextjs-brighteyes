import { NextApiRequest, NextApiResponse } from "next";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import type { AuthenticatorTransportFuture } from "@simplewebauthn/types";
import userModel from "../../../../models/userModel";
import dbConnect from "../../../../utils/dbConnect";
import {
  buildChallengeCookie,
  relyingParty,
  setCookies,
} from "../../../../utils/webauthn";

const NOT_AVAILABLE_MESSAGE =
  "Passkey sign-in isn't set up for this account yet";

//Step 1 of passkey login: given a username, return which credentials may sign
//the challenge. The challenge travels back in a short-lived signed cookie.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { username } = req.body || {};
  if (typeof username !== "string" || !username) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter your username first" });
  }

  try {
    await dbConnect();
    const user = await userModel.findOne({ username }).lean();
    const authenticators: {
      credentialID: string;
      transports?: string[];
    }[] = user?.authenticators || [];

    //Same response whether the user doesn't exist or has no passkeys, so this
    //endpoint can't be used to enumerate usernames.
    if (authenticators.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: NOT_AVAILABLE_MESSAGE });
    }

    const { rpID } = relyingParty(req);
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: "preferred",
      allowCredentials: authenticators.map((authenticator) => ({
        id: isoBase64URL.toBuffer(authenticator.credentialID),
        type: "public-key" as const,
        transports: authenticator.transports?.length
          ? (authenticator.transports as AuthenticatorTransportFuture[])
          : undefined,
      })),
    });

    setCookies(res, [
      buildChallengeCookie({
        challenge: options.challenge,
        username,
        purpose: "login",
      }),
    ]);
    return res.status(200).json({ success: true, options });
  } catch (error) {
    console.error("webauthn/login-options error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default handler;
