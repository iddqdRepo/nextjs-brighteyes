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
              {({ values, handleSubmit, setFieldValue }) => (
                <div className="flex w-full flex-col items-center">
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
