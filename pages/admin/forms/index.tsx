import React, { useEffect, useRef, useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  PageContainerComponent,
  PageHeader,
  SearchInput,
  TableComponent,
  TableData,
  TableHeadMap,
} from "../../../adminComponents/commonAdminComponents";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  getPetForms,
  getGiftAidForms,
  getVolunteerForms,
  deletePetForm,
  deleteGiftAidForm,
  deleteVolunteerForm,
  udpateGiftAidForm,
  udpatePetForm,
  udpateVolunteerForm,
} from "../../../routes/formRoutes";
import { useRouter } from "next/router";
import {
  LoadingIcon,
  Popup,
} from "../../../components/common/CommonComponents";
import {
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  VolunteerFormInterface,
} from "../../../interfaces/interfaces";
import Link from "next/link";

function Index() {
  const router = useRouter();
  let isArchive = router.query.archive;
  const highlighted = isArchive === "true" ? "FormArchive" : "Forms";
  const queryClient = useQueryClient();
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
  const [petTextFilter, setPetTextFilter] = useState("");
  const [volunteerTextFilter, setVolunteerTextFilter] = useState("");
  const [giftAidTextFilter, setGiftAidTextFilter] = useState("");
  const tabsMapList = ["Adoption Forms", "GiftAid Forms", "Volunteer Forms"];
  useEffect(() => {
    setPetTextFilter("");
    setVolunteerTextFilter("");
    setGiftAidTextFilter("");
  }, [isArchive]);

  const { isLoading: petFormsLoading, data: petForms } = useQuery(
    "petForms",
    getPetForms
  );
  const { isLoading: giftAidLoading, data: giftAidForms } = useQuery(
    "giftAidForms",
    getGiftAidForms
  );

  const { isLoading: volunteerLoading, data: volunteerForms } = useQuery(
    "volunteerForms",
    getVolunteerForms
  );

  const deletePetFormMutation = useMutation(deletePetForm, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("petForms");
    },
  });
  const deleteGiftAidFormMutation = useMutation(deleteGiftAidForm, {
    onSuccess: async () => {
      console.log("deleteGiftAidFormMutation success");
      await queryClient.invalidateQueries("giftAidForms");
    },
  });
  const deleteVolunteerFormMutation = useMutation(deleteVolunteerForm, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("volunteerForms");
    },
  });

  const archiveGiftAidFormMutation = useMutation(udpateGiftAidForm, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("giftAidForms");
    },
  });
  const archivePetFormMutation = useMutation(udpatePetForm, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("petForms");
    },
  });
  const archiveVolunteerFormMutation = useMutation(udpateVolunteerForm, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("volunteerForms");
    },
  });

  const handleDelete = () => {
    if (deleteOrUpdateInfo.current.type === "pet") {
      deletePetFormMutation.mutate(deleteOrUpdateInfo.current.id);
    } else if (deleteOrUpdateInfo.current.type === "giftAid") {
      console.log("DELETING GIFT AID");
      deleteGiftAidFormMutation.mutate(deleteOrUpdateInfo.current.id);
    } else if (deleteOrUpdateInfo.current.type === "volunteer") {
      deleteVolunteerFormMutation.mutate(deleteOrUpdateInfo.current.id);
    }
    setHidden(true);
  };

  const handleArchive = () => {
    let dataToMutate;
    if (deleteOrUpdateInfo.current.data.archive === "Yes") {
      deleteOrUpdateInfo.current.data.archive = "No";
    } else {
      deleteOrUpdateInfo.current.data.archive = "Yes";
    }
    console.log(deleteOrUpdateInfo.current.data);

    if (deleteOrUpdateInfo.current.type === "giftAid") {
      dataToMutate = deleteOrUpdateInfo.current.data as GiftaidFormInterface;
      archiveGiftAidFormMutation.mutate(dataToMutate);
    } else if (deleteOrUpdateInfo.current.type === "pet") {
      dataToMutate = deleteOrUpdateInfo.current
        .data as PetAdoptionFormInterface;
      archivePetFormMutation.mutate(dataToMutate);
    } else if (deleteOrUpdateInfo.current.type === "volunteer") {
      dataToMutate = deleteOrUpdateInfo.current.data as VolunteerFormInterface;
      archiveVolunteerFormMutation.mutate(dataToMutate);
    }
    setHidden(true);
  };

  const FormList = ({ list, type }: { list: []; type: string }) => {
    let filterType: string;
    if (type === "volunteer") {
      filterType = volunteerTextFilter;
    }
    if (type === "pet") {
      filterType = petTextFilter;
    }
    if (type === "giftAid") {
      filterType = giftAidTextFilter;
    }
    return (
      <div className="relative w-full mt-10 overflow-auto bg-slate-100 rounded-xl xl:w-full">
        <div className="mt-3 mb-8 overflow-hidden shadow-sm">
          <TableComponent>
            <TableHeadMap ArrayOfHeaderTitles={tableHeaderArray} />

            <tbody className="bg-white dark:bg-slate-800">
              {list
                .filter((archiveFilter: { archive: string }) => {
                  if (isArchive === "false") {
                    return archiveFilter.archive === "No";
                  } else {
                    return archiveFilter.archive === "Yes";
                  }
                })
                .filter((text: { aboutQuestions: { name: string } }) => {
                  if (filterType) {
                    return text.aboutQuestions.name
                      .toLowerCase()
                      .includes(filterType.toLowerCase());
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
                            {form.updatedAt.slice(0, 10)}
                          </div>
                        </TableData>
                        <TableData>
                          <Link
                            href={`http://localhost:3000/admin/forms/${form._id}`}
                          >
                            <div className="flex flex-row items-center justify-center">
                              <Icon
                                className="w-auto h-6 cursor-pointer"
                                icon="carbon:view-filled"
                                onClick={() => {
                                  console.log("view clicked");
                                }}
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
                                deleteOrUpdateInfo.current.id = form._id;
                                deleteOrUpdateInfo.current.type = form.type;
                                deleteOrUpdateInfo.current.data = form;
                                deleteOrUpdateInfo.current.action = "archive";
                                isArchive
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
                                deleteOrUpdateInfo.current.id = form._id;
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
    <AdminSidebarComponent highlighted={highlighted}>
      {!hidden && (
        <Popup
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
                  change={setPetTextFilter}
                  val={petTextFilter}
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
                  <FormList list={petForms.data} type="pet" />
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
                  change={setGiftAidTextFilter}
                  val={giftAidTextFilter}
                  placehold={"Search by name"}
                />
              </div>
              <div className="lg:mr-20 lg:ml-20">
                {!giftAidLoading && (
                  <FormList list={giftAidForms.data} type="giftAid" />
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col items-center mt-3">
                <SearchInput
                  id={"volunteerTextFilter"}
                  change={setVolunteerTextFilter}
                  val={volunteerTextFilter}
                  placehold={"Search by name"}
                />
              </div>
              <div className="lg:mr-20 lg:ml-20">
                {!volunteerLoading && (
                  <FormList list={volunteerForms.data} type="volunteer" />
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;
