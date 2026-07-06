import { writePetDescription, TRAIT_OPTIONS } from "../../utils/petDescription";

//The description writer must never claim anything the form doesn't say —
//staff click "Write it for me" on half-filled forms, so every blank field
//has to stay silent rather than default to a guess.
describe("writePetDescription", () => {
  const base = {
    name: "Rex",
    type: "Dog",
    sex: "Male",
    age: "3",
    yearsOrMonths: "Years",
    breed: "Collie",
    suitableForChildren: "Yes",
    suitableForAnimals: "Yes",
  };

  it("does not treat a blank suitability answer as 'No'", () => {
    const text = writePetDescription(
      { ...base, suitableForAnimals: "" },
      [],
      0
    );
    expect(text).toContain("suitable for a home with children");
    expect(text.toLowerCase()).not.toContain("only pet");
  });

  it("says nothing about suitability when both answers are blank", () => {
    const text = writePetDescription(
      { ...base, suitableForChildren: "", suitableForAnimals: "" },
      [],
      0
    );
    expect(text.toLowerCase()).not.toContain("children");
    expect(text.toLowerCase()).not.toContain("pet");
  });

  it("does not call an animal of unknown type a dog", () => {
    const text = writePetDescription({ ...base, type: "", breed: "" }, [], 0);
    expect(text.toLowerCase()).not.toContain("dog");
    expect(text).toContain("animal");
  });

  it("omits the age when the months/years unit is blank", () => {
    const text = writePetDescription(
      { ...base, age: "6", yearsOrMonths: "" },
      [],
      0
    );
    expect(text).not.toContain("6");
  });

  it("uses 'an' before vowel-sound breeds and ages", () => {
    expect(
      writePetDescription({ ...base, breed: "Alsatian", age: "" }, [], 0)
    ).toContain("an Alsatian");
    expect(
      writePetDescription({ ...base, age: "8", yearsOrMonths: "Months" }, [], 0)
    ).toContain("an 8-month-old");
    expect(writePetDescription(base, [], 0)).toContain("a 3-year-old");
  });

  it("ignores unknown traits and deduplicates repeats", () => {
    const text = writePetDescription(
      base,
      ["Playful", "Playful", "Bites postmen"],
      0
    );
    expect(text).not.toContain("Bites postmen");
    expect(text.match(/always ready for a game/g)).toHaveLength(1);
  });

  it("splits many traits across sentences instead of one run-on", () => {
    const text = writePetDescription(base, TRAIT_OPTIONS.slice(0, 5), 0);
    expect(text).toContain("He is also");
  });

  it("copes with a completely blank form", () => {
    const text = writePetDescription({}, [], 0);
    expect(text).toContain("This animal");
    expect(text).not.toContain("undefined");
  });

  it("varies the wording between variants", () => {
    expect(writePetDescription(base, [], 0)).not.toEqual(
      writePetDescription(base, [], 1)
    );
  });
});
