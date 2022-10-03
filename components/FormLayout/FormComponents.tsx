import { clsx } from "clsx";

export function Label({
  text,
  hFor,
  classN,
}: {
  text: string;
  hFor: string;
  classN?: string;
}) {
  return (
    <label
      htmlFor="productTitle"
      className={clsx(
        "block mb-2 text-sm font-medium font-poppins text-gray-900 dark:text-gray-300",
        classN
      )}
    >
      {text}
    </label>
  );
}

export function FieldSet({
  legendText,
  children,
}: {
  legendText?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col items-center w-full p-3 mb-10 border border-gray-300 border-solid">
      <legend className="text-sm">{legendText}</legend>
      {children}
    </fieldset>
  );
}
export function InputTextFormik({
  forNameId,
  val,
  classN,
  changeHandler,
}: {
  val: string;
  forNameId: string;
  classN?: string;
  changeHandler: any;
}) {
  return (
    <>
      <input
        className={clsx(
          "border border-gray-300 text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 h-9 p-2.5 mb-4",
          classN
        )}
        type="text"
        name={forNameId}
        id={forNameId}
        value={val}
        onChange={changeHandler}
      />
    </>
  );
}
