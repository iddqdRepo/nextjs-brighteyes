import { jest } from "@jest/globals";

const mockSerialize = jest.fn();

jest.mock("cookie", () => ({
  serialize: mockSerialize,
}));

const createResponse = () => {
  const response = {};
  response.setHeader = jest.fn();
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe("logout api route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env.NODE_ENV = "test";
  });

  test("returns early when there is no auth cookie", async () => {
    const { default: logout } = await import("../../../pages/api/auth/logout");
    const req = {
      cookies: {},
    };
    const res = createResponse();

    await logout(req, res);

    expect(mockSerialize).not.toHaveBeenCalled();
    expect(res.setHeader).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "You are already not logged in",
    });
  });

  test("clears the auth cookie when a session exists", async () => {
    mockSerialize.mockReturnValue("expired-cookie");

    const { default: logout } = await import("../../../pages/api/auth/logout");
    const req = {
      cookies: {
        BrightEyesJWTToken: "existing-token",
      },
    };
    const res = createResponse();

    await logout(req, res);

    expect(mockSerialize).toHaveBeenCalledWith(
      "BrightEyesJWTToken",
      null,
      expect.objectContaining({
        httpOnly: true,
        maxAge: -1,
        path: "/",
        sameSite: "strict",
        secure: true,
      })
    );
    expect(res.setHeader).toHaveBeenCalledWith("Set-Cookie", "expired-cookie");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully logged out",
    });
  });
});
