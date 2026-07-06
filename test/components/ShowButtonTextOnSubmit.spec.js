import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ShowButtonTextOnSubmit } from "../../components/common/CommonComponents";

//The submit button is the only feedback staff get when saving an animal or
//sending a form, so its three states have to be unmistakable.
describe("ShowButtonTextOnSubmit", () => {
  const renderButton = (overrides = {}) =>
    render(
      <ShowButtonTextOnSubmit
        loading={false}
        isSuccess={false}
        buttonText="Add Animal"
        submitHandler={jest.fn()}
        animalName="Rex"
        {...overrides}
      />
    );

  it("shows the action text and submits on click", () => {
    const submitHandler = jest.fn();
    renderButton({ submitHandler });

    const button = screen.getByRole("button", { name: "Add Animal" });
    fireEvent.click(button);
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it("confirms success with the submitted name and stops submitting", () => {
    const submitHandler = jest.fn();
    renderButton({ isSuccess: true, submitHandler });

    const button = screen.getByRole("button", { name: /Submitted Rex/ });
    //Cypress specs assert this exact wording — it must not change.
    expect(button).toHaveTextContent("Submitted Rex");
    fireEvent.click(button);
    expect(submitHandler).not.toHaveBeenCalled();
  });

  it("falls back to plain 'Submitted' when there is no name", () => {
    renderButton({ isSuccess: true, animalName: "" });
    expect(screen.getByRole("button")).toHaveTextContent("Submitted");
  });

  it("shows the spinner while submitting", () => {
    renderButton({ loading: true });
    expect(screen.getByText("Submitting...")).toBeInTheDocument();
  });
});
