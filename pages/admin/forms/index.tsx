import React, { useEffect, useRef, useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  PageContainerComponent,
  SearchInput,
  TableComponent,
  TableData,
  TableHeader,
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
} from "../../../routes/formRoutes";
import { useRouter } from "next/router";
import { Popup } from "../../../components/common/CommonComponents";

function Index() {
  const router = useRouter();
  let isArchive = router.query.archive;
  const highlighted = isArchive === "true" ? "FormArchive" : "Forms";
  const queryClient = useQueryClient();
  const nameId = useRef({ name: "", id: "", type: "" });
  const [hidden, setHidden] = useState(true);
  const [petFilter, setPetFilter] = useState("");
  const [petTextFilter, setPetTextFilter] = useState("");
  const [volunteerTextFilter, setVolunteerTextFilter] = useState("");
  const [giftAidTextFilter, setGiftAidTextFilter] = useState("");

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
    onSuccess: () => {
      queryClient.invalidateQueries("petForms");
    },
  });
  const deleteGiftAidFormMutation = useMutation(deleteGiftAidForm, {
    onSuccess: async () => {
      console.log("deleteGiftAidFormMutation success");
      await queryClient.invalidateQueries("giftAidForms");
    },
  });
  // const archiveGiftAidFormMutation = useMutation(deleteGiftAidForm, {
  //   onSuccess: async () => {
  //     console.log("deleteGiftAidFormMutation success");
  //     await queryClient.invalidateQueries("giftAidForms");
  //   },
  // });
  const deleteVolunteerFormMutation = useMutation(deleteVolunteerForm, {
    onSuccess: () => {
      queryClient.invalidateQueries("volunteerForms");
    },
  });

  const handleDelete = () => {
    if (nameId.current.type === "pet") {
      deletePetFormMutation.mutate(nameId.current.id);
    } else if (nameId.current.type === "giftAid") {
      console.log("DELETING GIFT AID");
      deleteGiftAidFormMutation.mutate(nameId.current.id);
    } else if (nameId.current.type === "volunteer") {
      deleteVolunteerFormMutation.mutate(nameId.current.id);
    }
    setHidden(true);
  };
  // const handleArchive = () => {
  //   if (nameId.current.type === "pet") {
  //     // deletePetFormMutation.mutate(nameId.current.id);
  //   } else if (nameId.current.type === "giftAid") {
  //     console.log("DELETING GIFT AID");
  //     archiveGiftAidFormMutation.mutate(nameId.current.id);
  //   } else if (nameId.current.type === "pet") {
  //     // deleteVolunteerFormMutation.mutate(nameId.current.id);
  //   }
  //   setHidden(true);
  // };

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
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Submitted</TableHeader>
                <TableHeader>View</TableHeader>
                <TableHeader>Archive</TableHeader>
                <TableHeader>Delete</TableHeader>
              </tr>
            </thead>

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
                  (form: {
                    aboutQuestions: { name: string };
                    type: string;
                    updatedAt: string;
                    _id: string;
                  }) => {
                    return (
                      <tr key={form._id} className="h-20">
                        <TableData>
                          <div className="text-lg text-center font-roboto">
                            {form.aboutQuestions.name}
                          </div>
                        </TableData>
                        <TableData>
                          <div className="text-lg text-center font-roboto">
                            {form.type + " form"}
                          </div>
                        </TableData>
                        <TableData>
                          <div className="text-lg text-center font-roboto">
                            {form.updatedAt.slice(0, 16)}
                          </div>
                        </TableData>
                        <TableData>
                          <div className="flex flex-row items-center justify-center">
                            <Icon
                              className="w-auto h-6 cursor-pointer"
                              icon="carbon:view-filled"
                              onClick={() => {
                                console.log("view clicked");
                              }}
                            />
                          </div>
                        </TableData>
                        <TableData>
                          <div className="flex flex-row items-center justify-center">
                            <Icon
                              className="w-auto h-6 mr-5 cursor-pointer"
                              icon="fluent:tray-item-remove-24-filled"
                              onClick={() => {
                                console.log("Archive clicked");
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
                                nameId.current.name = form.aboutQuestions.name;
                                nameId.current.id = form._id;
                                nameId.current.type = form.type;
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
          name={nameId.current.id}
          deleteHandler={handleDelete}
          setHideState={setHidden}
        />
      )}
      <PageContainerComponent>
        <div className="flex justify-center mt-20 text-lg font-poppins">
          Active Forms
        </div>
        <div className="flex flex-col items-center mt-14">
          <Tabs>
            <TabList className="flex justify-center">
              <Tab
                selectedClassName="inline-block p-4 text-[#8B3479] border-b-2 border-[#8B3479] mr-2 rounded-t-lg"
                className="inline-block p-4 mr-2 border-b-2 rounded-t-lg cursor-pointer"
              >
                Adoption Forms
              </Tab>
              <Tab
                selectedClassName="inline-block p-4 text-[#8B3479] border-b-2 border-[#8B3479] mr-2 rounded-t-lg"
                className="inline-block p-4 mr-2 border-b-2 rounded-t-lg cursor-pointer"
              >
                GiftAid Forms
              </Tab>
              <Tab
                selectedClassName="inline-block p-4 text-[#8B3479] border-b-2 border-[#8B3479] mr-2 rounded-t-lg"
                className="inline-block p-4 mr-2 border-b-2 rounded-t-lg cursor-pointer"
              >
                Volunteer Forms
              </Tab>
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
                {!petFormsLoading && (
                  <FormList list={petForms.data} type="pet" />
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
