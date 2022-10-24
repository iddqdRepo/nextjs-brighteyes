import AdminSidebarComponent from "../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../adminComponents/commonAdminComponents";
//active dogs
//active cats
//adopted animals
//pending adoption forms
//pending gift aiid forms
//pending volunteer forms
//total adoption forms
function Index() {
  return (
    <>
      <AdminSidebarComponent highlighted="Dashboard">
        <PageContainerComponent>
          {/* <div className="flex items-center py-3 pl-5 text-lg font-semibold">
            Dashboard Overview
          </div>
          <div className="border-t-2 border-[#398092] w-full"></div>
          <div className="flex justify-center">
            <div className="flex flex-row items-center justify-between w-4/5 mx-32 mt-10">
              <TopWidget />
              <TopWidget />
              <TopWidget />
              <TopWidget />
            </div>
          </div> */}
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;
