import { describe, expect, it } from "@jest/globals";
import { escapeCsvCell } from "../../utils/csv";

describe("escapeCsvCell", () => {
  it("quotes cells and escapes embedded quotes", () => {
    expect(escapeCsvCell('A "quoted" name')).toBe('"A ""quoted"" name"');
  });

  it.each(["=1+1", "+SUM(A1:A2)", "-2+3", "@IMPORT", "  =cmd"])(
    "neutralizes spreadsheet formula input %s",
    (value) => {
      expect(escapeCsvCell(value)).toBe(`"'${value}"`);
    }
  );

  it("does not alter legitimate numbers", () => {
    expect(escapeCsvCell(25)).toBe('"25"');
  });
});
