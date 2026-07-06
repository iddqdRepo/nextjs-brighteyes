import React from "react";
import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Field, Formik, FormikConfig } from "formik";
import { FormikFormContainer } from "../../components/IndividualFormLayout/CommonFormComponents";

describe("FormikFormContainer", () => {
  const renderForm = (
    onSubmit: FormikConfig<{ name: string }>["onSubmit"],
    submitting = false
  ) =>
    render(
      <Formik initialValues={{ name: "" }} onSubmit={onSubmit}>
        <FormikFormContainer submitting={submitting}>
          <Field name="name" />
          <button type="submit">Save</button>
        </FormikFormContainer>
      </Formik>
    );

  it("routes native form submission through Formik", async () => {
    const onSubmit = jest.fn(() => undefined);
    const view = renderForm(onSubmit);

    fireEvent.submit(view.container.querySelector("form")!);

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it("blocks another native submission while a request is in flight", () => {
    const onSubmit = jest.fn(() => undefined);
    const view = renderForm(onSubmit, true);

    fireEvent.submit(view.container.querySelector("form")!);

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
