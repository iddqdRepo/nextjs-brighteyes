import { AdoptionFormBuilderInterface } from "../interfaces/adoptionFormBuilderInterface";

interface tempObjInterface {
  [key: string]: string;
}

export const flattenNestedAdoptionObjectForFormBuilder = (
  objToFlatten: keyof AdoptionFormBuilderInterface
) => {
  //^ Flattening formBuilder because it's easier to flatten > build forms and receive input > explode than
  //^ handle all the multi nesting currently present in the legacy layout for the db
  let result = {} as tempObjInterface;

  for (const [key, value] of Object.entries(objToFlatten)) {
    if (typeof value === "object" && !Array.isArray(value)) {
      //if value is an object, recurse before looping an storing in result
      const tempFlatten = flattenNestedAdoptionObjectForFormBuilder(value);

      for (const [keyToCombine, valueToCombine] of Object.entries(
        tempFlatten
      )) {
        /*
         * result needs to be joined with ">" because formik splits on "."
         * which makes flattening pointless as it's rebuilt in initialValues
         * when passed into <Field name={}/> making initialValues not Match toShow
         * this causes bugs on expose() etc
         */

        result[key + ">" + keyToCombine] = valueToCombine;
      }
    } else {
      result[key] = value[0];
    }
  }
  return result;
};

export const revertDataObjectsBackToOriginalFormat = (
  dataToRevert: any,
  type: string
) => {
  let explodedObject: any = {};
  for (const [key, value] of Object.entries(dataToRevert)) {
    if (typeof value === "object" && !Array.isArray(value)) {
      for (const [jkey, jvalue] of Object.entries(value as any)) {
        if (jkey.includes(">")) {
          let keyToSplit = jkey.split(">");
          let expandedMainKey = keyToSplit[0];
          let expandedInnerKey = keyToSplit[1];
          let expandedInnerValue = jvalue;
          explodedObject[key][expandedMainKey] = {
            ...explodedObject[key][expandedMainKey],
            [expandedInnerKey]: expandedInnerValue,
          };
        } else {
          explodedObject[key] = { ...explodedObject[key], [jkey]: jvalue };
        }
      }
    }
  }

  return { ...explodedObject, type, archive: "No" };
};
