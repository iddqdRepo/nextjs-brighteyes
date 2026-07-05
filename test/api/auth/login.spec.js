import { jest } from "@jest/globals";

const mockSign = jest.fn();
const mockSerialize = jest.fn();
const mockGetUserByUsername = jest.fn();
const mockCompareSync = jest.fn();

jest.mock("jsonwebtoken", () => ({
  sign: mockSign,
}));

jest.mock("cookie", () => ({
  serialize: mockSerialize,
}));

jest.mock("../../../routes/userRoutes", () => ({
  getUserByUsername: mockGetUserByUsername,
}));

jest.mock("bcrypt", () => ({
  __esModule: true,
  default: {
    compareSync: mockCompareSync,
  },
}));

const createResponse = () => {
  const response = {};
  response.setHeader = jest.fn();
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe("login api route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env.SECRET = "test-secret";
    process.env.NODE_ENV = "test";
  });

  test("sets an auth cookie when credentials are valid", async () => {
    mockGetUserByUsername.mockResolvedValue({
      success: true,
      data: [{ password: "hashed-password" }],
    });
    mockCompareSync.mockReturnValue(true);
    mockSign.mockReturnValue("signed-token");
    mockSerialize.mockReturnValue("serialized-cookie");

    const { default: login } = await import("../../../pages/api/auth/login");
    const req = {
      body: {
        username: "admin",
        password: "correct-password",
      },
    };
    const res = createResponse();

    await login(req, res);

    expect(mockGetUserByUsername).toHaveBeenCalledWith("admin");
    expect(mockCompareSync).toHaveBeenCalledWith(
      "correct-password",
      "hashed-password"
    );
    expect(mockSign).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "admin",
        password: "correct-password",
        exp: expect.any(Number),
      }),
      "test-secret"
    );
    expect(mockSerialize).toHaveBeenCalledWith(
      "BrightEyesJWTToken",
      "signed-token",
      expect.objectContaining({
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "strict",
        secure: true,
      })
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "serialized-cookie"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  test("rejects invalid credentials without setting a cookie", async () => {
    mockGetUserByUsername.mockResolvedValue({
      success: false,
      data: [],
    });

    const { default: login } = await import("../../../pages/api/auth/login");
    const req = {
      body: {
        username: "admin",
        password: "wrong-password",
      },
    };
    const res = createResponse();

    await login(req, res);

    expect(mockCompareSync).not.toHaveBeenCalled();
    expect(mockSign).not.toHaveBeenCalled();
    expect(res.setHeader).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid username or password",
    });
  });
});
