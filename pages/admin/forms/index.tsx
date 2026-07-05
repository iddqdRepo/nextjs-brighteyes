import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  AdminConfirmationPopup,
  AdminHeadTag,
  AdminPageHeader,
  AdminSelect,
  AdminStatCard,
  PageContainerComponent,
  SearchInput,
} from "../../../adminComponents/commonAdminComponents";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  getPetForms,
  getGiftAidForms,
  getVolunteerForms,
  getContactUsForms,
  deletePetForm,
  deleteGiftAidForm,
  deleteVolunteerForm,
  deleteContactUsForm,
  udpateGiftAidForm,
  udpatePetForm,
  udpateVolunteerForm,
  udpateContactUsForm,
} from "../../../routes/formRoutes";
import { useRouter } from "next/router";
import { LoadingIcon } from "../../../components/common/CommonComponents";
import {
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  VolunteerFormInterface,
  ContactUsFormInterface,
} from "../../../interfaces/interfaces";
import { useFormsAndPets } from "../../../hooks/useFormAndPets";
import { FormList } from "../../../adminComponents/AdminForms/AdminFormsLayoutComponents";
import { AdminUser, gateAdminPage } from "../../../utils/auth";

function Index({ currentUser }: { currentUser: AdminUser }) {
  const router = useRouter();
  let isArchive = router.query.archive;
  const [hidden, setHidden] = useState(true);
  const [petFilter, setPetFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  //Deleting a submission is permanent, so only superusers see the option.
  const canDelete = currentUser.isSuperuser;

  const deleteOrUpdateInfo = useRef({
    name: "",
    id: "",
    data: { archive: "" },
    action: "",
    type: "",
    promptText: "",
  });

  const highlighted = isArchive === "true" ? "FormArchive" : "Forms";
  const tableHeaderArray = [
    "Name",
    "Type",
    "Submitted",
    "View",
    isArchive === "true" ? "Restore" : "Archive",
    ...(canDelete ? ["Delete"] : []),
  ];
  const tabsMapList = [
    "Adoption Forms",
    "GiftAid Forms",
    "Volunteer Forms",
    "Contact Forms",
  ];

  useEffect(() => {
    setSearchText("");
  }, [isArchive]);

  const petFormType = ["petForms", getPetForms, udpatePetForm, deletePetForm];
  const contactFormType = [
    "contactForms",
    getContactUsForms,
    udpateContactUsForm,
    deleteContactUsForm,
  ];
  const giftAidFormType = [
    "giftAidForms",
    getGiftAidForms,
    udpateGiftAidForm,
    deleteGiftAidForm,
  ];
  const volunteerFormType = [
    "volunteerForms",
    getVolunteerForms,
    udpateVolunteerForm,
    deleteVolunteerForm,
  ];
  const {
    isLoading: petFormsLoading,
    data: petForms,
    deleteFormMutation: deletePetFormMutation,
    archiveFormMutation: archivePetFormMutation,
  } = useFormsAndPets(petFormType);
  const {
    isLoading: giftAidLoading,
    data: giftAidForms,
    deleteFormMutation: deleteGiftAidFormMutation,
    archiveFormMutation: archiveGiftAidFormMutation,
  } = useFormsAndPets(giftAidFormType);
  const {
    isLoading: volunteerLoading,
    data: volunteerForms,
    deleteFormMutation: deleteVolunteerFormMutation,
    archiveFormMutation: archiveVolunteerFormMutation,
  } = useFormsAndPets(volunteerFormType);
  const {
    isLoading: contactLoading,
    data: contactForms,
    deleteFormMutation: deleteContactUsFormMutation,
    archiveFormMutation: archiveContactUsFormMutation,
  } = useFormsAndPets(contactFormType);

  const countInView = (forms: any) =>
    forms?.data
      ? forms.data.filter((form: { archive: string }) =>
          isArchive === "false" ? form.archive === "No" : form.archive === "Yes"
        ).length
      : "…";

  const handleDelete = () => {
    let data = deleteOrUpdateInfo.current;
    if (data.type === "Dog" || data.type === "Cat") {
      data.type = "pet";
    }
    switch (data.type) {
      case "giftAid":
        deleteGiftAidFormMutation.mutate(data.id);
        break;
      case "pet":
        deletePetFormMutation.mutate(data.id);
        break;
      case "volunteer":
        deleteVolunteerFormMutation.mutate(data.id);
        break;
      case "contactUs":
        deleteContactUsFormMutation.mutate(data.id);
        break;
      default:
        console.log("Invalid form type");
    }
    setHidden(true);
  };

  const handleArchive = () => {
    let type = deleteOrUpdateInfo.current.type;
    let form = deleteOrUpdateInfo.current.data;
    if (type === "Dog" || type === "Cat") {
      type = "pet";
    }
    form.archive === "Yes" ? (form.archive = "No") : (form.archive = "Yes");

    switch (type) {
      case "giftAid":
        archiveGiftAidFormMutation.mutate(form as GiftaidFormInterface);
        break;
      case "pet":
        archivePetFormMutation.mutate(form as PetAdoptionFormInterface);
        break;
      case "volunteer":
        archiveVolunteerFormMutation.mutate(form as VolunteerFormInterface);
        break;
      case "contactUs":
        archiveContactUsFormMutation.mutate(form as ContactUsFormInterface);
        break;
      default:
        console.log("Invalid form type");
    }
    setHidden(true);
  };

  return (
    <>
      <AdminHeadTag
        title={"Forms"}
        metaContent={"Admin Forms, Bright Eyes"}
        linkHref={"/admin/forms"}
      />
      <AdminSidebarComponent
        highlighted={highlighted}
        currentUser={currentUser}
      >
        {!hidden && (
          <AdminConfirmationPopup
            name={deleteOrUpdateInfo.current.name}
            deleteHandler={handleDelete}
            setHideState={setHidden}
            archiveHandler={handleArchive}
            action={deleteOrUpdateInfo.current.action}
            promptText={deleteOrUpdateInfo.current.promptText}
          />
        )}
        <PageContainerComponent>
          <AdminPageHeader
            title={isArchive === "true" ? "Archived Forms" : "Active Forms"}
            subtitle={
              isArchive === "true"
                ? "View, restore or delete forms that have been archived."
                : "Manage and monitor all forms submitted to Bright Eyes."
            }
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              icon="carbon:document"
              label="Adoption Forms"
              value={!petFormsLoading ? countInView(petForms) : "…"}
            />
            <AdminStatCard
              icon="akar-icons:gift"
              label="Gift Aid Forms"
              value={!giftAidLoading ? countInView(giftAidForms) : "…"}
            />
            <AdminStatCard
              icon="carbon:person-favorite"
              label="Volunteer Forms"
              value={!volunteerLoading ? countInView(volunteerForms) : "…"}
            />
            <AdminStatCard
              icon="carbon:chat"
              label="Contact Messages"
              value={!contactLoading ? countInView(contactForms) : "…"}
            />
          </div>

          <div className="mt-6">
            <Tabs>
              <TabList className="flex flex-wrap gap-2">
                {tabsMapList.map((tab) => {
                  return (
                    <Tab
                      key={tab}
                      selectedClassName="!bg-brand !text-white !border-brand shadow-lg shadow-brand/20"
                      className="cursor-pointer rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-brand hover:text-brand font-poppins"
                      onClick={() => setSearchText("")}
                    >
                      {tab}
                    </Tab>
                  );
                })}
              </TabList>
              <TabPanel>
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                  <SearchInput
                    id={"petFilter"}
                    change={setSearchText}
                    val={searchText}
                    placehold={"Search by applicant name..."}
                  />
                  <AdminSelect
                    id="type"
                    value={petFilter}
                    onChange={setPetFilter}
                  >
                    <option value="">All Form Types</option>
                    <option value="Dog">Dog Forms</option>
                    <option value="Cat">Cat Forms</option>
                  </AdminSelect>
                </div>

                {!petFormsLoading ? (
                  <FormList
                    list={petForms && petForms.data}
                    type="pet"
                    isArchive={isArchive}
                    searchText={searchText}
                    tableHeaderArray={tableHeaderArray}
                    deleteOrUpdateInfo={deleteOrUpdateInfo}
                    petFilter={petFilter}
                    setHidden={setHidden}
                    canDelete={canDelete}
                  />
                ) : (
                  <div className="flex justify-center">
                    <LoadingIcon />
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                  <SearchInput
                    id={"giftAidTextFilter"}
                    change={setSearchText}
                    val={searchText}
                    placehold={"Search by applicant name..."}
                  />
                </div>
                {!giftAidLoading && (
                  <FormList
                    list={giftAidForms && giftAidForms.data}
                    type="giftAid"
                    isArchive={isArchive}
                    searchText={searchText}
                    tableHeaderArray={tableHeaderArray}
                    deleteOrUpdateInfo={deleteOrUpdateInfo}
                    setHidden={setHidden}
                    canDelete={canDelete}
                  />
                )}
              </TabPanel>
              <TabPanel>
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                  <SearchInput
                    id={"volunteerTextFilter"}
                    change={setSearchText}
                    val={searchText}
                    placehold={"Search by applicant name..."}
                  />
                </div>
                {!volunteerLoading && (
                  <FormList
                    list={volunteerForms && volunteerForms.data}
                    type="volunteer"
                    isArchive={isArchive}
                    searchText={searchText}
                    tableHeaderArray={tableHeaderArray}
                    deleteOrUpdateInfo={deleteOrUpdateInfo}
                    setHidden={setHidden}
                    canDelete={canDelete}
                  />
                )}
              </TabPanel>
              <TabPanel>
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                  <SearchInput
                    id={"contactUsTextFilter"}
                    change={setSearchText}
                    val={searchText}
                    placehold={"Search by name..."}
                  />
                </div>
                {!contactLoading && (
                  <FormList
                    list={contactForms && contactForms.data}
                    type="contactUs"
                    isArchive={isArchive}
                    searchText={searchText}
                    tableHeaderArray={tableHeaderArray}
                    deleteOrUpdateInfo={deleteOrUpdateInfo}
                    setHidden={setHidden}
                    canDelete={canDelete}
                  />
                )}
              </TabPanel>
            </Tabs>
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Submitted forms contain applicants' personal data, so the whole page
  //needs the forms permission.
  const gate = await gateAdminPage(context.req, "forms");
  if (gate.redirect) {
    return gate.redirect;
  }
  return { props: { currentUser: gate.user } };
};
