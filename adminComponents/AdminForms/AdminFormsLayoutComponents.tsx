import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  ContactUsFormInterface,
  VolunteerFormInterface,
} from "../../interfaces/interfaces";
import {
  TableComponent,
  TableHeadMap,
  TableData,
  MobileActionButton,
  MobileCard,
  MobileCardList,
} from "../commonAdminComponents";

type AnyForm =
  | GiftaidFormInterface
  | PetAdoptionFormInterface
  | VolunteerFormInterface
  | ContactUsFormInterface;

export const FormList = ({
  list,
  type,
  isArchive,
  searchText,
  tableHeaderArray,
  deleteOrUpdateInfo,
  petFilter,
  setHidden,
  canDelete,
}: {
  list: any;
  type: any;
  isArchive: any;
  searchText: any;
  tableHeaderArray: any;
  deleteOrUpdateInfo: any;
  petFilter?: any;
  setHidden: any;
  //Deleting a submission is permanent, so only superusers see the button.
  canDelete: boolean;
}) => {
  const visibleForms = list
    .sort(function (a: any, b: any) {
      // Show the newest first
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
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
    });

  const promptArchive = (form: AnyForm) => {
    deleteOrUpdateInfo.current.name = form.aboutQuestions.name;
    if (form._id) {
      deleteOrUpdateInfo.current.id = form._id;
    }
    deleteOrUpdateInfo.current.type = form.type;
    deleteOrUpdateInfo.current.data = form;
    deleteOrUpdateInfo.current.action = "archive";
    deleteOrUpdateInfo.current.promptText =
      isArchive === "true" ? "unArchive" : "archive";
    setHidden(false);
  };

  const promptDelete = (form: AnyForm) => {
    deleteOrUpdateInfo.current.name = form.aboutQuestions.name;
    if (form._id) {
      deleteOrUpdateInfo.current.id = form._id;
    }
    deleteOrUpdateInfo.current.type = form.type;
    deleteOrUpdateInfo.current.action = "delete";
    deleteOrUpdateInfo.current.promptText = "delete";
    setHidden(false);
  };

  return (
    <>
      {/* Desktop: table. Mobile: stacked cards below. */}
      <div className="mt-6 hidden w-full overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <TableComponent className="min-w-[36rem]">
          <TableHeadMap ArrayOfHeaderTitles={tableHeaderArray} />

          <tbody className="bg-white">
            {visibleForms.map((form: AnyForm) => {
              return (
                <tr key={form._id} className="transition hover:bg-brand-50/40">
                  <TableData>
                    <div className="text-center text-sm font-semibold text-gray-900 font-poppins">
                      {form.aboutQuestions.name}
                    </div>
                  </TableData>
                  <TableData>
                    <div className="text-center text-sm font-poppins">
                      {form.type + " form"}
                    </div>
                  </TableData>
                  <TableData>
                    <div className="whitespace-nowrap text-center text-sm font-poppins">
                      {form.updatedAt && form.updatedAt.slice(0, 10)}
                    </div>
                  </TableData>
                  <TableData>
                    <Link href={`/admin/forms/${form._id}`}>
                      <a
                        className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
                        title={`View ${form.aboutQuestions.name}'s form`}
                      >
                        <Icon
                          icon="carbon:view-filled"
                          width="17"
                          height="17"
                        />
                      </a>
                    </Link>
                  </TableData>
                  <TableData>
                    <button
                      className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
                      title={
                        isArchive === "true"
                          ? `Unarchive ${form.aboutQuestions.name}'s form`
                          : `Archive ${form.aboutQuestions.name}'s form`
                      }
                      aria-label={
                        isArchive === "true"
                          ? `Unarchive ${form.aboutQuestions.name}'s form`
                          : `Archive ${form.aboutQuestions.name}'s form`
                      }
                      onClick={() => promptArchive(form)}
                    >
                      <Icon
                        icon={
                          isArchive === "true"
                            ? "fluent:tray-item-add-24-filled"
                            : "fluent:tray-item-remove-24-filled"
                        }
                        width="17"
                        height="17"
                      />
                    </button>
                  </TableData>
                  {canDelete && (
                    <TableData>
                      <button
                        className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                        title={`Delete ${form.aboutQuestions.name}'s form`}
                        aria-label={`Delete ${form.aboutQuestions.name}'s form`}
                        onClick={() => promptDelete(form)}
                      >
                        <Icon
                          icon="fluent:delete-20-filled"
                          width="17"
                          height="17"
                        />
                      </button>
                    </TableData>
                  )}
                </tr>
              );
            })}
          </tbody>
        </TableComponent>
        {visibleForms.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-gray-500 font-poppins">
            No forms match the current filters.
          </div>
        )}
      </div>

      <MobileCardList className="mt-6">
        {visibleForms.map((form: AnyForm) => (
          <MobileCard key={form._id}>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-base font-semibold text-gray-900 font-poppins">
                {form.aboutQuestions.name}
              </span>
              <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand font-poppins">
                {form.type}
              </span>
            </div>
            <div className="mt-0.5 text-sm text-gray-500 font-poppins">
              Submitted {form.updatedAt && form.updatedAt.slice(0, 10)}
            </div>
            <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
              <Link href={`/admin/forms/${form._id}`}>
                <a className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-2.5 text-xs font-medium text-gray-700 transition hover:border-brand hover:text-brand font-poppins">
                  <Icon icon="carbon:view-filled" width="15" height="15" />
                  View
                </a>
              </Link>
              <MobileActionButton
                icon={
                  isArchive === "true"
                    ? "fluent:tray-item-add-24-filled"
                    : "fluent:tray-item-remove-24-filled"
                }
                label={isArchive === "true" ? "Restore" : "Archive"}
                onClick={() => promptArchive(form)}
              />
              {canDelete && (
                <MobileActionButton
                  danger
                  icon="fluent:delete-20-filled"
                  label="Delete"
                  onClick={() => promptDelete(form)}
                />
              )}
            </div>
          </MobileCard>
        ))}
        {visibleForms.length === 0 && (
          <MobileCard className="py-8 text-center text-sm text-gray-500 font-poppins">
            No forms match the current filters.
          </MobileCard>
        )}
      </MobileCardList>
    </>
  );
};
