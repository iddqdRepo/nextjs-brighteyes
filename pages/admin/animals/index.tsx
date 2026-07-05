import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import {
  AdminHeadTag,
  AdminPageHeader,
  AdminSelect,
  AdminStatCard,
  AdminConfirmationPopup,
  MobileActionButton,
  MobileCard,
  MobileCardList,
  PageContainerComponent,
  SearchInput,
  TableComponent,
  TableData,
  TableHeadMap,
} from "../../../adminComponents/commonAdminComponents";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import ShareAnimalPopup from "../../../adminComponents/ShareAnimalPopup";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deletePet, getPets, updatePet } from "../../../routes/petRoutes";
import { LoadingIcon } from "../../../components/common/CommonComponents";
import { PetInterface } from "../../../interfaces/interfaces";
import { AdminUser, gateAdminPage } from "../../../utils/auth";

const ActionButton = ({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={
        danger
          ? "flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
          : "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
      }
    >
      <Icon className="h-4.5 w-auto" icon={icon} width="17" height="17" />
    </button>
  );
};

const PetThumbnail = ({
  pet,
  large,
}: {
  pet: PetInterface;
  large?: boolean;
}) => {
  const sizeClass = large ? "h-14 w-14" : "h-11 w-11";
  return pet.image ? (
    <div
      className={`${sizeClass} shrink-0 rounded-xl bg-cover bg-center`}
      style={{ backgroundImage: `url("${pet.image}")` }}
    />
  ) : (
    <div
      className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-xl bg-brand-50`}
    >
      <Icon icon="foundation:paw" color="#8b3479" width="18" />
    </div>
  );
};

const StatusBadge = ({ adopted }: { adopted: string }) => (
  <span
    className={
      adopted === "Yes"
        ? "inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-deep font-poppins"
        : "inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 font-poppins"
    }
  >
    {adopted === "Yes" ? "Adopted" : "Active"}
  </span>
);

function Index({ currentUser }: { currentUser: AdminUser }) {
  const [filter, setFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [hidden, setHidden] = useState(true);
  const [shareTarget, setShareTarget] = useState<PetInterface | null>(null);
  const deleteOrUpdateInfo = useRef({
    name: "",
    id: "",
    data: {} as PetInterface,
    action: "",
    promptText: "",
  });

  //What this admin may do here; the API enforces the same rules.
  const canManage = currentUser.permissions.animals;
  const canDelete = currentUser.isSuperuser;

  const router = useRouter();
  const queryClient = useQueryClient();
  let isArchive = router.query.archive;
  const highlighted = isArchive === "true" ? "AnimalArchive" : "Animals";
  const tableHeaderArray = [
    "Animal",
    "Type / Breed",
    "Age",
    "Sex",
    "Status",
    "Actions",
  ];
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

  const promptArchive = (pet: PetInterface) => {
    deleteOrUpdateInfo.current.name = pet.name;
    if (pet._id) {
      deleteOrUpdateInfo.current.id = pet._id;
    }
    deleteOrUpdateInfo.current.data = pet;
    deleteOrUpdateInfo.current.action = "archive";
    deleteOrUpdateInfo.current.promptText =
      isArchive === "true" ? "mark as available" : "mark as adopted";
    setHidden(false);
  };

  const promptDelete = (pet: PetInterface) => {
    deleteOrUpdateInfo.current.name = pet.name;
    if (pet._id) {
      deleteOrUpdateInfo.current.id = pet._id;
    }
    deleteOrUpdateInfo.current.action = "delete";
    deleteOrUpdateInfo.current.promptText = "delete";
    setHidden(false);
  };

  const visiblePets: PetInterface[] = (pets?.data ?? [])
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
        return text.name.toLowerCase().includes(textFilter.toLowerCase());
      } else {
        return text;
      }
    });

  const countByType = (type: string) =>
    visiblePets.filter((pet) => pet.type === type).length;

  return (
    <>
      <AdminHeadTag
        title={"Animals"}
        metaContent={"Animals, Bright Eyes"}
        linkHref={"/admin/animals"}
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
        {shareTarget && (
          <ShareAnimalPopup
            name={shareTarget.name}
            url={`${window.location.origin}/adoption/${shareTarget._id}`}
            onClose={() => setShareTarget(null)}
          />
        )}

        <PageContainerComponent>
          <AdminPageHeader
            title={isArchive === "true" ? "Archived Animals" : "Active Animals"}
            subtitle={
              isArchive === "true"
                ? "View and manage animals that have been adopted."
                : "Manage animals currently in our care."
            }
          />

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
            <SearchInput
              id="fname"
              change={setTextFilter}
              val={textFilter}
              placehold="Search animals by name..."
            />
            <AdminSelect id="type" value={filter} onChange={setFilter}>
              <option value="">All Types</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
            </AdminSelect>
            {isArchive === "false" && canManage && (
              <div className="sm:ml-auto">
                <Link href={"/admin/animals/addAnimal"}>
                  <button
                    id="AddAnimal"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark font-poppins sm:w-auto"
                  >
                    + Add Animal
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <AdminStatCard
              tint="blush"
              icon="foundation:paw"
              label={isArchive === "true" ? "Total Archived" : "Total Active"}
              value={!isLoading ? visiblePets.length : "…"}
            />
            <AdminStatCard
              tint="cream"
              icon="cil:dog"
              label="Dogs"
              value={!isLoading ? countByType("Dog") : "…"}
            />
            <AdminStatCard
              icon="cil:cat"
              label="Cats"
              value={!isLoading ? countByType("Cat") : "…"}
            />
          </div>

          {!isLoading ? (
            <>
              {/* Desktop: table. Mobile: stacked cards below. */}
              <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
                <TableComponent className="min-w-[44rem]">
                  <TableHeadMap ArrayOfHeaderTitles={tableHeaderArray} />
                  <tbody className="bg-white">
                    {visiblePets.map((pet: PetInterface) => {
                      return (
                        <tr
                          className="transition hover:bg-brand-50/40"
                          key={pet._id}
                        >
                          <TableData>
                            <div className="flex items-center gap-3">
                              <PetThumbnail pet={pet} />
                              <span className="text-sm font-semibold text-gray-900 font-poppins">
                                {pet.name}
                              </span>
                            </div>
                          </TableData>
                          <TableData>
                            <div className="text-sm font-poppins">
                              <div className="font-medium text-gray-800">
                                {pet.type}
                              </div>
                              <div className="text-xs text-gray-500">
                                {pet.breed}
                              </div>
                            </div>
                          </TableData>
                          <TableData>
                            <div className="whitespace-nowrap text-sm font-poppins">
                              {pet.age} {pet.yearsOrMonths}
                            </div>
                          </TableData>
                          <TableData>
                            <div className="text-sm font-poppins">
                              {pet.sex ? pet.sex : "N/A"}
                            </div>
                          </TableData>
                          <TableData>
                            <StatusBadge adopted={pet.adopted} />
                          </TableData>
                          <TableData>
                            <div className="flex items-center gap-2">
                              {canManage && (
                                <Link href={`/admin/animals/${pet._id}`}>
                                  <a
                                    title={`Edit ${pet.name}`}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
                                  >
                                    <Icon
                                      icon="bxs:edit"
                                      width="17"
                                      height="17"
                                    />
                                  </a>
                                </Link>
                              )}
                              {canManage && (
                                <ActionButton
                                  icon={
                                    isArchive === "true"
                                      ? "mdi:paw"
                                      : "mdi:home-heart"
                                  }
                                  label={
                                    isArchive === "true"
                                      ? `Mark ${pet.name} as available`
                                      : `Mark ${pet.name} as adopted`
                                  }
                                  onClick={() => promptArchive(pet)}
                                />
                              )}
                              {isArchive !== "true" && (
                                <ActionButton
                                  icon="carbon:share"
                                  label={`Share ${pet.name}`}
                                  onClick={() => setShareTarget(pet)}
                                />
                              )}
                              {canDelete && (
                                <ActionButton
                                  danger
                                  icon="fluent:delete-20-filled"
                                  label={`Delete ${pet.name}`}
                                  onClick={() => promptDelete(pet)}
                                />
                              )}
                            </div>
                          </TableData>
                        </tr>
                      );
                    })}
                  </tbody>
                </TableComponent>
                {visiblePets.length === 0 && (
                  <div className="px-6 py-10 text-center text-sm text-gray-500 font-poppins">
                    No animals match the current filters.
                  </div>
                )}
              </div>

              <MobileCardList className="mt-4">
                {visiblePets.map((pet: PetInterface) => (
                  <MobileCard key={pet._id}>
                    <div className="flex items-center gap-3">
                      <PetThumbnail pet={pet} large />
                      <div className="min-w-0 grow">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-base font-semibold text-gray-900 font-poppins">
                            {pet.name}
                          </span>
                          <StatusBadge adopted={pet.adopted} />
                        </div>
                        <div className="mt-0.5 truncate text-sm text-gray-600 font-poppins">
                          {pet.type} &middot; {pet.breed}
                        </div>
                        <div className="text-sm text-gray-500 font-poppins">
                          {pet.age} {pet.yearsOrMonths} &middot;{" "}
                          {pet.sex ? pet.sex : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                      {canManage && (
                        <Link href={`/admin/animals/${pet._id}`}>
                          <a className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-2.5 text-xs font-medium text-gray-700 transition hover:border-brand hover:text-brand font-poppins">
                            <Icon icon="bxs:edit" width="15" height="15" />
                            Edit
                          </a>
                        </Link>
                      )}
                      {canManage && (
                        <MobileActionButton
                          icon={
                            isArchive === "true" ? "mdi:paw" : "mdi:home-heart"
                          }
                          label={isArchive === "true" ? "Available" : "Adopted"}
                          onClick={() => promptArchive(pet)}
                        />
                      )}
                      {isArchive !== "true" && (
                        <MobileActionButton
                          icon="carbon:share"
                          label="Share"
                          onClick={() => setShareTarget(pet)}
                        />
                      )}
                      {canDelete && (
                        <MobileActionButton
                          danger
                          icon="fluent:delete-20-filled"
                          label="Delete"
                          onClick={() => promptDelete(pet)}
                        />
                      )}
                    </div>
                  </MobileCard>
                ))}
                {visiblePets.length === 0 && (
                  <MobileCard className="py-8 text-center text-sm text-gray-500 font-poppins">
                    No animals match the current filters.
                  </MobileCard>
                )}
              </MobileCardList>
            </>
          ) : (
            <div className="flex justify-center">
              <LoadingIcon />
            </div>
          )}
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Any signed-in admin can view the list; what they can do to it is decided
  //by their permissions (and enforced again by the API).
  const gate = await gateAdminPage(context.req);
  if (gate.redirect) {
    return gate.redirect;
  }
  return { props: { currentUser: gate.user } };
};
