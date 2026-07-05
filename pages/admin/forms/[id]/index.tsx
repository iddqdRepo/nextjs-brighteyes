import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
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
import { AdminUser, gateAdminPage } from "../../../../utils/auth";

function Index({
  form,
  currentUser,
}: {
  form:
    | PetAdoptionFormInterface[]
    | GiftaidFormInterface[]
    | VolunteerFormInterface[]
    | ContactUsFormInterface[];
  currentUser: AdminUser;
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
          classN="text-center text-xs"
        />

        <div className="text-center text-wrap h-fit text-gray-900 text-sm font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60  p-2.5 ">
          {answer}
        </div>
      </div>
    );
  };
  return (
    <>
      <AdminHeadTag
        title={"View Form"}
        metaContent={"Admin View Form, Bright Eyes"}
        linkHref={"/admin/forms/"}
      />
      <AdminSidebarComponent highlighted="" currentUser={currentUser}>
        <PageContainerComponent>
          <PageHeader>
            {form[0].type + " Form for " + form[0].aboutQuestions.name}
          </PageHeader>
          {Object.entries(form[0]).map(([fieldSetTitle, fieldSetContent]) => {
            if (
              fieldSetTitle === "message" ||
              fieldSetTitle === "giftAidFuture" ||
              fieldSetTitle === "giftAidPast"
            ) {
              return (
                <FieldSet key={fieldSetTitle} legendText={fieldSetTitle}>
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
                                    key={nestedQuestion}
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

//Rendered at request time (never at build time): submitted forms hold
//applicants' personal data, which must not be baked into build artifacts.
//The middleware's JWT check still gates every request to /admin pages.
export async function getServerSideProps(context: {
  params: { id: string };
  req: { cookies?: Partial<{ [key: string]: string }> };
}) {
  //Submitted forms contain applicants' personal data, so viewing one needs
  //the forms permission.
  const gate = await gateAdminPage(context.req, "forms");
  if (gate.redirect) {
    return gate.redirect;
  }

  await dbConnect();
  const id = context.params.id;
  let form:
    | PetAdoptionFormInterface[]
    | GiftaidFormInterface[]
    | VolunteerFormInterface[]
    | ContactUsFormInterface[] = [];

  try {
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
  } catch {
    //A malformed id fails the ObjectId cast; treat it as not found.
    return { notFound: true };
  }

  if (form.length === 0) {
    return { notFound: true };
  }

  stringifyIdsAndDates(form);

  return {
    props: {
      form,
      currentUser: gate.user,
    },
  };
}
