import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import {
  PageContainerComponent,
  PageHeader,
} from "../../../../adminComponents/commonAdminComponents";
import {
  FieldSet,
  Label,
} from "../../../../components/IndividualFormLayout/CommonFormComponents";
import {
  ContactUsFormInterface,
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  TitleMapInterface,
  VolunteerFormInterface,
} from "../../../../interfaces/interfaces";
import formModels from "../../../../models/formModels";
import dbConnect from "../../../../utils/dbConnect";
import titleMap from "../../../../utils/mappingTitles";
import { stringifyIdsAndDates } from "../../../../utils/stringifyIdsAndDates";

function Index({
  form,
}: {
  form:
    | PetAdoptionFormInterface[]
    | GiftaidFormInterface[]
    | VolunteerFormInterface[]
    | ContactUsFormInterface[];
}) {
  const FieldAndAnswer = ({
    labelText,
    answer,
  }: {
    labelText: string;
    answer: string;
  }) => {
    return (
      <div className="flex flex-col items-center justify-start pt-2 mb-4 ml-1 mr-1 border border-gray-300 w-60">
        <Label
          text={titleMap[labelText as keyof TitleMapInterface]}
          hFor={"val"}
          classN=" text-xs"
        />

        <div className="text-center text-wrap h-fit text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60  p-2.5 ">
          {answer}
        </div>
      </div>
    );
  };
  return (
    <>
      <AdminSidebarComponent highlighted="">
        <PageContainerComponent>
          <PageHeader>
            {form[0].type + " Form for " + form[0].aboutQuestions.name}
          </PageHeader>
          {Object.entries(form[0]).map(([fieldSetTitle, fieldSetContent]) => {
            if (fieldSetTitle === "message") {
              return (
                <FieldSet key={fieldSetTitle} legendText={"message"}>
                  <FieldAndAnswer
                    labelText={"fieldSetTitle"}
                    answer={fieldSetContent}
                  />
                </FieldSet>
              );
            } else {
              return (
                fieldSetTitle !== "_id" &&
                fieldSetTitle !== "type" &&
                fieldSetTitle !== "updatedAt" &&
                fieldSetTitle !== "archive" &&
                fieldSetTitle !== "date" &&
                fieldSetTitle !== "__v" && (
                  <FieldSet key={fieldSetTitle} legendText={fieldSetTitle}>
                    {Object.entries(fieldSetContent).map(
                      ([question, answer]) => {
                        if (
                          //If it's an object, go deeper and un-nest
                          typeof answer === "object" &&
                          !Array.isArray(answer) &&
                          answer !== null
                        ) {
                          return Object.entries(answer).map(
                            ([nestedQuestion, nestedAnswer]) => {
                              return (
                                //Dont show blank answers
                                nestedAnswer && (
                                  <FieldAndAnswer
                                    key={question}
                                    labelText={nestedQuestion}
                                    answer={nestedAnswer}
                                  />
                                )
                              );
                            }
                          );
                        } else {
                          return (
                            //Dont show blank answers

                            answer !== "" && (
                              <FieldAndAnswer
                                key={question}
                                labelText={question}
                                answer={answer as string}
                              />
                            )
                          );
                        }
                      }
                    )}
                  </FieldSet>
                )
              );
            }
          })}
          {/* <pre>{JSON.stringify(form[0], null, 2)}</pre> */}
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

export async function getStaticPaths() {
  dbConnect();
  const giftAids = await formModels.FormGiftAidModel.find();
  const adoptionForms = await formModels.FormPetAdoptionModel.find();
  const volunteerForms = await formModels.FormVolunteerModel.find();
  const contactForms = await formModels.FormContactUsModel.find();

  //mapping through to create an array of the paths
  const giftAidPaths = giftAids.map((obj) => {
    return {
      params: {
        id: obj._id.toString().trim(),
        type: "giftaid",
      },
    };
  });
  const adoptionFormPaths = adoptionForms.map((obj) => {
    return {
      params: {
        id: obj._id.toString().trim(),
        type: "adoption",
      },
    };
  });
  const volunteerFormPaths = volunteerForms.map((obj) => {
    return {
      params: {
        id: obj._id.toString().trim(),
        type: "volunteer",
      },
    };
  });
  const contactUsFormPaths = contactForms.map((obj) => {
    return {
      params: {
        id: obj._id.toString().trim(),
        type: "contactus",
      },
    };
  });
  let newPaths = [
    ...giftAidPaths,
    ...adoptionFormPaths,
    ...volunteerFormPaths,
    ...contactUsFormPaths,
  ];
  return {
    paths: newPaths,
    fallback: false, // false = if a user tries to visit a route that doesnt exist, it shows a 404 page
  };
}

export async function getStaticProps(context: {
  params: { id: any; type: string };
}) {
  dbConnect();
  const id = context.params.id;
  console.log("id = ", context.params.id);
  let form:
    | PetAdoptionFormInterface[]
    | GiftaidFormInterface[]
    | VolunteerFormInterface[]
    | ContactUsFormInterface[] = [];

  //try contactUs first, then giftAid, then volunteer, then adoption
  if (form.length === 0) {
    form = await formModels.FormContactUsModel.find({ _id: id }).lean();
  }
  if (form.length === 0) {
    form = await formModels.FormGiftAidModel.find({ _id: id }).lean();
  }
  if (form.length === 0) {
    form = await formModels.FormVolunteerModel.find({ _id: id }).lean();
  }
  if (form.length === 0) {
    form = await formModels.FormPetAdoptionModel.find({ _id: id }).lean();
  }
  if (form.length === 0) {
    form = await formModels.FormPetAdoptionModel.find({ _id: id }).lean();
  }

  stringifyIdsAndDates(form);

  return {
    props: {
      form,
    },
    revalidate: 10, // In seconds
  };
}
