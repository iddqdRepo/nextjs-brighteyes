import React from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../../adminComponents/commonAdminComponents";

function Index() {
  return (
    <AdminSidebarComponent highlighted="AddUser">
      <PageContainerComponent>
        <div>Add User</div>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;
