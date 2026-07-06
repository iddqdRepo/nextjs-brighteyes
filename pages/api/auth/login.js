import bcrypt from "bcrypt";
import userModel from "../../../models/userModel";
import dbConnect from "../../../utils/dbConnect";
import { buildAuthCookie } from "../../../utils/auth";

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

const getClientKey = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : (forwarded || "").split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";
  return ip;
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
  //Keep a spray of made-up client addresses from growing this warm-instance
  //cache without bound. Expired entries go first; the oldest remaining entry
  //is discarded only if the hard cap is still reached.
  if (attempts.size >= 10000) {
    const now = Date.now();
    for (const [attemptKey, attempt] of attempts) {
      if (now - attempt.firstAttempt > WINDOW_MS) {
        attempts.delete(attemptKey);
      }
    }
    if (attempts.size >= 10000) {
      attempts.delete(attempts.keys().next().value);
    }
  }

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

  //Throttle the client, not client+username. Otherwise changing the username
  //on every request bypasses the limit and grows the in-memory map forever.
  const rateKey = getClientKey(req);
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

    res.setHeader("Set-Cookie", buildAuthCookie(username));
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Login error", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to log in right now" });
  }
}
