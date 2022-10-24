import React from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../../adminComponents/commonAdminComponents";

function Index() {
  return (
    <AdminSidebarComponent highlighted="FormArchive">
      <PageContainerComponent>
        <div>Form Archive</div>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;
