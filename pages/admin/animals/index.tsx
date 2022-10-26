import dbConnect from "../../../utils/dbConnect";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Link from "next/link";
import {
  TableComponent,
  TableHeader,
  TableData,
  PageContainerComponent,
} from "../../../adminComponents/commonAdminComponents";
import petModel from "../../../models/petModel";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function Index(props: { data: any; archive: boolean }) {
  const [filter, setFilter] = useState("");
  const pets = props.data;
  const [textFilter, setTextFilter] = useState("");

  interface PetInterface {
    adopted: string;
    age: string;
    breed: string;
    desc: string;
    image: string;
    name: string;
    size: string;
    suitableForAnimals: string;
    suitableForChildren: string;
    type: string;
    updatedAt: string;
    yearsOrMonths: string;
    __v: string;
    _id: string;
  }
  console.log("props.archive", props.archive);
  return (
    <>
      <AdminSidebarComponent
        highlighted={props.archive ? "AnimalArchive" : "Animals"}
      >
        <PageContainerComponent>
          <div className="flex flex-col items-center">
            <div className="flex flex-col-reverse items-center justify-center w-full px-2 py-5 mt-10 border sm:flex-row sm:justify-between xl:w-5/6 rounded-xl">
              <input
                className="flex w-56 px-2 mb-2 border rounded-lg h-14 sm:mr-0"
                type="text"
                id="fname"
                name="fname"
                placeholder="Search by text"
                onChange={(e) => setTextFilter(e.target.value)}
              />
              <select
                className="flex w-56 px-2 mb-2 border rounded-lg h-14 sm:mr-0"
                name="type"
                id="type"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Dog">Dogs</option>
                <option value="Cat">Cats</option>
              </select>

              <Link href={"/admin/addAnimal"}>
                <button className="flex p-3 border mb-2 rounded-lg w-56 bg-[#8B3479] text-white justify-center hover:bg-[#398092]">
                  + Add Animal
                </button>
              </Link>
            </div>

            <div className="relative w-full mt-10 overflow-auto bg-slate-100 rounded-xl xl:w-5/6">
              <div className="mt-3 mb-8 overflow-hidden shadow-sm">
                <TableComponent>
                  <thead>
                    <tr>
                      <TableHeader>Image</TableHeader>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Type</TableHeader>
                      <TableHeader>Adopted</TableHeader>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800">
                    {pets
                      .filter((applied: { type: string }) => {
                        // console.log("applied", applied.type);
                        if (filter) {
                          return applied.type === filter;
                        } else {
                          return applied;
                        }
                      })
                      .filter((text: { type: string; name: string }) => {
                        // console.log("applied", text.type);
                        if (textFilter) {
                          return text.name
                            .toLowerCase()
                            .includes(textFilter.toLowerCase());
                        } else {
                          return text;
                        }
                      })
                      .map((pet: PetInterface) => {
                        return (
                          <>
                            <tr className="h-20">
                              <TableData className="flex flex-row items-center justify-center p-4 border-b border-slate-100 text-slate-500">
                                <div
                                  className="w-24 h-20 bg-center bg-no-repeat bg-cover rounded-xl fit"
                                  style={{
                                    backgroundImage: `url("${pet.image}")`,
                                  }}
                                ></div>
                              </TableData>

                              <TableData>
                                <div className="text-lg text-center font-roboto">
                                  {pet.name}
                                </div>
                              </TableData>
                              <TableData>
                                <div className="text-lg text-center font-roboto">
                                  {pet.type}
                                </div>
                              </TableData>
                              <TableData>
                                <div className="flex flex-row items-center justify-center">
                                  <Icon
                                    className="w-auto h-6 mr-5 cursor-pointer"
                                    icon="bxs:edit"
                                    onClick={() => {
                                      console.log("edit clicked");
                                    }}
                                  />
                                  <Icon
                                    className="w-auto h-6 cursor-pointer"
                                    icon="fluent:delete-20-filled"
                                    onClick={(e) => {
                                      console.log(e.target, "delete clicked");
                                    }}
                                  />
                                </div>
                              </TableData>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </TableComponent>
              </div>
            </div>
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

export async function getServerSideProps(context: { query: { archive: any } }) {
  await dbConnect();
  console.log("context", context.query.archive);

  if (context.query.archive === "false") {
    const result = await petModel.find({ adopted: "No" }).lean();

    const pets = result.map((pet) => {
      pet._id = pet._id.toString();
      if (pet.createdAt) {
        pet.createdAt = pet.createdAt.toString();
      }
      if (pet.updatedAt) {
        pet.updatedAt = pet.updatedAt.toString();
      }
      return pet;
    });

    return {
      props: {
        data: pets,
        archive: false,
      },
    };
  } else {
    const result = await petModel.find({ adopted: "Yes" }).lean();

    const pets = result.map((pet) => {
      pet._id = pet._id.toString();
      if (pet.createdAt) {
        pet.createdAt = pet.createdAt.toString();
      }
      if (pet.updatedAt) {
        pet.updatedAt = pet.updatedAt.toString();
      }
      return pet;
    });

    return {
      props: {
        data: pets,
        archive: true,
      },
    };
  }
}
