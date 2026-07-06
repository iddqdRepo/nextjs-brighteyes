/**
 * @jest-environment node
 */
import { sign } from "jsonwebtoken";

jest.mock("../../utils/dbConnect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined),
}));

const mockFindOne = jest.fn();
const mockFind = jest.fn();
const mockCreate = jest.fn();
const mockDeleteOne = jest.fn();
const mockFindOneAndUpdate = jest.fn();
const mockCountDocuments = jest.fn();

jest.mock("../../models/userModel", () => ({
  __esModule: true,
  default: {
    findOne: (...args) => mockFindOne(...args),
    find: (...args) => mockFind(...args),
    create: (...args) => mockCreate(...args),
    deleteOne: (...args) => mockDeleteOne(...args),
    findOneAndUpdate: (...args) => mockFindOneAndUpdate(...args),
    countDocuments: (...args) => mockCountDocuments(...args),
  },
}));

// eslint-disable-next-line import/first
import usersHandler from "../../pages/api/users/index";
// eslint-disable-next-line import/first
import userHandler from "../../pages/api/users/[username]";
// eslint-disable-next-line import/first
import { AUTH_COOKIE } from "../../utils/auth";

const OLD_ENV = process.env;

beforeAll(() => {
  process.env = { ...OLD_ENV, SECRET: "test-secret" };
});

afterAll(() => {
  process.env = OLD_ENV;
});

//findOne is used both to resolve the requester and to inspect the target
//user, so route calls by username.
const usersInDb = (usersByName) => {
  mockFindOne.mockImplementation((query) => ({
    lean: () => Promise.resolve(usersByName[query.username] ?? null),
  }));
};

beforeEach(() => {
  jest.clearAllMocks();
  mockFind.mockResolvedValue([]);
  mockCreate.mockResolvedValue({ _id: "1", username: "new" });
  mockDeleteOne.mockResolvedValue({ deletedCount: 1 });
  mockFindOneAndUpdate.mockResolvedValue({ username: "someone" });
  mockCountDocuments.mockResolvedValue(2);
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

describe("team management is superuser-only", () => {
  it("refuses staff accounts with 403", async () => {
    usersInDb({
      staffer: { username: "staffer", role: "staff", permissions: {} },
    });
    const res = makeRes();
    await usersHandler(
      { method: "GET", query: {}, cookies: cookieFor("staffer") },
      res
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(mockFind).not.toHaveBeenCalled();
  });

  it("lets a legacy account (no role) manage the team", async () => {
    usersInDb({ boss: { username: "boss" } });
    const res = makeRes();
    await usersHandler(
      { method: "GET", query: {}, cookies: cookieFor("boss") },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("stores staff permissions when creating a user", async () => {
    usersInDb({ boss: { username: "boss", role: "superuser" } });
    const res = makeRes();
    await usersHandler(
      {
        method: "POST",
        query: {},
        cookies: cookieFor("boss"),
        body: {
          username: "volunteer",
          password: "long-enough-pw",
          role: "staff",
          permissions: { animals: true, forms: false, donations: false },
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "volunteer",
        role: "staff",
        permissions: { animals: true, forms: false, donations: false },
      })
    );
  });

  it("refuses to create a duplicate username with 409", async () => {
    usersInDb({
      boss: { username: "boss", role: "superuser" },
      taken: { username: "taken", role: "staff" },
    });
    const res = makeRes();
    await usersHandler(
      {
        method: "POST",
        query: {},
        cookies: cookieFor("boss"),
        body: { username: "taken", password: "long-enough-pw" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(409);
    expect(mockCreate).not.toHaveBeenCalled();
  });
});

describe("lockout guards", () => {
  it("stops a superuser deleting their own account", async () => {
    usersInDb({ boss: { username: "boss", role: "superuser" } });
    const res = makeRes();
    await userHandler(
      {
        method: "DELETE",
        query: { username: "boss" },
        cookies: cookieFor("boss"),
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockDeleteOne).not.toHaveBeenCalled();
  });

  it("stops a superuser demoting their own account", async () => {
    usersInDb({ boss: { username: "boss", role: "superuser" } });
    const res = makeRes();
    await userHandler(
      {
        method: "PUT",
        query: { username: "boss" },
        cookies: cookieFor("boss"),
        body: { role: "staff", permissions: {} },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockFindOneAndUpdate).not.toHaveBeenCalled();
  });

  it("stops the last superuser being deleted", async () => {
    usersInDb({
      boss: { username: "boss", role: "superuser" },
      other: { username: "other" }, //legacy account, also a superuser
    });
    mockCountDocuments.mockResolvedValue(1);
    const res = makeRes();
    await userHandler(
      {
        method: "DELETE",
        query: { username: "other" },
        cookies: cookieFor("boss"),
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockDeleteOne).not.toHaveBeenCalled();
  });

  it("allows removing a staff account", async () => {
    usersInDb({
      boss: { username: "boss", role: "superuser" },
      staffer: { username: "staffer", role: "staff", permissions: {} },
    });
    const res = makeRes();
    await userHandler(
      {
        method: "DELETE",
        query: { username: "staffer" },
        cookies: cookieFor("boss"),
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockDeleteOne).toHaveBeenCalledWith({ username: "staffer" });
  });

  it("hashes a reset password before saving it", async () => {
    usersInDb({
      boss: { username: "boss", role: "superuser" },
      staffer: { username: "staffer", role: "staff", permissions: {} },
    });
    const res = makeRes();
    await userHandler(
      {
        method: "PUT",
        query: { username: "staffer" },
        cookies: cookieFor("boss"),
        body: { password: "new-password" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    const update = mockFindOneAndUpdate.mock.calls[0][1];
    expect(update.password).toBeDefined();
    expect(update.password).not.toBe("new-password");
  });
});
