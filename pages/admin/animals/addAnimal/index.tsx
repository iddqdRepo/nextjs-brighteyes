import React, { useState } from "react";
import { Formik } from "formik";
import { GetServerSideProps } from "next";
import {
  AdminHeadTag,
  AdminPageHeader,
  PageContainerComponent,
} from "../../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import { AnimalSchema } from "../../../../utils/yup/animalYupSchema";
import { AnimalFormSections } from "../../../../adminComponents/AddOrEditAnimal/AnimalFormSections";

import { postPet } from "../../../../routes/petRoutes";
import { PetInterface } from "../../../../interfaces/interfaces";
import { sanitizeInput } from "../../../../utils/sanitizeData";
import { ShowButtonTextOnSubmit } from "../../../../components/common/CommonComponents";
import { AdminUser } from "../../../../utils/adminAccess";
import { gateAdminPage } from "../../../../utils/auth";
import UnsavedChangesGuard from "../../../../adminComponents/UnsavedChangesGuard";

function Index({ currentUser }: { currentUser: AdminUser }) {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Add Animal");
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues = {
    adopted: "",
    age: "",
    breed: "",
    desc: "",
    image: "",
    name: "",
    sex: "",
    size: "",
    suitableForAnimals: "",
    suitableForChildren: "",
    type: "",
    yearsOrMonths: "",
  };

  return (
    <>
      <AdminHeadTag
        title={"Add Animal"}
        metaContent={"Admin Add Animal, Bright Eyes"}
        linkHref={"/admin/animals/addAnimal"}
      />
      <AdminSidebarComponent highlighted={"Animals"} currentUser={currentUser}>
        <PageContainerComponent>
          <AdminPageHeader
            title="Add an animal"
            subtitle="Fill in the details and upload a photo — you can move the photo until it looks right."
          />
          <form className="mt-6 flex flex-col items-center">
            <Formik
              initialValues={initialValues}
              validationSchema={AnimalSchema}
              onSubmit={async (data) => {
                setLoading(true);

                let toPost: PetInterface = sanitizeInput(data as PetInterface);
                let successful = await postPet(toPost);
                if (successful) {
                  setLoading(false);
                  setIsSuccess(true);
                } else {
                  setLoading(false);
                  setIsSuccess(false);
                  setButtonText("ERROR, try again");
                }
              }}
            >
              {({ values, handleSubmit, setFieldValue, dirty, resetForm }) => (
                <div className="flex w-full flex-col items-center">
                  <UnsavedChangesGuard when={dirty && !isSuccess && !loading} />
                  <AnimalFormSections
                    values={values as PetInterface}
                    setFieldValue={setFieldValue}
                  />
                  <ShowButtonTextOnSubmit
                    loading={loading}
                    isSuccess={isSuccess}
                    buttonText={buttonText}
                    submitHandler={handleSubmit}
                    animalName={values.name}
                  />
                  {isSuccess && (
                    <div className="mb-2 flex flex-col items-center gap-1">
                      <button
                        type="button"
                        id="add-another"
                        onClick={() => {
                          //Litters arrive together: keep the shared details,
                          //clear what's unique to each animal.
                          resetForm({
                            values: {
                              ...values,
                              name: "",
                              sex: "",
                              image: "",
                              desc: "",
                            },
                          });
                          setIsSuccess(false);
                          setButtonText("Add Animal");
                        }}
                        className="rounded-full border border-brand bg-white px-6 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white font-poppins"
                      >
                        Add another like this
                      </button>
                      <span className="text-xs text-gray-500 font-poppins">
                        Keeps the type, breed, age and suitability &#8212;
                        clears the name, sex, photo and description.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </Formik>
          </form>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gate = await gateAdminPage(context.req, "animals");
  if (gate.redirect) {
    return gate.redirect;
  }
  return { props: { currentUser: gate.user } };
};
