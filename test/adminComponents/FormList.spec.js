import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { FormList } from "../../adminComponents/AdminForms/AdminFormsLayoutComponents";

describe("AdoptionCard", () => {
  let expectedProps;
  beforeEach(() => {
    expectedProps = {
      list: [
        {
          _id: "123",
          aboutQuestions: { name: "TestName" },
          type: "Dog",
          updatedAt: "2022-11-16T09:45:23.546Z",
          archive: "No",
        },
      ],
      type: "pet",
      isArchive: "false",
      searchText: "",
      tableHeaderArray: [
        "Name",
        "Type",
        "Submitted",
        "View",
        "Archive",
        "Delete",
      ],
      deleteOrUpdateInfo: () => {},
      petFilter: "",
      setHidden: false,
    };
  });

  test("should render name, age, sex, type", () => {
    const { getByText } = render(<FormList {...expectedProps} />);

    const name = getByText("TestName");
    const type = getByText("Dog form");

    expect(name).toBeVisible();
    expect(type).toBeVisible();
  });
});
