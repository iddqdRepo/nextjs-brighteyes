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
    FormGiftAidModel: {
      create: (...args) => mockCreate(...args),
    },
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
        body: {
          message: "Is this dog still available?",
          aboutQuestions: {
            name: "Visitor",
            email: "visitor@example.com",
          },
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  it("rejects malformed submissions before they reach MongoDB", async () => {
    const res = makeRes();
    await formsHandler(
      {
        method: "POST",
        query: { type: "contactus" },
        cookies: {},
        body: { message: "hello", aboutQuestions: null },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("rejects an adoption payload whose record type is not Dog or Cat", async () => {
    const res = makeRes();
    await formsHandler(
      {
        method: "POST",
        query: { type: "pet" },
        cookies: {},
        body: {
          type: "contactUs",
          aboutQuestions: { name: "Visitor" },
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects a Gift Aid submission without a declaration and donation period", async () => {
    const res = makeRes();
    await formsHandler(
      {
        method: "POST",
        query: { type: "giftaid" },
        body: {
          aboutQuestions: {
            name: "Taxpayer",
            address: "1 High Street",
            postcode: "BT1 1AA",
          },
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("server-stamps an auditable Gift Aid declaration", async () => {
    const res = makeRes();
    await formsHandler(
      {
        method: "POST",
        query: { type: "giftaid" },
        body: {
          giftAidFuture: "Yes",
          giftAidPast: "",
          declarationAccepted: true,
          declarationText: "forged wording",
          acceptedAt: "1999-01-01",
          aboutQuestions: {
            name: " Taxpayer ",
            address: " 1 High Street ",
            postcode: " BT1 1AA ",
          },
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "giftAid",
        giftAidFuture: "Yes",
        giftAidPast: "",
        declarationAccepted: true,
        declarationText: expect.stringContaining(
          "Bright Eyes Animal Sanctuary"
        ),
        declarationTextVersion: "2026-07",
        acceptedAt: expect.any(Date),
      })
    );
  });
});
