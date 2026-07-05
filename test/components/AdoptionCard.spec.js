import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { AnimalCard } from "../../components/LayoutComponents/AdoptionLayout/AdoptionLayoutComponents";

describe("AnimalCard", () => {
  let pet;
  beforeEach(() => {
    pet = {
      _id: "1",
      type: "Cat",
      name: "testCat",
      age: "12",
      sex: "Male",
      yearsOrMonths: "Years",
      breed: "Domestic short hair",
      size: "Small",
      image: "",
      suitableForChildren: "Yes",
      suitableForAnimals: "Yes",
      adopted: "No",
      desc: "A lovely cat",
    };
  });

  test("should render name, age, sex, breed", () => {
    const { getByText } = render(<AnimalCard pet={pet} />);

    const name = getByText(pet.name);
    const breed = getByText(pet.breed);
    const age = getByText(`${pet.age} ${pet.yearsOrMonths}`);
    const sex = getByText(pet.sex);

    expect(name).toBeVisible();
    expect(breed).toBeVisible();
    expect(age).toBeVisible();
    expect(sex).toBeVisible();
  });

  test("should link to the animal's detail page", () => {
    const { container } = render(<AnimalCard pet={pet} />);

    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", `/adoption/${pet._id}`);
  });
});
