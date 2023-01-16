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
} from "../commonAdminComponents";

export const FormList = ({
  list,
  type,
  isArchive,
  searchText,
  tableHeaderArray,
  deleteOrUpdateInfo,
  petFilter,
  setHidden,
}: {
  list: any;
  type: any;
  isArchive: any;
  searchText: any;
  tableHeaderArray: any;
  deleteOrUpdateInfo: any;
  petFilter?: any;
  setHidden: any;
}) => {
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
                              deleteOrUpdateInfo.current.promptText = "delete";
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
