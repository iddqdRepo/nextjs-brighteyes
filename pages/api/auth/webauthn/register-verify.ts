import { NextApiRequest, NextApiResponse } from "next";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import userModel from "../../../../models/userModel";
import dbConnect from "../../../../utils/dbConnect";
import { getAuthUser, requireAuth } from "../../../../utils/auth";
import {
  clearChallengeCookie,
  readChallenge,
  relyingParty,
  setCookies,
} from "../../../../utils/webauthn";

//Step 2 of registering a passkey: verify the authenticator's response against
//the challenge issued in step 1, then store the new credential on the user.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const authUser = getAuthUser(req);
  const stored = readChallenge(req, "register");
  if (!stored || stored.username !== authUser!.username) {
    return res.status(400).json({
      success: false,
      message: "Registration expired — please try again",
    });
  }

  try {
    await dbConnect();
    const { rpID, origin } = relyingParty(req);
    const verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge: stored.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return res.status(400).json({
        success: false,
        message: "This device could not be verified",
      });
    }

    const { credentialID, credentialPublicKey, counter } =
      verification.registrationInfo;
    await userModel.updateOne(
      { username: authUser!.username },
      {
        $push: {
          authenticators: {
            credentialID: isoBase64URL.fromBuffer(credentialID),
            credentialPublicKey: isoBase64URL.fromBuffer(credentialPublicKey),
            counter,
            transports: req.body?.response?.transports || [],
          },
        },
      }
    );

    setCookies(res, [clearChallengeCookie()]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("webauthn/register-verify error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default requireAuth(handler);
