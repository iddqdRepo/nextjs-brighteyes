import { TextEncoder } from "util";

Object.defineProperty(global, "TextEncoder", {
  configurable: true,
  value: TextEncoder,
});

const mockRedirect = jest.fn((url) => ({ kind: "redirect", url }));
const mockNext = jest.fn(() => ({ kind: "next" }));

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: (...args) => mockRedirect(...args),
    next: (...args) => mockNext(...args),
  },
}));

jest.mock("jose", () => ({
  __esModule: true,
  jwtVerify: jest.fn().mockResolvedValue({ payload: {} }),
}));

// eslint-disable-next-line import/first
import middleware from "../middleware";

const mockJwtVerify = jest.requireMock("jose").jwtVerify;
const OLD_SECRET = process.env.SECRET;

const request = (pathname, cookie) => ({
  nextUrl: {
    origin: "https://example.test",
    pathname,
  },
  cookies: {
    get: jest.fn(() => cookie),
  },
});

describe("admin middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SECRET = "test-secret";
  });

  afterAll(() => {
    if (OLD_SECRET === undefined) {
      delete process.env.SECRET;
    } else {
      process.env.SECRET = OLD_SECRET;
    }
  });

  it("does not treat an admin-looking query string as an admin route", async () => {
    const result = await middleware(request("/donate", undefined));

    expect(result).toEqual({ kind: "next" });
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("accepts the cookie object returned by current Next versions", async () => {
    const req = request("/admin/settings", {
      name: "BrightEyesJWTToken",
      value: "signed-token",
    });
    const result = await middleware(req);

    expect(req.cookies.get).toHaveBeenCalledWith("BrightEyesJWTToken");
    expect(result).toEqual({ kind: "next" });
    expect(mockJwtVerify).toHaveBeenCalled();
  });

  it("redirects admin routes when the server secret is missing", async () => {
    delete process.env.SECRET;
    const result = await middleware(
      request("/admin", {
        name: "BrightEyesJWTToken",
        value: "anything",
      })
    );

    expect(result).toEqual({
      kind: "redirect",
      url: "https://example.test/login",
    });
  });
});
