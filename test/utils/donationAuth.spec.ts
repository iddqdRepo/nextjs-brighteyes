/**
 * @jest-environment node
 */
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import {
  createDonationAccessCookie,
  getDonationAccessCookieName,
} from "../../utils/donationAuth";

const OLD_ENV = process.env;

describe("donation access cookies", () => {
  beforeAll(() => {
    process.env = {
      ...OLD_ENV,
      SECRET: "test-secret",
      NODE_ENV: "development",
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("uses a separate cookie for each donation", () => {
    const firstId = "507f1f77bcf86cd799439011";
    const secondId = "507f191e810c19729de860ea";

    expect(getDonationAccessCookieName(firstId)).not.toBe(
      getDonationAccessCookieName(secondId)
    );
    expect(createDonationAccessCookie(firstId, "cus_1")).toContain(
      `${getDonationAccessCookieName(firstId)}=`
    );
  });
});
