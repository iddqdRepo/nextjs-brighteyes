/* eslint-disable no-import-assign */
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import * as nextRouter from "next/router";
import Donate from "../../pages/donate";
import { jest } from "@jest/globals";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/donate" }));

describe("Donate", () => {
  test("donate with paypal image must be on the page", () => {
    render(<Donate />);
    const nameInput = screen.getByAltText(/Donate with PayPal button/i);
    expect(nameInput).toBeInTheDocument();
  });
});
