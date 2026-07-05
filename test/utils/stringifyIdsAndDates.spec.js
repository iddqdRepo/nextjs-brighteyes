import { stringifyIdsAndDates } from "../../utils/stringifyIdsAndDates";

describe("stringifyIdsAndDates", () => {
  test("stringifies ids and date-like fields recursively inside nested objects and arrays", () => {
    const createdAt = new Date("2024-01-01T12:00:00.000Z");
    const updatedAt = new Date("2024-02-01T12:00:00.000Z");
    const innerDate = new Date("2024-03-01T12:00:00.000Z");
    const data = {
      _id: { toString: () => "root-id" },
      createdAt,
      nested: {
        updatedAt,
        items: [
          {
            _id: { toString: () => "child-id" },
            date: innerDate,
          },
        ],
      },
    };

    stringifyIdsAndDates(data);

    expect(data).toEqual({
      _id: "root-id",
      createdAt: createdAt.toString(),
      nested: {
        updatedAt: updatedAt.toString(),
        items: [
          {
            _id: "child-id",
            date: innerDate.toString(),
          },
        ],
      },
    });
  });

  test("handles top-level arrays and primitives without throwing", () => {
    const updatedAt = new Date("2024-04-01T12:00:00.000Z");
    const topLevelArray = [
      {
        updatedAt,
      },
    ];

    expect(() => stringifyIdsAndDates(topLevelArray)).not.toThrow();
    expect(topLevelArray).toEqual([
      {
        updatedAt: updatedAt.toString(),
      },
    ]);
    expect(() => stringifyIdsAndDates("plain string")).not.toThrow();
  });
});
