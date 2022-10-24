import React from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../../adminComponents/commonAdminComponents";

function Index() {
  return (
    <AdminSidebarComponent highlighted="LogOut">
      <PageContainerComponent>
        <div>Logout</div>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;