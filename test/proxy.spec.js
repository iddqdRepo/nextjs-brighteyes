import { jest } from "@jest/globals";

const mockRedirect = jest.fn((url) => ({
  kind: "redirect",
  url: url.toString(),
}));
const mockNext = jest.fn(() => ({
  kind: "next",
}));
const mockJwtVerify = jest.fn();
const originalEnv = process.env;

const createRequest = ({ token = "jwt-token", url } = {}) => ({
  url: url ?? "https://brighteyes.test/admin/forms",
  cookies: {
    get: jest.fn().mockReturnValue(token ? { value: token } : undefined),
  },
});

const loadProxyModule = async () => {
  jest.doMock("next/server", () => ({
    __esModule: true,
    NextResponse: {
      redirect: mockRedirect,
      next: mockNext,
    },
  }));

  jest.doMock("jose", () => ({
    __esModule: true,
    jwtVerify: (...args) => mockJwtVerify(...args),
  }));

  return import("../proxy");
};

describe("admin proxy", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env = {
      ...originalEnv,
      SECRET: "proxy-secret",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("uses the admin matcher", async () => {
    const { config } = await loadProxyModule();

    expect(config).toEqual({
      matcher: ["/admin/:path*"],
    });
  });

  test("redirects to login when the auth cookie is missing", async () => {
    const { proxy } = await loadProxyModule();
    const response = await proxy(createRequest({ token: null }));

    expect(mockRedirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: "/login",
      })
    );
    expect(response).toEqual({
      kind: "redirect",
      url: "https://brighteyes.test/login",
    });
  });

  test("redirects to login when JWT verification fails", async () => {
    mockJwtVerify.mockRejectedValue(new Error("invalid token"));

    const { proxy } = await loadProxyModule();
    const response = await proxy(createRequest());

    expect(mockRedirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: "/login",
      })
    );
    expect(response).toEqual({
      kind: "redirect",
      url: "https://brighteyes.test/login",
    });
  });
});
