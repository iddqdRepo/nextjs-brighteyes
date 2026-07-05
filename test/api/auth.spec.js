/**
 * @jest-environment node
 */
import { sign } from "jsonwebtoken";
import { getAuthUser, requireAuth, AUTH_COOKIE } from "../../utils/auth";

const OLD_ENV = process.env;

beforeAll(() => {
  process.env = { ...OLD_ENV, SECRET: "test-secret" };
});

afterAll(() => {
  process.env = OLD_ENV;
});

const makeRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe("getAuthUser", () => {
  it("returns null when no cookie is present", () => {
    expect(getAuthUser({ cookies: {} })).toBeNull();
  });

  it("returns null for a malformed token", () => {
    expect(getAuthUser({ cookies: { [AUTH_COOKIE]: "not-a-jwt" } })).toBeNull();
  });

  it("returns null for a token signed with the wrong secret", () => {
    const token = sign({ username: "admin" }, "some-other-secret");
    expect(getAuthUser({ cookies: { [AUTH_COOKIE]: token } })).toBeNull();
  });

  it("returns the user for a token signed with the correct secret", () => {
    const token = sign({ username: "admin" }, "test-secret");
    expect(getAuthUser({ cookies: { [AUTH_COOKIE]: token } })).toEqual({
      username: "admin",
    });
  });
});

describe("requireAuth", () => {
  it("responds 401 and does not run the handler when unauthenticated", async () => {
    const handler = jest.fn();
    const res = makeRes();

    await requireAuth(handler)({ cookies: {} }, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(handler).not.toHaveBeenCalled();
  });

  it("runs the handler when authenticated", async () => {
    const token = sign({ username: "admin" }, "test-secret");
    const handler = jest.fn();
    const res = makeRes();

    await requireAuth(handler)({ cookies: { [AUTH_COOKIE]: token } }, res);

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
