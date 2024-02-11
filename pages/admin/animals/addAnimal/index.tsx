import React, { useState } from "react";
import { Formik } from "formik";
import { FormPageTitle } from "../../../../components/IndividualFormLayout/CommonFormComponents";
import {
  AdminHeadTag,
  PageContainerComponent,
} from "../../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import { AnimalSchema } from "../../../../utils/yup/animalYupSchema";

import { postPet } from "../../../../routes/petRoutes";
import { PetInterface } from "../../../../interfaces/interfaces";
import { sanitizeInput } from "../../../../utils/sanitizeData";
import { AddOrEditAnimalFormSection } from "../../../../adminComponents/AddOrEditAnimal/AddOrEditAnimalLayout";

function Index() {
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
      <AdminSidebarComponent highlighted={""}>
        <PageContainerComponent>
          <form className="flex flex-col items-center justify-center ">
            <FormPageTitle title={`Add an animal`} />
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
              {({ values, handleSubmit }) => (
                <AddOrEditAnimalFormSection
                  isSuccess={isSuccess}
                  buttonText={buttonText}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  values={values}
                />
              )}
            </Formik>
          </form>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;
