/* eslint-disable no-import-assign */
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import * as nextRouter from "next/router";
import Donate from "../../pages/donate";
import { jest } from "@jest/globals";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/donate" }));

describe("Donate", () => {
  test("donation page shows the secure card payment CTA", () => {
    render(<Donate />);
    const donateButton = screen.getByRole("button", {
      name: /continue to secure card payment/i,
    });
    expect(donateButton).toBeInTheDocument();
  });

  test("one-off gift aid does not silently opt donors into future donations", async () => {
    render(<Donate />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /one-off gift/i }));
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: /yes, add gift aid/i })
      );
    });

    const futureDeclarationCheckbox = screen.getByLabelText(
      /apply this declaration to future donations/i
    );

    expect(futureDeclarationCheckbox).not.toBeChecked();
  });

  test("monthly gift aid shows the continuing declaration note", async () => {
    render(<Donate />);

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: /yes, add gift aid/i })
      );
    });

    expect(
      screen.getByText(/because this is a monthly donation/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/apply this declaration to future donations/i)
    ).not.toBeInTheDocument();
  });
});
