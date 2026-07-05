import { NextApiRequest, NextApiResponse } from "next";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import type { AuthenticatorTransportFuture } from "@simplewebauthn/types";
import userModel from "../../../../models/userModel";
import dbConnect from "../../../../utils/dbConnect";
import { buildAuthCookie } from "../../../../utils/auth";
import {
  clearChallengeCookie,
  readChallenge,
  relyingParty,
  setCookies,
} from "../../../../utils/webauthn";

//Step 2 of passkey login: verify the authenticator's signature over the
//challenge, then issue the same session cookie as a password login.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const stored = readChallenge(req, "login");
  if (!stored) {
    return res.status(400).json({
      success: false,
      message: "Sign-in expired — please try again",
    });
  }

  try {
    await dbConnect();
    const user = await userModel.findOne({ username: stored.username }).lean();
    const authenticator = (user?.authenticators || []).find(
      (candidate: { credentialID: string }) =>
        candidate.credentialID === req.body?.id
    );

    if (!user || !authenticator) {
      return res
        .status(401)
        .json({ success: false, message: "Sign-in failed" });
    }

    const { rpID, origin } = relyingParty(req);
    const verification = await verifyAuthenticationResponse({
      response: req.body,
      expectedChallenge: stored.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        credentialID: isoBase64URL.toBuffer(authenticator.credentialID),
        credentialPublicKey: isoBase64URL.toBuffer(
          authenticator.credentialPublicKey
        ),
        counter: authenticator.counter,
        transports: authenticator.transports as
          | AuthenticatorTransportFuture[]
          | undefined,
      },
    });

    if (!verification.verified) {
      return res
        .status(401)
        .json({ success: false, message: "Sign-in failed" });
    }

    //Track the signature counter to detect cloned authenticators.
    await userModel.updateOne(
      {
        username: user.username,
        "authenticators.credentialID": authenticator.credentialID,
      },
      {
        $set: {
          "authenticators.$.counter":
            verification.authenticationInfo.newCounter,
        },
      }
    );

    setCookies(res, [buildAuthCookie(user.username), clearChallengeCookie()]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("webauthn/login-verify error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default handler;
