import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MobileNavListItem, NavbarListItem } from "./NavbarLayoutComponents";

const NAV_LINKS = [
  { text: "Home", path: "" },
  { text: "About", path: "about" },
  { text: "Adoption", path: "adoption" },
  { text: "Happy Tails", path: "happy-tails" },
  { text: "Donate", path: "donate" },
  { text: "Forms", path: "forms" },
];

function NavbarComponent() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(`/${path}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-7xl 2xl:max-w-[85rem] items-center justify-between gap-4 px-4 lg:px-8">
        <Link href="/">
          <a className="flex shrink-0 cursor-pointer items-center gap-2.5">
            <Image
              src="/logo-nav.png"
              alt="Bright Eyes Animal Sanctuary"
              width={54}
              height={49}
            />
            <span className="hidden font-poppins sm:block">
              <span className="block text-lg font-semibold leading-5 tracking-wide text-brand">
                BRIGHT EYES
              </span>
              <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-gray-500">
                Animal Sanctuary
              </span>
            </span>
          </a>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavbarListItem
              key={link.text}
              path={`/${link.path}`}
              text={link.text}
              active={isActive(link.path)}
            />
          ))}
        </ul>

        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex items-center gap-2.5 rounded-2xl border border-gray-200 py-2 pl-2.5 pr-4 shadow-sm">
            <Icon
              icon="akar-icons:location"
              color="#8b3479"
              width="20"
              height="20"
            />
            <span className="text-xs font-medium leading-4 font-poppins">
              53 Killymittan Road, <br /> BT94 2FW, Ballinamallard
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border border-gray-200 py-2.5 pl-2.5 pr-4 shadow-sm">
            <Icon
              icon="carbon:phone-voice"
              color="#8b3479"
              width="20"
              height="20"
            />
            <span className="text-sm font-medium font-poppins">
              028 66 720078
            </span>
          </div>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <Icon
            icon={mobileOpen ? "akar-icons:cross" : "fontisto:nav-icon"}
            color="#8b3479"
            width="18"
            height="18"
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute left-0 top-20 w-full border-t border-gray-100 bg-white shadow-xl lg:hidden">
          <ul className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <MobileNavListItem
                key={link.text}
                text={link.text}
                path={link.path}
                active={isActive(link.path)}
                onClickFunction={() => setMobileOpen(false)}
              />
            ))}
          </ul>
          <div className="flex flex-col gap-2 border-t border-gray-100 p-4 text-sm text-gray-700 font-poppins">
            <div className="flex items-center gap-2.5">
              <Icon
                icon="akar-icons:location"
                color="#8b3479"
                width="18"
                height="18"
              />
              53 Killymittan Road, BT94 2FW, Ballinamallard
            </div>
            <div className="flex items-center gap-2.5">
              <Icon
                icon="carbon:phone-voice"
                color="#8b3479"
                width="18"
                height="18"
              />
              028 66 720078
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavbarComponent;
