import React, { useEffect, useRef, useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
  PageContainerComponent,
  PageHeader,
  SearchInput,
  TableComponent,
  TableData,
  TableHeadMap,
} from "../../../adminComponents/commonAdminComponents";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Icon } from "@iconify/react";
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
import Link from "next/link";
import { useFormsAndPets } from "../../../hooks/useFormAndPets";
import { FormConfirmationPopup } from "../../../adminComponents/AdminForms/AdminFormsLayoutComponents";

function Index() {
  const router = useRouter();
  let isArchive = router.query.archive;
  const highlighted = isArchive === "true" ? "FormArchive" : "Forms";

  const deleteOrUpdateInfo = useRef({
    name: "",
    id: "",
    data: { archive: "" },
    action: "",
    type: "",
    promptText: "",
  });

  const tableHeaderArray = [
    "Name",
    "Type",
    "Submitted",
    "View",
    "Archive",
    "Delete",
  ];
  const [hidden, setHidden] = useState(true);
  const [petFilter, setPetFilter] = useState("");

  const [searchText, setSearchText] = useState("");

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
  const {
    isLoading: petFormsLoading,
    data: petForms,
    deleteFormMutation: deletePetFormMutation,
    archiveFormMutation: archivePetFormMutation,
  } = useFormsAndPets(petFormType);
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

  const FormList = ({ list, type }: { list: []; type: string }) => {
    return (
      <div className="relative w-full mt-10 overflow-auto bg-slate-100 rounded-xl xl:w-full">
        <div className="mt-3 mb-8 overflow-hidden shadow-sm">
          <TableComponent>
            <TableHeadMap ArrayOfHeaderTitles={tableHeaderArray} />

            <tbody className="bg-white dark:bg-slate-800">
              {list
                .sort(function (a: any, b: any) {
                  // Show the newest first
                  return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                  );
                })
                .filter((archiveFilter: { archive: string }) => {
                  if (isArchive === "false") {
                    return archiveFilter.archive === "No";
                  } else {
                    return archiveFilter.archive === "Yes";
                  }
                })
                .filter((text: { aboutQuestions: { name: string } }) => {
                  if (searchText) {
                    return text.aboutQuestions.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase());
                  } else {
                    return text;
                  }
                })
                .filter((dropdownType: { type: string }) => {
                  if (type === "pet") {
                    if (petFilter) {
                      return dropdownType.type === petFilter;
                    } else {
                      return dropdownType;
                    }
                  } else {
                    return dropdownType;
                  }
                })
                .map(
                  (
                    form:
                      | GiftaidFormInterface
                      | PetAdoptionFormInterface
                      | VolunteerFormInterface
                      | ContactUsFormInterface
                  ) => {
                    return (
                      <tr key={form._id} className="h-20">
                        <TableData>
                          <div className="text-xs text-center md:text-lg font-roboto">
                            {form.aboutQuestions.name}
                          </div>
                        </TableData>
                        <TableData>
                          <div className="text-xs text-center md:text-lg font-roboto">
                            {form.type + " form"}
                          </div>
                        </TableData>
                        <TableData>
                          <div className="text-xs text-center md:text-lg font-roboto">
                            {form.updatedAt && form.updatedAt.slice(0, 10)}
                          </div>
                        </TableData>
                        <TableData>
                          <Link href={`/admin/forms/${form._id}`}>
                            <div className="flex flex-row items-center justify-center">
                              <Icon
                                className="w-auto h-6 cursor-pointer"
                                icon="carbon:view-filled"
                              />
                            </div>
                          </Link>
                        </TableData>
                        <TableData>
                          <div className="flex flex-row items-center justify-center">
                            <Icon
                              className="w-auto h-6 cursor-pointer"
                              icon="fluent:tray-item-remove-24-filled"
                              onClick={() => {
                                deleteOrUpdateInfo.current.name =
                                  form.aboutQuestions.name;
                                if (form._id) {
                                  deleteOrUpdateInfo.current.id = form._id;
                                }
                                deleteOrUpdateInfo.current.type = form.type;
                                deleteOrUpdateInfo.current.data = form;
                                deleteOrUpdateInfo.current.action = "archive";
                                isArchive === "true"
                                  ? (deleteOrUpdateInfo.current.promptText =
                                      "unArchive")
                                  : (deleteOrUpdateInfo.current.promptText =
                                      "archive");
                                setHidden(false);
                              }}
                            />
                          </div>
                        </TableData>
                        <TableData>
                          <div className="flex flex-row items-center justify-center">
                            <Icon
                              className="w-auto h-6 cursor-pointer"
                              icon="fluent:delete-20-filled"
                              onClick={() => {
                                deleteOrUpdateInfo.current.name =
                                  form.aboutQuestions.name;
                                if (form._id) {
                                  deleteOrUpdateInfo.current.id = form._id;
                                }
                                deleteOrUpdateInfo.current.type = form.type;
                                deleteOrUpdateInfo.current.action = "delete";
                                deleteOrUpdateInfo.current.promptText =
                                  "delete";
                                setHidden(false);
                              }}
                            />
                          </div>
                        </TableData>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </TableComponent>
        </div>
      </div>
    );
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
                    <FormList list={petForms && petForms.data} type="pet" />
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
