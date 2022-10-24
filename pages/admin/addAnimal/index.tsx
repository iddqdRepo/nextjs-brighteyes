import React from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../../adminComponents/commonAdminComponents";

function Index() {
  return (
    <AdminSidebarComponent highlighted="AddAnimal">
      <PageContainerComponent>
        <div>Add Animal</div>
      </PageContainerComponent>
    </AdminSidebarComponent>
  );
}

export default Index;
