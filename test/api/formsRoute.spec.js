/**
 * @jest-environment node
 */
import { sign } from "jsonwebtoken";

jest.mock("../../utils/dbConnect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined),
}));

const mockFind = jest.fn();
const mockCreate = jest.fn();

jest.mock("../../models/formModels", () => ({
  __esModule: true,
  default: {
    FormContactUsModel: {
      find: (...args) => mockFind(...args),
      create: (...args) => mockCreate(...args),
    },
    FormPetAdoptionModel: {},
    FormGiftAidModel: {},
    FormVolunteerModel: {},
  },
}));

//Reading submissions resolves the requester's account from the database to
//check the forms permission.
const mockUserFindOne = jest.fn();

jest.mock("../../models/userModel", () => ({
  __esModule: true,
  default: { findOne: (...args) => mockUserFindOne(...args) },
}));

// eslint-disable-next-line import/first
import formsHandler from "../../pages/api/forms/index";
// eslint-disable-next-line import/first
import { AUTH_COOKIE } from "../../utils/auth";

const OLD_ENV = process.env;

beforeAll(() => {
  process.env = { ...OLD_ENV, SECRET: "test-secret" };
});

afterAll(() => {
  process.env = OLD_ENV;
});

const requesterInDb = (user) => {
  mockUserFindOne.mockReturnValue({ lean: () => Promise.resolve(user) });
};

beforeEach(() => {
  mockFind.mockReset().mockResolvedValue([]);
  mockCreate.mockReset().mockResolvedValue({ _id: "1" });
  //Default requester: an account created before roles existed (full access).
  mockUserFindOne.mockReset();
  requesterInDb({ username: "admin" });
});

const makeRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.setHeader = jest.fn();
  res.end = jest.fn();
  return res;
};

const validToken = () => sign({ username: "admin" }, "test-secret");

describe("GET /api/forms (reading submissions)", () => {
  it("rejects an unauthenticated request with 401 and never queries the DB", async () => {
    const res = makeRes();
    await formsHandler(
      { method: "GET", query: { type: "contactus" }, cookies: {} },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockFind).not.toHaveBeenCalled();
  });

  it("allows an authenticated admin to read submissions", async () => {
    const res = makeRes();
    await formsHandler(
      {
        method: "GET",
        query: { type: "contactus" },
        cookies: { [AUTH_COOKIE]: validToken() },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockFind).toHaveBeenCalledTimes(1);
  });

  it("allows staff who have been given the forms permission", async () => {
    requesterInDb({
      username: "admin",
      role: "staff",
      permissions: { forms: true },
    });
    const res = makeRes();
    await formsHandler(
      {
        method: "GET",
        query: { type: "contactus" },
        cookies: { [AUTH_COOKIE]: validToken() },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("refuses staff without the forms permission with 403", async () => {
    requesterInDb({
      username: "admin",
      role: "staff",
      permissions: { animals: true },
    });
    const res = makeRes();
    await formsHandler(
      {
        method: "GET",
        query: { type: "contactus" },
        cookies: { [AUTH_COOKIE]: validToken() },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(mockFind).not.toHaveBeenCalled();
  });

  it("refuses a deleted account even with a valid cookie", async () => {
    requesterInDb(null);
    const res = makeRes();
    await formsHandler(
      {
        method: "GET",
        query: { type: "contactus" },
        cookies: { [AUTH_COOKIE]: validToken() },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockFind).not.toHaveBeenCalled();
  });
});

describe("POST /api/forms (public submission)", () => {
  it("accepts a submission from an unauthenticated visitor", async () => {
    const res = makeRes();
    await formsHandler(
      {
        method: "POST",
        query: { type: "contactus" },
        cookies: {},
        body: { message: "Is this dog still available?" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});
