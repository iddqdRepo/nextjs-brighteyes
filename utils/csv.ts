//Spreadsheet applications can execute cells beginning with formula markers.
//Donor-controlled text is therefore forced to text before RFC 4180 quoting.
export const escapeCsvCell = (
  value: string | number | boolean | null
): string => {
  const stringValue = value === null ? "" : String(value);
  const safeValue =
    typeof value === "string" && /^\s*[=+\-@]/.test(stringValue)
      ? `'${stringValue}`
      : stringValue;

  return `"${safeValue.replace(/"/g, '""')}"`;
};
