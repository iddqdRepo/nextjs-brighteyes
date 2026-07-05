import { sanitizeInput } from "../../utils/sanitizeData";

describe("sanitizeInput", () => {
  test("trims and capitalizes user-editable pet fields without mutating excluded metadata", () => {
    const original = {
      adopted: " no ",
      age: " 2 years ",
      breed: " labrador ",
      desc: " friendly dog ",
      image: "  raw-image-data  ",
      name: " fido ",
      sex: " male ",
      size: " medium ",
      suitableForAnimals: " yes ",
      suitableForChildren: " no ",
      type: " dog ",
      yearsOrMonths: " years ",
      updatedAt: " 2024-01-01T00:00:00.000Z ",
      __v: 3,
      _id: " pet-123 ",
    };

    const sanitized = sanitizeInput(original);

    expect(sanitized).toMatchObject({
      adopted: "No",
      age: "2 years",
      breed: "Labrador",
      desc: "Friendly dog",
      name: "Fido",
      sex: "Male",
      size: "Medium",
      suitableForAnimals: "Yes",
      suitableForChildren: "No",
      type: "Dog",
      yearsOrMonths: "Years",
    });
    expect(sanitized.image).toBe("  raw-image-data  ");
    expect(sanitized.updatedAt).toBe(" 2024-01-01T00:00:00.000Z ");
    expect(sanitized.__v).toBe(3);
    expect(sanitized._id).toBe(" pet-123 ");
  });
});
