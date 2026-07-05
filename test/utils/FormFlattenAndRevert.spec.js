import {
  flattenNestedAdoptionObjectForFormBuilder,
  revertDataObjectsBackToOriginalFormat,
} from "../../utils/FormFlattenAndRevert";
import { adoptionFormBuilder } from "../../utils/formik/adoptionFormBuilder";

describe("FormFlattenAndRevert", () => {
  test("flattens nested adoption builder sections using > as the separator", () => {
    const flattened = flattenNestedAdoptionObjectForFormBuilder(
      adoptionFormBuilder.homeQuestions
    );

    expect(flattened.homeType).toEqual(
      adoptionFormBuilder.homeQuestions.homeType[0]
    );
    expect(flattened["gardenOrYardInfo>gardenOrYardSize"]).toEqual(
      adoptionFormBuilder.homeQuestions.gardenOrYardInfo.gardenOrYardSize[0]
    );
    expect(flattened["planning>baby"]).toEqual(
      adoptionFormBuilder.homeQuestions.planning.baby[0]
    );
  });

  test("rebuilds nested data even when a section only contains flattened keys", () => {
    const reverted = revertDataObjectsBackToOriginalFormat(
      {
        homeQuestions: {
          "planning>baby": "Yes",
          "planning>moving": "No",
        },
        hearAboutUsInfo: {
          hearAboutUs: "Friend",
          other: "",
        },
      },
      "Dog"
    );

    expect(reverted).toEqual({
      homeQuestions: {
        planning: {
          baby: "Yes",
          moving: "No",
        },
      },
      hearAboutUsInfo: {
        hearAboutUs: "Friend",
        other: "",
      },
      type: "Dog",
      archive: "No",
    });
  });
});
