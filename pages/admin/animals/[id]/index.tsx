import React, { useState } from "react";
import petModel from "../../../../models/petModel";
import dbConnect from "../../../../utils/dbConnect";
import { Formik } from "formik";
import { PetInterface } from "../../../../interfaces/interfaces";
import {
  AdminHeadTag,
  AdminPageHeader,
  PageContainerComponent,
} from "../../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import { AnimalSchema } from "../../../../utils/yup/animalYupSchema";
import { AnimalFormSections } from "../../../../adminComponents/AddOrEditAnimal/AnimalFormSections";
import { sanitizeInput } from "../../../../utils/sanitizeData";
import { updatePet } from "../../../../routes/petRoutes";
import { ShowButtonTextOnSubmit } from "../../../../components/common/CommonComponents";
import { AdminUser } from "../../../../utils/adminAccess";
import { gateAdminPage } from "../../../../utils/auth";
import UnsavedChangesGuard from "../../../../adminComponents/UnsavedChangesGuard";

function Index({
  animal,
  currentUser,
}: {
  animal: PetInterface[];
  currentUser: AdminUser;
}) {
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
      <AdminSidebarComponent highlighted={"Animals"} currentUser={currentUser}>
        <PageContainerComponent>
          <AdminPageHeader
            title={`Editing ${animal[0].name}`}
            subtitle="Update the details or adjust the photo — changes show on the website straight away."
          />
          <form className="mt-6 flex flex-col items-center">
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
              {({ values, handleSubmit, setFieldValue, dirty }) => (
                <div className="flex w-full flex-col items-center">
                  <UnsavedChangesGuard when={dirty && !isSuccess && !loading} />
                  <AnimalFormSections
                    values={values}
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

//Rendered at request time (never at build time), so builds no longer sweep
//the whole pets collection and edits are always shown fresh.
export async function getServerSideProps(context: {
  params: { id: string };
  req: { cookies?: Partial<{ [key: string]: string }> };
}) {
  const gate = await gateAdminPage(context.req, "animals");
  if (gate.redirect) {
    return gate.redirect;
  }

  await dbConnect();
  const id = context.params.id;
  let dataTemp;
  try {
    dataTemp = await petModel.find({ _id: id }).lean();
  } catch {
    //A malformed id fails the ObjectId cast; treat it as not found.
    return { notFound: true };
  }
  if (dataTemp.length === 0) {
    return { notFound: true };
  }
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
      currentUser: gate.user,
    },
  };
}
