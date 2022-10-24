import React from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../../adminComponents/commonAdminComponents";

function Index() {
  return (
    <AdminSidebarComponent highlighted="Forms">
      <PageContainerComponent>
        <div>Forms</div>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;