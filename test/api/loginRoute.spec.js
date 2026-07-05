/**
 * @jest-environment node
 */
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";

jest.mock("../../utils/dbConnect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined),
}));

const mockFindOne = jest.fn();

jest.mock("../../models/userModel", () => ({
  __esModule: true,
  default: { findOne: (...args) => mockFindOne(...args) },
}));

//login.js reads SECRET at module load, so it must be set before the require.
process.env.SECRET = "test-secret";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const login = require("../../pages/api/auth/login").default;

//Cost factor 4 keeps the hashing fast; the route only cares that hashes match.
const PASSWORD = "correct-horse-battery";
const PASSWORD_HASH = bcrypt.hashSync(PASSWORD, 4);

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

const makeReq = ({ method = "POST", body, ip = "203.0.113.1" } = {}) => ({
  method,
  body,
  headers: { "x-forwarded-for": ip },
  socket: {},
  cookies: {},
});

beforeEach(() => {
  mockFindOne.mockReset();
  userInDb(null);
});

describe("POST /api/auth/login", () => {
  it("rejects non-POST methods with 405", async () => {
    const res = makeRes();
    await login(makeReq({ method: "GET" }), res);

    expect(res.status).toHaveBeenCalledWith(405);
  });

  it("rejects a missing username or password with 400", async () => {
    const res = makeRes();
    await login(makeReq({ body: { username: "admin" } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockFindOne).not.toHaveBeenCalled();
  });

  it("rejects an unknown user with 401", async () => {
    const res = makeRes();
    await login(
      makeReq({
        body: { username: "nobody", password: "whatever" },
        ip: "203.0.113.2",
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("rejects a wrong password with 401", async () => {
    userInDb({ username: "admin", password: PASSWORD_HASH });
    const res = makeRes();
    await login(
      makeReq({
        body: { username: "admin", password: "wrong" },
        ip: "203.0.113.3",
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("logs in with the correct password and never puts the password in the JWT", async () => {
    userInDb({ username: "admin", password: PASSWORD_HASH });
    const res = makeRes();
    await login(
      makeReq({
        body: { username: "admin", password: PASSWORD },
        ip: "203.0.113.4",
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      expect.stringContaining("BrightEyesJWTToken=")
    );

    const cookie = res.setHeader.mock.calls.find(
      (call) => call[0] === "Set-Cookie"
    )[1];
    const token = cookie.split("BrightEyesJWTToken=")[1].split(";")[0];
    const payload = verify(token, "test-secret");

    expect(payload.username).toBe("admin");
    expect(payload.password).toBeUndefined();
  });

  it("rate limits after 10 failed attempts with 429", async () => {
    const attempt = () =>
      login(
        makeReq({
          body: { username: "bruteforced", password: "wrong" },
          ip: "203.0.113.5",
        }),
        makeRes()
      );

    for (let i = 0; i < 10; i++) {
      await attempt();
    }

    const res = makeRes();
    await login(
      makeReq({
        body: { username: "bruteforced", password: "wrong" },
        ip: "203.0.113.5",
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(429);
    expect(mockFindOne).toHaveBeenCalledTimes(10);
  });
});
