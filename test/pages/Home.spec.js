/* eslint-disable no-import-assign */
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Home from "../../pages/index";
import * as nextRouter from "next/router";
import { jest } from "@jest/globals";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

describe("Home", () => {
  it("must contain a contact form on the homepage", () => {
    render(<Home />);
    const nameInput = screen.getByRole("textbox", {
      name: /Name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /Email/i,
    });
    const messageInput = screen.getByRole("textbox", {
      name: /Message/i,
    });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
  });
});
