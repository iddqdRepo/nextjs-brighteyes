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

beforeEach(() => {
  mockFind.mockReset().mockResolvedValue([]);
  mockCreate.mockReset().mockResolvedValue({ _id: "1" });
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
