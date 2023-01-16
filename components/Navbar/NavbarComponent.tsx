/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { MobileNavListItem, NavbarListItem } from "./NavbarLayoutComponents";
import useNavRef from "../../hooks/useNavRef";
import { NavRefInterface } from "../../interfaces/interfaces";

function NavbarComponent() {
  const navRefs = useNavRef();
  const defaultNavRef = useRef<null | HTMLUListElement>(null);
  const mobileNavDropdownRef = useRef<null | HTMLDivElement>(null);

  const hideMobileNav = () => {
    if (mobileNavDropdownRef.current !== null) {
      mobileNavDropdownRef.current.classList.toggle("hidden");
    }
  };

  const handleNavPaw = (clickedRef: HTMLDivElement | null) => {
    if (clickedRef) {
      Object.entries(navRefs.current).forEach((element) => {
        if (element[1] === clickedRef) {
          element[1].className = "";
        } else {
          element[1].className = "hidden";
        }
      });
    }
  };

  const setRefForElement = (
    suffix: keyof NavRefInterface,
    element: HTMLDivElement | null
  ) => {
    if (navRefs.current[suffix] === null) {
      navRefs.current[suffix] = element;
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between w-full h-20">
        <div className="flex flex-col justify-end">
          <Link href="/">
            <img
              className="object-cover w-full h-16 cursor-pointer "
              src="/logo-nav.png"
              alt=""
            />
          </Link>
        </div>
        <div className="hidden lg:flex">
          <ul className="flex flex-wrap justify-center">
            <NavbarListItem
              path={"/"}
              text={"Home"}
              listRef={(e: HTMLDivElement | null) =>
                setRefForElement("home", e)
              }
              onClickFunction={() => handleNavPaw(navRefs.current.home)}
            />

            <NavbarListItem
              path={"/about"}
              text={"About"}
              listRef={(e: HTMLDivElement | null) =>
                setRefForElement("about", e)
              }
              onClickFunction={() => handleNavPaw(navRefs.current.about)}
            />

            <NavbarListItem
              path={"/adoption"}
              text={"Adoption"}
              listRef={(e: HTMLDivElement | null) =>
                setRefForElement("adoption", e)
              }
              onClickFunction={() => handleNavPaw(navRefs.current.adoption)}
            />

            <NavbarListItem
              path={"/donate"}
              text={"Donate"}
              listRef={(e: HTMLDivElement | null) =>
                setRefForElement("donate", e)
              }
              onClickFunction={() => handleNavPaw(navRefs.current.donate)}
            />

            <NavbarListItem
              path={"/forms"}
              text={"Forms"}
              listRef={(e: HTMLDivElement | null) =>
                setRefForElement("forms", e)
              }
              onClickFunction={() => handleNavPaw(navRefs.current.forms)}
            />
          </ul>
        </div>

        <div className="justify-between hidden pr-5 lg:flex">
          <div className="flex items-center justify-center w-48 lg">
            <div className="flex items-center justify-center w-10 h-10 mr-3 border rounded-lg shadow-xl">
              <Icon
                icon="akar-icons:location"
                color="#8b3479"
                width="25"
                height="25"
              />
            </div>
            <span className="flex text-xs font-medium font-poppins">
              53 Killymittan Road, <br /> BT94 2FW, Ballinamallard
            </span>
          </div>
          <div className="flex items-center justify-center w-44">
            <div className="flex items-center justify-center w-10 h-10 mr-3 border rounded-lg shadow-xl">
              <Icon
                icon="carbon:phone-voice"
                color="#8b3479"
                width="25"
                height="25"
              />
            </div>
            <span className="flex text-sm font-medium font-poppins">
              028 66 388885
            </span>
          </div>
        </div>

        <div onClick={hideMobileNav} className="flex mr-10 lg:hidden">
          <button>
            <Icon icon="fontisto:nav-icon" color="black" />
          </button>
        </div>
      </nav>

      <div className="relative z-50 flex w-full">
        <div
          ref={mobileNavDropdownRef}
          className="absolute flex-col hidden w-full bg-white lg:hidden"
        >
          <ul ref={defaultNavRef} className="">
            <MobileNavListItem
              text={"Home"}
              path={""}
              onClickFunction={hideMobileNav}
            />
            <MobileNavListItem
              text={"About"}
              path={"about"}
              onClickFunction={hideMobileNav}
            />
            <MobileNavListItem
              text={"Adoption"}
              path={"adoption"}
              onClickFunction={hideMobileNav}
            />
            <MobileNavListItem
              text={"Donate"}
              path={"donate"}
              onClickFunction={hideMobileNav}
            />
            <MobileNavListItem
              text={"Forms"}
              path={"forms"}
              onClickFunction={hideMobileNav}
            />
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavbarComponent;
