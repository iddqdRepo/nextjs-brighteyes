/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

function AdminDashboardComponent(props: any) {
  const [toggleSelected, setToggleSelected] = useState();

  useEffect(() => {
    setToggleSelected(props.highlighted);
  }, [props]);

  const AdminNavLink = ({
    toggle,
    link,
    icon,
    text,
  }: {
    toggle: string;
    link: string;
    icon: string;
    text: string;
  }) => {
    return (
      <div
        className={
          toggleSelected === toggle
            ? "flex flex-col font-poppins text-sm items-center mb-4 justify-center py-2 rounded-lg w-4/5 bg-[#8b3479] hover:cursor-pointer hover:rounded-md"
            : "flex flex-col font-poppins text-sm items-center mb-4 justify-center py-2 rounded-sm w-4/5 hover:cursor-pointer"
        }
      >
        <Link href={"/admin" + link}>
          <div className="flex flex-row items-center justify-center w-3/5 md:justify-start">
            <Icon
              className={
                toggleSelected === toggle
                  ? "w-auto h-6 text-white group-hover:text-white"
                  : "w-auto h-6 text-[#B0B0B8] group-hover:text-white"
              }
              icon={icon}
            />
            <span
              className={
                toggleSelected === toggle
                  ? "hidden text-white lg:pl-2 lg:text-bold lg:flex"
                  : "hidden text-gray-600 lg:pl-2 lg:text-bold lg:flex"
              }
            >
              {text}
            </span>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-w-screen md:flex-row">
      <div className="flex min-w-screen md:flex-col md:items-center md:w-20 md:min-h-screen lg:w-72 bg-white]">
        <div className="flex flex-col items-center py-6 text-base font-extrabold md:mb-10">
          <Link href={"/admin"}>
            <a>
              <img
                className="hidden lg:flex lg:w-auto lg:h-20"
                src="/logo-nav.png"
                alt=""
              />
            </a>
          </Link>
        </div>

        <AdminNavLink
          toggle={"Dashboard"}
          link={""}
          icon={"carbon:dashboard"}
          text={"Dashboard"}
        />
        {/* <AdminNavLink
          toggle={"AddAnimal"}
          link={"/addAnimal"}
          icon={"carbon:add"}
          text={"Add Animal"}
        /> */}
        <AdminNavLink
          toggle={"Animals"}
          link={"/animals"}
          icon={"mdi:paw-outline"}
          text={"Animals"}
        />
        <AdminNavLink
          toggle={"Forms"}
          link={"/forms"}
          icon={"carbon:folder"}
          text={"Forms"}
        />
        <AdminNavLink
          toggle={"AnimalArchive"}
          link={"/animalArchive"}
          icon={"mdi:paw-off-outline"}
          text={"Animal Archive"}
        />
        <AdminNavLink
          toggle={"FormArchive"}
          link={"/formArchive"}
          icon={"carbon:folder-off"}
          text={"Form Archive"}
        />
        <AdminNavLink
          toggle={"AddUser"}
          link={"/addUser"}
          icon={"ant-design:user-add-outlined"}
          text={"Add User"}
        />
        <AdminNavLink
          toggle={"LogOut"}
          link={"/logOut"}
          icon={"entypo:log-out"}
          text={"Log Out"}
        />
      </div>
      {props.children}
    </div>
  );
}

export default AdminDashboardComponent;
