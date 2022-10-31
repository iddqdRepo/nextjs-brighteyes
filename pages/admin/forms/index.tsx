import React, { useRef, useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  PageContainerComponent,
  TableComponent,
  TableData,
  TableHeader,
} from "../../../adminComponents/commonAdminComponents";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";

function Index(props: { archive: string }) {
  const queryClient = useQueryClient();
  const nameId = useRef({ name: "", id: "", type: "" });
  const [hidden, setHidden] = useState(true);
  const [petFilter, setPetFilter] = useState("");
  const [petTextFilter, setPetTextFilter] = useState("");
  const [volunteerTextFilter, setVolunteerTextFilter] = useState("");
  const [giftAidTextFilter, setGiftAidTextFilter] = useState("");

  console.log(props.archive);

  const getPetForms = async () => {
    const petforms = await axios.get(
      "http://localhost:3000/api/forms?type=pet"
    );
    return petforms.data;
  };
  const getGiftAidForms = async () => {
    const giftAidforms = await axios.get(
      "http://localhost:3000/api/forms?type=giftaid"
    );
    return giftAidforms.data;
  };
  const getVolunteerForms = async () => {
    const volunteerforms = await axios.get(
      "http://localhost:3000/api/forms?type=volunteer"
    );
    return volunteerforms.data;
  };

  const deletePetForm = async (id: string) => {
    axios.delete(`http://localhost:3000/api/forms/${id}?type=pet`);
  };

  const {
    isLoading: petFormsLoading,
    // isError: petFormsIsError,
    // error: petFormsError,
    // isSuccess: petFormsIsSuccess,
    data: petForms,
  } = useQuery("petForms", getPetForms);

  const {
    isLoading: giftAidLoading,
    // isError: giftAidIsError,
    // error: giftAidError,
    // isSuccess: giftAidIsSuccess,
    data: giftAidForms,
  } = useQuery("giftAidForms", getGiftAidForms);

  const {
    isLoading: volunteerLoading,
    // isError: volunteerIsError,
    // error: volunteerError,
    // isSuccess: volunteerIsSuccess,
    data: volunteerForms,
  } = useQuery("volunteerForms", getVolunteerForms);

  const deletePetFormMutation = useMutation(deletePetForm, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("petForms");
    },
  });

  const handleDelete = () => {
    console.log("DELETING", nameId.current.name);
    deletePetFormMutation.mutate(nameId.current.id);
    setHidden(true);
  };

  const Popup = () => {
    console.log("id", nameId.current.id);
    return (
      <div className="absolute z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-600 ">
        <div className="flex flex-col items-center p-4 bg-white border-2 shadow-lg h-fit w-96">
          <div className="pt-5 text-lg text-red-700 font-roboto">
            Are you sure you want to delete
          </div>
          <div className="p-2 m-5 text-red-700 border-2 font-roboto">
            {nameId.current.name}
          </div>
          <button
            onClick={() => handleDelete()}
            className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner"
          >
            <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
              <span className="">Yes</span>
            </div>
          </button>
          <button
            onClick={() => setHidden(true)}
            className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner"
          >
            <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
              <span className="">No</span>
            </div>
          </button>
        </div>
      </div>
    );
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
                      console.log("petFilter");
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
                                // deletePetFormMutation.mutate(form._id);
                                setHidden(false);
                                console.log("form.type", form.type);
                                nameId.current.name = form.aboutQuestions.name;
                                nameId.current.id = form._id;
                                nameId.current.type = "pet";
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
    <AdminSidebarComponent highlighted="Forms">
      {!hidden && <Popup />}

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
                <input
                  className="flex w-56 px-2 mb-2 border rounded-lg h-14 sm:mr-0"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Search by name"
                  onChange={(e) => setPetTextFilter(e.target.value)}
                  value={petTextFilter}
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
                <input
                  className="flex w-56 px-2 mb-2 border rounded-lg h-14 sm:mr-0"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Search by name"
                  onChange={(e) => setGiftAidTextFilter(e.target.value)}
                  value={giftAidTextFilter}
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
                <input
                  className="flex w-56 px-2 mb-2 border rounded-lg h-14 sm:mr-0"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Search by name"
                  onChange={(e) => setVolunteerTextFilter(e.target.value)}
                  value={volunteerTextFilter}
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

export async function getServerSideProps(context: { query: { archive: any } }) {
  // await dbConnect();
  console.log("context", context.query.archive);

  // const formPet = await formModels.FormPetAdoptionModel.find({
  //   archive: "No",
  // }).lean();
  // const formGiftAid = await formModels.FormGiftAidModel.find({
  //   archive: "No",
  // }).lean();
  // const formVolunteer = await formModels.FormVolunteerModel.find({
  //   archive: "No",
  // }).lean();

  // const petForm = formPet.map((pet) => {
  //   pet._id = pet._id.toString();
  //   if (pet.createdAt) {
  //     pet.createdAt = pet.createdAt.toString();
  //   }
  //   if (pet.updatedAt) {
  //     pet.updatedAt = pet.updatedAt.toString();
  //   }
  //   return pet;
  // });

  // const giftAidForm = formGiftAid.map((giftAid) => {
  //   giftAid._id = giftAid._id.toString();
  //   if (giftAid.createdAt) {
  //     giftAid.createdAt = giftAid.createdAt.toString();
  //   }
  //   if (giftAid.updatedAt) {
  //     giftAid.updatedAt = giftAid.updatedAt.toString();
  //   }
  //   return giftAid;
  // });
  // const volunteerForm = formVolunteer.map((vol) => {
  //   vol._id = vol._id.toString();
  //   if (vol.createdAt) {
  //     vol.createdAt = vol.createdAt.toString();
  //   }
  //   if (vol.updatedAt) {
  //     vol.updatedAt = vol.updatedAt.toString();
  //   }
  //   return vol;
  // });

  return {
    props: {
      // petForm,
      // giftAidForm,
      // volunteerForm,
      archive: false,
    },
  };
}
