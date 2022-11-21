import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  TableComponent,
  TableData,
  PageContainerComponent,
  PageHeader,
  TableHeadMap,
  AdminHeadTag,
} from "../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deletePet, getPets, updatePet } from "../../../routes/petRoutes";
import {
  LoadingIcon,
  Popup,
} from "../../../components/common/CommonComponents";
import { PetInterface } from "../../../interfaces/interfaces";

function Index() {
  const [filter, setFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [hidden, setHidden] = useState(true);
  const deleteOrUpdateInfo = useRef({
    name: "",
    id: "",
    data: {} as PetInterface,
    action: "",
    promptText: "",
  });
  const tableHeaderArray = ["Name", "Edit", "Archive", "Delete"];

  const router = useRouter();
  const queryClient = useQueryClient();
  let isArchive = router.query.archive;
  const highlighted = isArchive === "true" ? "AnimalArchive" : "Animals";
  const { isLoading, data: pets } = useQuery("pets", getPets);

  const deletePetMutation = useMutation(deletePet, {
    onSuccess: () => {
      queryClient.invalidateQueries("pets");
    },
  });
  const updatePetMutation = useMutation(updatePet, {
    onSuccess: () => {
      queryClient.invalidateQueries("pets");
    },
  });

  const handleDelete = () => {
    deletePetMutation.mutate(deleteOrUpdateInfo.current.id);
    setHidden(true);
  };
  const handleArchive = () => {
    if (deleteOrUpdateInfo.current.data.adopted === "Yes") {
      deleteOrUpdateInfo.current.data.adopted = "No";
    } else {
      deleteOrUpdateInfo.current.data.adopted = "Yes";
    }
    updatePetMutation.mutate(deleteOrUpdateInfo.current.data);
    setHidden(true);
  };

  return (
    <>
      <AdminHeadTag
        title={"Animals"}
        metaContent={"Animals, Bright Eyes"}
        linkHref={"/admin/animals"}
      />
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
            {isArchive === "true" ? "Archived Animals" : "Active Animals"}
          </PageHeader>
          <div className="flex flex-col items-center">
            <div className="flex flex-col-reverse items-center justify-center w-full px-2 py-5 mt-10 border sm:flex-row sm:justify-center xl:w-5/6 rounded-xl">
              <input
                className="flex w-56 px-2 m-2 border rounded-lg h-14 sm:mr-0"
                type="text"
                id="fname"
                name="fname"
                placeholder="Search by text"
                onChange={(e) => setTextFilter(e.target.value)}
              />
              <select
                className="flex w-56 px-2 m-2 border rounded-lg h-14 sm:mr-0"
                name="type"
                id="type"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Dog">Dogs</option>
                <option value="Cat">Cats</option>
              </select>
              {isArchive === "false" ? (
                <Link href={"/admin/animals/addAnimal"}>
                  <button
                    id="AddAnimal"
                    className="flex p-3 border m-2 rounded-lg w-56 bg-[#8B3479] text-white justify-center hover:bg-[#398092]"
                  >
                    + Add Animal
                  </button>
                </Link>
              ) : (
                <></>
              )}
            </div>

            {!isLoading ? (
              <div className="relative w-full mt-10 overflow-auto bg-slate-100 rounded-xl xl:w-5/6">
                <div className="mt-3 mb-8 overflow-hidden shadow-sm">
                  <TableComponent>
                    <TableHeadMap ArrayOfHeaderTitles={tableHeaderArray} />
                    <tbody className="bg-white dark:bg-slate-800">
                      {pets.data
                        .filter((archiveFilter: { adopted: string }) => {
                          if (isArchive === "false") {
                            return archiveFilter.adopted === "No";
                          } else {
                            return archiveFilter.adopted === "Yes";
                          }
                        })
                        .filter((applied: { type: string }) => {
                          if (filter) {
                            return applied.type === filter;
                          } else {
                            return applied;
                          }
                        })
                        .filter((text: { type: string; name: string }) => {
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
                            <tr className="h-20" key={pet._id}>
                              <TableData>
                                <div className="text-lg text-center font-roboto">
                                  {pet.name}
                                </div>
                              </TableData>

                              <TableData>
                                <div className="flex flex-row items-center justify-center">
                                  <Link href={`/admin/animals/${pet._id}`}>
                                    <Icon
                                      className="w-auto h-6 cursor-pointer"
                                      icon="bxs:edit"
                                    />
                                  </Link>
                                </div>
                              </TableData>
                              <TableData>
                                <div className="flex flex-row items-center justify-center">
                                  <Icon
                                    className="w-auto h-6 cursor-pointer"
                                    icon="fluent:tray-item-remove-24-filled"
                                    onClick={() => {
                                      deleteOrUpdateInfo.current.name =
                                        pet.name;
                                      if (pet._id) {
                                        deleteOrUpdateInfo.current.id =
                                          pet!._id;
                                      }
                                      deleteOrUpdateInfo.current.data = pet;
                                      deleteOrUpdateInfo.current.action =
                                        "archive";
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
                                        pet.name;
                                      if (pet._id) {
                                        deleteOrUpdateInfo.current.id =
                                          pet!._id;
                                      }
                                      deleteOrUpdateInfo.current.action =
                                        "delete";
                                      deleteOrUpdateInfo.current.promptText =
                                        "delete";
                                      setHidden(false);
                                    }}
                                  />
                                </div>
                              </TableData>
                            </tr>
                          );
                        })}
                    </tbody>
                  </TableComponent>
                </div>
              </div>
            ) : (
              <LoadingIcon />
            )}
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;
