/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavbarComponent() {
  const router = useRouter();
  const mobileNavDropdownRef = useRef<null | HTMLDivElement>(null);
  const defaultNavRef = useRef<null | HTMLUListElement>(null);

  const hideMobileNav = () => {
    if (mobileNavDropdownRef.current !== null) {
      mobileNavDropdownRef.current.classList.toggle("hidden");
    }
  };
  interface NavRefInterface {
    home: HTMLDivElement | null;
    about: HTMLDivElement | null;
    adoption: HTMLDivElement | null;
    donate: HTMLDivElement | null;
    forms: HTMLDivElement | null;
  }

  const MobileNavListItem = ({
    text,
    path,
  }: {
    text: string;
    path: string;
  }) => {
    return (
      <li
        className="flex py-4 mx-4 text-lg font-medium text-black font-poppins justify-left"
        onClick={hideMobileNav}
      >
        <Link href={"/" + path}>
          <a className="text-lg font-normal leading-6 text-black" href="#">
            {text}
          </a>
        </Link>
      </li>
    );
  };

  const navRefs = useRef<NavRefInterface>({
    home: null,
    about: null,
    adoption: null,
    donate: null,
    forms: null,
  });

  useEffect(() => {
    const path = router.pathname === "/" ? "/home" : router.pathname;
    Object.entries(navRefs.current).forEach((element) => {
      if ("/" + element[0] === path) {
        element[1].className = "";
      }
    });
  }, []);

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

  return (
    <>
      <nav className="flex items-center justify-between w-full h-20">
        <div className="flex flex-col justify-end">
          <img
            className="object-cover w-full h-16 "
            src="/logo-nav.png"
            alt=""
          />
        </div>
        <div className="hidden lg:flex">
          <ul className="flex flex-wrap justify-center">
            <li onClick={() => handleNavPaw(navRefs.current.home)}>
              <Link href="/">
                <a className="flex items-center mr-5 text-lg font-medium font-poppins">
                  <div className="w-5">
                    <div
                      ref={(e) => {
                        if (navRefs.current.home === null) {
                          navRefs.current.home = e;
                        }
                      }}
                      className="hidden"
                    >
                      <Icon
                        icon="foundation:paw"
                        color="#8b3479"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>
                  <span className="cursor-pointer">Home</span>
                </a>
              </Link>
            </li>
            <li onClick={() => handleNavPaw(navRefs.current.about)}>
              <Link href="/about">
                <a className="flex items-center mr-5 text-lg font-medium font-poppins">
                  <div className="w-5">
                    <div
                      ref={(e) => {
                        if (navRefs.current.about === null) {
                          navRefs.current.about = e;
                        }
                      }}
                      className="hidden"
                    >
                      <Icon
                        icon="foundation:paw"
                        color="#8b3479"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>
                  <span className="cursor-pointer">About</span>
                </a>
              </Link>
            </li>

            <li onClick={() => handleNavPaw(navRefs.current.adoption)}>
              <Link href="/adoption">
                <a className="flex items-center mr-5 text-lg font-medium font-poppins">
                  <div className="w-5">
                    <div
                      ref={(e) => {
                        if (navRefs.current.adoption === null) {
                          navRefs.current.adoption = e;
                        }
                      }}
                      className="hidden"
                    >
                      <Icon
                        icon="foundation:paw"
                        color="#8b3479"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>
                  <span className="cursor-pointer">Adoption</span>
                </a>
              </Link>
            </li>
            <li onClick={() => handleNavPaw(navRefs.current.donate)}>
              <Link href="/donate">
                <a className="flex items-center mr-5 text-lg font-medium font-poppins">
                  <div className="w-5">
                    <div
                      ref={(e) => {
                        if (navRefs.current.donate === null) {
                          navRefs.current.donate = e;
                        }
                      }}
                      className="hidden"
                    >
                      <Icon
                        icon="foundation:paw"
                        color="#8b3479"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>
                  <span className="cursor-pointer">Donate</span>
                </a>
              </Link>
            </li>

            <li onClick={() => handleNavPaw(navRefs.current.forms)}>
              <Link href="/forms">
                <a className="flex items-center mr-5 text-lg font-medium font-poppins">
                  <div className="w-5">
                    <div
                      ref={(e) => {
                        if (navRefs.current.forms === null) {
                          navRefs.current.forms = e;
                        }
                      }}
                      className="hidden"
                    >
                      <Icon
                        icon="foundation:paw"
                        color="#8b3479"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>
                  <span className="cursor-pointer">Forms</span>
                </a>
              </Link>
            </li>
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
            <MobileNavListItem text={"Home"} path={"/"} />
            <MobileNavListItem text={"About"} path={"about"} />
            <MobileNavListItem text={"Adoption"} path={"adoption"} />
            <MobileNavListItem text={"Donate"} path={"donate"} />
            <MobileNavListItem text={"Forms"} path={"forms"} />
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavbarComponent;
