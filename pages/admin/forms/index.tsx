import React, { useEffect, useRef, useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
  PageContainerComponent,
  PageHeader,
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
import {
  FormConfirmationPopup,
  FormList,
} from "../../../adminComponents/AdminForms/AdminFormsLayoutComponents";

function Index() {
  const router = useRouter();
  let isArchive = router.query.archive;
  const [hidden, setHidden] = useState(true);
  const [petFilter, setPetFilter] = useState("");
  const [searchText, setSearchText] = useState("");

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
    "Archive",
    "Delete",
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
      <AdminSidebarComponent highlighted={highlighted}>
        {!hidden && (
          <FormConfirmationPopup
            name={deleteOrUpdateInfo.current.name}
            deleteHandler={handleDelete}
            setHideState={setHidden}
            archiveHandler={handleArchive}
            action={deleteOrUpdateInfo.current.action}
            promptText={deleteOrUpdateInfo.current.promptText}
          />
        )}
        <PageContainerComponent>
          <PageHeader>
            {isArchive === "true" ? "Archived Forms" : "Active Forms"}
          </PageHeader>
          <div className="flex flex-col items-center mt-14">
            <Tabs>
              <TabList className="flex justify-center">
                {tabsMapList.map((tab) => {
                  return (
                    <Tab
                      key={tab}
                      selectedClassName="inline-block p-4 text-[#8B3479] border-b-2 border-[#8B3479] mr-2 rounded-t-lg"
                      className="inline-block p-4 mr-2 border-b-2 rounded-t-lg cursor-pointer"
                      onClick={() => setSearchText("")}
                    >
                      {tab}
                    </Tab>
                  );
                })}
              </TabList>
              <TabPanel>
                <div className="flex flex-col items-center mt-3">
                  <SearchInput
                    id={"petFilter"}
                    change={setSearchText}
                    val={searchText}
                    placehold={"Search by name"}
                  />
                  <select
                    className="flex w-56 px-2 mb-2 border rounded-lg h-14 sm:mr-0"
                    name="type"
                    id="type"
                    onChange={(e) => setPetFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Dog">Dog Forms</option>
                    <option value="Cat">Cat Forms</option>
                  </select>
                </div>

                <div className="lg:mr-20 lg:ml-20">
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
                    />
                  ) : (
                    <div className="flex justify-center">
                      <LoadingIcon />
                    </div>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col items-center mt-3">
                  <SearchInput
                    id={"giftAidTextFilter"}
                    change={setSearchText}
                    val={searchText}
                    placehold={"Search by name"}
                  />
                </div>
                <div className="lg:mr-20 lg:ml-20">
                  {!giftAidLoading && (
                    <FormList
                      list={giftAidForms && giftAidForms.data}
                      type="giftAid"
                      isArchive={isArchive}
                      searchText={searchText}
                      tableHeaderArray={tableHeaderArray}
                      deleteOrUpdateInfo={deleteOrUpdateInfo}
                      setHidden={setHidden}
                    />
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col items-center mt-3">
                  <SearchInput
                    id={"volunteerTextFilter"}
                    change={setSearchText}
                    val={searchText}
                    placehold={"Search by name"}
                  />
                </div>
                <div className="lg:mr-20 lg:ml-20">
                  {!volunteerLoading && (
                    <FormList
                      list={volunteerForms && volunteerForms.data}
                      type="volunteer"
                      isArchive={isArchive}
                      searchText={searchText}
                      tableHeaderArray={tableHeaderArray}
                      deleteOrUpdateInfo={deleteOrUpdateInfo}
                      setHidden={setHidden}
                    />
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col items-center mt-3">
                  <SearchInput
                    id={"contactUsTextFilter"}
                    change={setSearchText}
                    val={searchText}
                    placehold={"Search by name"}
                  />
                </div>
                <div className="lg:mr-20 lg:ml-20">
                  {!contactLoading && (
                    <FormList
                      list={contactForms && contactForms.data}
                      type="contactUs"
                      isArchive={isArchive}
                      searchText={searchText}
                      tableHeaderArray={tableHeaderArray}
                      deleteOrUpdateInfo={deleteOrUpdateInfo}
                      setHidden={setHidden}
                    />
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;
