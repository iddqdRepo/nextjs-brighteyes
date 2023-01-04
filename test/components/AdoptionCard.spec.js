import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { AdoptionCard } from "../../components/LayoutComponents/AdoptionLayout/AdoptionLayoutComponents";

describe("AdoptionCard", () => {
  let expectedProps;
  beforeEach(() => {
    expectedProps = {
      name: "testCat",
      type: "Cat",
      age: "12 years",
      sex: "Male",
      image: "",
      id: 1,
    };
  });

  test("should render name, age, sex, type", () => {
    const { getByText } = render(<AdoptionCard {...expectedProps} />);

    const name = getByText(expectedProps.name);
    const type = getByText(expectedProps.type);
    const age = getByText(expectedProps.age);
    const sex = getByText(expectedProps.sex);

    expect(name).toBeVisible();
    expect(type).toBeVisible();
    expect(age).toBeVisible();
    expect(sex).toBeVisible();
  });
});
