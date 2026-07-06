/**
 * @jest-environment node
 */
import logout from "../../pages/api/auth/logout";
import { AUTH_COOKIE } from "../../utils/auth";

const makeRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.setHeader = jest.fn();
  return res;
};

describe("/api/auth/logout", () => {
  it("rejects methods other than POST", async () => {
    const res = makeRes();
    await logout({ method: "GET", cookies: {} }, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.setHeader).toHaveBeenCalledWith("Allow", "POST");
  });

  it("expires the authentication cookie", async () => {
    const res = makeRes();
    await logout(
      {
        method: "POST",
        cookies: { [AUTH_COOKIE]: "token" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      expect.stringMatching(/BrightEyesJWTToken=;.*Max-Age=0/)
    );
  });
});
