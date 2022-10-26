import React from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../../adminComponents/commonAdminComponents";

function Index() {
  return (
    <AdminSidebarComponent highlighted="FormArchive">
      <PageContainerComponent>
        <div className="flex flex-col items-center">
          <div className="flex flex-col-reverse items-center justify-center w-full px-2 py-5 mt-10 border sm:flex-row sm:justify-between xl:w-5/6 rounded-xl">
            <div className="flex justify-center mt-32">
              <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                  <li className="mr-2">
                    <a
                      href="#"
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    >
                      Profile
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href="#"
                      className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href="#"
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    >
                      Settings
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href="#"
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    >
                      Contacts
                    </a>
                  </li>
                  <li>
                    <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
                      Disabled
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative w-full mt-10 overflow-auto bg-slate-100 rounded-xl xl:w-5/6">
            <div className="mt-3 mb-8 overflow-hidden shadow-sm"></div>
          </div>
        </div>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;
