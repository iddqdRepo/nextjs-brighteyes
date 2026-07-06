/**
 * @jest-environment node
 */
import { sign } from "jsonwebtoken";

jest.mock("../../utils/dbConnect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined),
}));

const mockFindOne = jest.fn();

jest.mock("../../models/userModel", () => ({
  __esModule: true,
  default: { findOne: (...args) => mockFindOne(...args) },
}));

process.env.SECRET = "test-secret";
/* eslint-disable @typescript-eslint/no-var-requires */
const registerOptions =
  require("../../pages/api/auth/webauthn/register-options").default;
const loginOptions =
  require("../../pages/api/auth/webauthn/login-options").default;
const loginVerify =
  require("../../pages/api/auth/webauthn/login-verify").default;
const { AUTH_COOKIE } = require("../../utils/auth");
/* eslint-enable @typescript-eslint/no-var-requires */

const userInDb = (user) => {
  mockFindOne.mockReturnValue({ lean: () => Promise.resolve(user) });
};

const makeRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.setHeader = jest.fn();
  return res;
};

const makeReq = ({ body = {}, cookies = {} } = {}) => ({
  method: "POST",
  body,
  cookies,
  headers: { host: "localhost:3000" },
});

const authCookie = () => ({
  [AUTH_COOKIE]: sign({ username: "admin" }, "test-secret"),
});

beforeEach(() => {
  mockFindOne.mockReset();
  userInDb(null);
});

describe("POST /api/auth/webauthn/register-options", () => {
  it("rejects unauthenticated requests with 401", async () => {
    const res = makeRes();
    await registerOptions(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockFindOne).not.toHaveBeenCalled();
  });

  it("returns options and a challenge cookie for a logged-in admin", async () => {
    userInDb({ _id: "user-1", username: "admin", authenticators: [] });
    const res = makeRes();
    await registerOptions(makeReq({ cookies: authCookie() }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    const payload = res.json.mock.calls[0][0];
    expect(payload.options.challenge).toEqual(expect.any(String));
    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      expect.arrayContaining([
        expect.stringContaining("BrightEyesWebAuthnChallenge="),
      ])
    );
  });
});

describe("POST /api/auth/webauthn/login-options", () => {
  it("gives the same answer for an unknown user as for one without passkeys", async () => {
    const unknownRes = makeRes();
    await loginOptions(makeReq({ body: { username: "ghost" } }), unknownRes);

    userInDb({ username: "admin", authenticators: [] });
    const noPasskeyRes = makeRes();
    await loginOptions(makeReq({ body: { username: "admin" } }), noPasskeyRes);

    expect(unknownRes.status).toHaveBeenCalledWith(400);
    expect(noPasskeyRes.status).toHaveBeenCalledWith(400);
    expect(unknownRes.json.mock.calls[0][0]).toEqual(
      noPasskeyRes.json.mock.calls[0][0]
    );
  });

  it("returns allowed credentials and a challenge cookie for a user with a passkey", async () => {
    userInDb({
      username: "admin",
      authenticators: [
        {
          credentialID: "AAAAAAAAAAAAAAAAAAAAAA",
          credentialPublicKey: "AAAA",
          counter: 0,
          transports: ["internal"],
        },
      ],
    });
    const res = makeRes();
    await loginOptions(makeReq({ body: { username: "admin" } }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    const payload = res.json.mock.calls[0][0];
    expect(payload.options.allowCredentials).toHaveLength(1);
    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      expect.arrayContaining([
        expect.stringContaining("BrightEyesWebAuthnChallenge="),
      ])
    );
  });
});

describe("POST /api/auth/webauthn/login-verify", () => {
  it("rejects a verify attempt with no challenge cookie", async () => {
    const res = makeRes();
    await loginVerify(makeReq({ body: { id: "AAAA" } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockFindOne).not.toHaveBeenCalled();
  });

  it("rejects when the credential does not belong to the challenged user", async () => {
    userInDb({ username: "admin", authenticators: [] });
    const challenge = sign(
      { challenge: "abc", username: "admin", purpose: "login" },
      "test-secret"
    );
    const res = makeRes();
    await loginVerify(
      makeReq({
        body: { id: "AAAA" },
        cookies: { BrightEyesWebAuthnChallenge: challenge },
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
