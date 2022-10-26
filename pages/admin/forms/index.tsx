import React, { useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  PageContainerComponent,
  TableComponent,
  TableData,
  TableHeader,
} from "../../../adminComponents/commonAdminComponents";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Icon } from "@iconify/react";
import dbConnect from "../../../utils/dbConnect";
import formModels from "../../../models/formModels";

function Index(props) {
  // console.log(props.petForm);
  // console.log(props.giftAidForm);
  // console.log(props.volunteerForm);
  const [filter, setFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const FormList = (list) => {
    const mapList = list;
    console.log("mapList", mapList);

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
              {mapList.list
                .filter((formType: { type: string }) => {
                  // console.log("applied", applied.type);
                  if (filter) {
                    return formType.type === filter;
                  } else {
                    return formType;
                  }
                })
                .filter((text: { aboutQuestions: { name: string } }) => {
                  // console.log("applied", text.type);
                  if (textFilter) {
                    return text.aboutQuestions.name
                      .toLowerCase()
                      .includes(textFilter.toLowerCase());
                  } else {
                    return text;
                  }
                })
                .map((form) => {
                  return (
                    // form.type === "Dog" && (
                    <tr className="h-20">
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
                              console.log(
                                form.aboutQuestions.name,
                                "delete clicked"
                              );
                            }}
                          />
                        </div>
                      </TableData>
                    </tr>
                    // )
                  );
                })}
            </tbody>
          </TableComponent>
        </div>
      </div>
    );
  };

  return (
    <AdminSidebarComponent highlighted="Forms">
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
                  onChange={(e) => setTextFilter(e.target.value)}
                />
                <select
                  className="flex w-56 px-2 mb-2 border rounded-lg h-14 sm:mr-0"
                  name="type"
                  id="type"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Dog">Dog Forms</option>
                  <option value="Cat">Cat Forms</option>
                </select>
              </div>
              <div className="lg:mr-20 lg:ml-20">
                <FormList list={props.petForm} />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="lg:mr-20 lg:ml-20">
                <FormList list={props.giftAidForm} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="lg:mr-20 lg:ml-20">
                <FormList list={props.volunteerForm} />
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
  await dbConnect();
  // console.log("context", context.query.archive);

  const formPet = await formModels.FormPetAdoptionModel.find({
    archive: "No",
  }).lean();
  const formGiftAid = await formModels.FormGiftAidModel.find({
    archive: "No",
  }).lean();
  const formVolunteer = await formModels.FormVolunteerModel.find({
    archive: "No",
  }).lean();

  const petForm = formPet.map((pet) => {
    pet._id = pet._id.toString();
    if (pet.createdAt) {
      pet.createdAt = pet.createdAt.toString();
    }
    if (pet.updatedAt) {
      pet.updatedAt = pet.updatedAt.toString();
    }
    return pet;
  });

  const giftAidForm = formGiftAid.map((giftAid) => {
    giftAid._id = giftAid._id.toString();
    if (giftAid.createdAt) {
      giftAid.createdAt = giftAid.createdAt.toString();
    }
    if (giftAid.updatedAt) {
      giftAid.updatedAt = giftAid.updatedAt.toString();
    }
    return giftAid;
  });
  const volunteerForm = formVolunteer.map((vol) => {
    vol._id = vol._id.toString();
    if (vol.createdAt) {
      vol.createdAt = vol.createdAt.toString();
    }
    if (vol.updatedAt) {
      vol.updatedAt = vol.updatedAt.toString();
    }
    return vol;
  });

  return {
    props: {
      petForm,
      giftAidForm,
      volunteerForm,
      archive: false,
    },
  };
}
