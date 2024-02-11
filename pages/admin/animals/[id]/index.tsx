import React, { useState } from "react";
import petModel from "../../../../models/petModel";
import dbConnect from "../../../../utils/dbConnect";
import { Formik } from "formik";
import { FormPageTitle } from "../../../../components/IndividualFormLayout/CommonFormComponents";
import { PetInterface } from "../../../../interfaces/interfaces";
import {
  AdminHeadTag,
  PageContainerComponent,
} from "../../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import { AnimalSchema } from "../../../../utils/yup/animalYupSchema";
import { sanitizeInput } from "../../../../utils/sanitizeData";
import { updatePet } from "../../../../routes/petRoutes";
import { AddOrEditAnimalFormSection } from "../../../../adminComponents/AddOrEditAnimal/AddOrEditAnimalLayout";

function Index({ animal }: { animal: PetInterface[] }) {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(`Make Edit`);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <AdminHeadTag
        title={"Edit Animal"}
        metaContent={"Admin Edit Animal, Bright Eyes"}
        linkHref={"/admin/animals/"}
      />
      <AdminSidebarComponent highlighted={""}>
        <PageContainerComponent>
          <form className="flex flex-col items-center justify-center ">
            <FormPageTitle
              title={`Editing ${animal[0].name}'s adoption form`}
            />
            <Formik
              initialValues={animal[0]}
              validationSchema={AnimalSchema}
              onSubmit={async (data) => {
                setLoading(true);
                let toPost: PetInterface = sanitizeInput(data as PetInterface);
                let successful = await updatePet(toPost);
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

export async function getStaticPaths() {
  dbConnect();
  const data = await petModel.find({}, { image: 0 });
  //mapping through to create an array of the paths
  const paths = data.map((obj) => {
    return {
      params: {
        id: obj._id.toString().trim(),
      },
    };
  });
  return {
    paths, //paths which is the same as paths:paths
    fallback: "blocking",
  };
}

export async function getStaticProps(context: { params: { id: any } }) {
  dbConnect();
  const id = context.params.id;
  // console.log("id = ", context.params.id);
  const dataTemp = await petModel.find({ _id: id }).lean();
  const animal = dataTemp.map((doc) => {
    doc._id = doc._id.toString();
    if (doc.name) {
      doc.name = doc.name.trim();
    }
    if (doc.createdAt) {
      doc.createdAt = doc.createdAt.toString();
    }
    if (doc.updatedAt) {
      doc.updatedAt = doc.updatedAt.toString();
    }
    return doc;
  });

  return {
    props: {
      animal,
    },
    revalidate: 1,
  };
}
