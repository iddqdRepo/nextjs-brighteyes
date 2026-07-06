/**
 * @jest-environment node
 */
import { sign } from "jsonwebtoken";
import { compareSync } from "bcrypt";

jest.mock("../../utils/dbConnect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined),
}));

const mockFindOne = jest.fn();
const mockUpdateOne = jest.fn();

jest.mock("../../models/userModel", () => ({
  __esModule: true,
  default: {
    findOne: (...args) => mockFindOne(...args),
    updateOne: (...args) => mockUpdateOne(...args),
  },
}));

// eslint-disable-next-line import/first
import meHandler from "../../pages/api/users/me";
// eslint-disable-next-line import/first
import { AUTH_COOKIE } from "../../utils/auth";

const OLD_ENV = process.env;

beforeAll(() => {
  process.env = { ...OLD_ENV, SECRET: "test-secret" };
});

afterAll(() => {
  process.env = OLD_ENV;
});

beforeEach(() => {
  jest.clearAllMocks();
  //The requester exists as a plain staff account: this route must work for
  //every role, not just superusers.
  mockFindOne.mockReturnValue({
    lean: () =>
      Promise.resolve({ username: "staffer", role: "staff", permissions: {} }),
  });
  mockUpdateOne.mockResolvedValue({ acknowledged: true });
});

const makeRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.setHeader = jest.fn();
  return res;
};

const cookieFor = (username) => ({
  [AUTH_COOKIE]: sign({ username }, "test-secret"),
});

describe("PUT /api/users/me (change own password)", () => {
  it("lets any signed-in account change its own password, hashed", async () => {
    const res = makeRes();
    await meHandler(
      {
        method: "PUT",
        cookies: cookieFor("staffer"),
        body: { password: "brand-new-password" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    const [filter, update] = mockUpdateOne.mock.calls[0];
    //Only ever the requester's own record, resolved from the JWT.
    expect(filter).toEqual({ username: "staffer" });
    //Never stored as plaintext, and the hash verifies.
    expect(update.password).not.toBe("brand-new-password");
    expect(compareSync("brand-new-password", update.password)).toBe(true);
  });

  it("rejects unauthenticated requests with 401", async () => {
    const res = makeRes();
    await meHandler(
      { method: "PUT", cookies: {}, body: { password: "brand-new-password" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockUpdateOne).not.toHaveBeenCalled();
  });

  it("rejects a deleted account even with a valid cookie", async () => {
    mockFindOne.mockReturnValue({ lean: () => Promise.resolve(null) });
    const res = makeRes();
    await meHandler(
      {
        method: "PUT",
        cookies: cookieFor("ghost"),
        body: { password: "brand-new-password" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockUpdateOne).not.toHaveBeenCalled();
  });

  it("rejects passwords under 8 characters with 400", async () => {
    const res = makeRes();
    await meHandler(
      {
        method: "PUT",
        cookies: cookieFor("staffer"),
        body: { password: "short" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockUpdateOne).not.toHaveBeenCalled();
  });

  it("rejects a missing/non-string password with 400", async () => {
    const res = makeRes();
    await meHandler(
      { method: "PUT", cookies: cookieFor("staffer"), body: {} },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockUpdateOne).not.toHaveBeenCalled();
  });

  it("only allows PUT", async () => {
    const res = makeRes();
    await meHandler({ method: "GET", cookies: cookieFor("staffer") }, res);

    expect(res.status).toHaveBeenCalledWith(405);
  });
});
