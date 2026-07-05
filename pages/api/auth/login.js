import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";

const secret = process.env.SECRET;

//A hash of a value no user password will match. Comparing against this when the
//username is unknown keeps the response time similar to a real login, which
//avoids leaking which usernames exist.
const DUMMY_HASH = bcrypt.hashSync("invalid-placeholder-password", 10);

//Best-effort, in-memory brute-force throttle. It resets when a serverless
//instance recycles, but still blunts sustained attacks against a warm instance
//and costs nothing to run.
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map();

const getClientKey = (req, username) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : (forwarded || "").split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";
  return `${ip}:${username || ""}`;
};

const isRateLimited = (key) => {
  const entry = attempts.get(key);
  if (!entry) {
    return false;
  }
  if (Date.now() - entry.firstAttempt > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
};

const recordFailure = (key) => {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.firstAttempt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttempt: Date.now() });
    return;
  }
  entry.count += 1;
};

export default async function login(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  if (!secret) {
    return res
      .status(500)
      .json({ success: false, message: "Server is not configured" });
  }

  const { username, password } = req.body || {};

  if (typeof username !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid username or password" });
  }

  const rateKey = getClientKey(req, username);
  if (isRateLimited(rateKey)) {
    return res.status(429).json({
      success: false,
      message: "Too many attempts. Please try again later.",
    });
  }

  try {
    await dbConnect();

    const user = await userModel.findOne({ username }).lean();
    const passwordMatches = await bcrypt.compare(
      password,
      user ? user.password : DUMMY_HASH
    );

    if (!user || !passwordMatches) {
      recordFailure(rateKey);
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    attempts.delete(rateKey);

    const token = sign({ username }, secret, { expiresIn: "30d" });

    const serialised = serialize("BrightEyesJWTToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, //when the cookie expires
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Login error", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to log in right now" });
  }
}
