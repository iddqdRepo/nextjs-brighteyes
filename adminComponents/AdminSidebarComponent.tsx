import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import type { AdminUser } from "../utils/adminAccess";

const NAV_GROUPS = [
  [
    {
      toggle: "Dashboard",
      link: "",
      icon: "carbon:dashboard",
      text: "Dashboard",
    },
  ],
  [
    {
      toggle: "Animals",
      link: "/animals?archive=false",
      icon: "mdi:paw-outline",
      text: "Animals",
    },
    {
      toggle: "AnimalArchive",
      link: "/animals?archive=true",
      icon: "mdi:paw-off-outline",
      text: "Animal Archive",
    },
  ],
  [
    {
      toggle: "Forms",
      link: "/forms?archive=false",
      icon: "carbon:folder",
      text: "Forms",
    },
    {
      toggle: "FormArchive",
      link: "/forms?archive=true",
      icon: "carbon:folder-off",
      text: "Form Archive",
    },
  ],
  [
    {
      toggle: "Donations",
      link: "/donations",
      icon: "carbon:currency-pound",
      text: "Donations",
    },
    {
      toggle: "AddUser",
      link: "/addUser",
      icon: "carbon:group",
      text: "Team",
    },
  ],
  [
    {
      toggle: "Settings",
      link: "/settings",
      icon: "carbon:settings",
      text: "Settings",
    },
  ],
];

//Which nav items an admin can see; the server enforces the same rules, this
//just keeps doors they can't open out of sight. Pages that don't pass a
//currentUser show everything (their APIs still refuse unauthorized calls).
const canSeeNavItem = (toggle: string, currentUser?: AdminUser) => {
  if (!currentUser) {
    return true;
  }
  switch (toggle) {
    case "Forms":
    case "FormArchive":
      return currentUser.permissions.forms;
    case "Donations":
      return currentUser.permissions.donations;
    case "AddUser":
      return currentUser.isSuperuser;
    default:
      return true;
  }
};

function AdminSidebarComponent(props: {
  highlighted: string;
  currentUser?: AdminUser;
  children: React.ReactNode;
}) {
  const [toggleSelected, setToggleSelected] = useState<string>();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setToggleSelected(props.highlighted);
  }, [props]);

  const visibleNavGroups = NAV_GROUPS.map((group) =>
    group.filter((item) => canSeeNavItem(item.toggle, props.currentUser))
  ).filter((group) => group.length > 0);

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
    const selected = toggleSelected === toggle;
    return (
      <Link href={"/admin" + link}>
        <a
          id={toggle}
          onClick={() => setMobileOpen(false)}
          className={
            selected
              ? "flex items-center gap-3 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white font-poppins"
              : "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-brand-50 hover:text-brand font-poppins"
          }
        >
          <Icon
            id={`icon-${toggle}`}
            className={
              selected ? "h-5 w-auto text-white" : "h-5 w-auto text-gray-400"
            }
            icon={icon}
          />
          {text}
        </a>
      </Link>
    );
  };

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const user = await axios.post("/api/auth/logout");
    if (user.data.message) {
      router.push("/login");
    }
  };

  const NavContent = () => (
    <nav className="flex grow flex-col px-4 pb-6">
      {visibleNavGroups.map((group, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 border-b border-gray-100 py-3 last:border-b-0"
        >
          {group.map((item) => (
            <AdminNavLink key={item.toggle} {...item} />
          ))}
        </div>
      ))}
      <button
        onClick={(e) => handleLogout(e)}
        className="mt-3 flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 font-poppins"
      >
        <Icon className="h-5 w-auto text-gray-400" icon="entypo:log-out" />
        Log Out
      </button>
    </nav>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 lg:flex-row">
      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 lg:hidden">
        <Link href={"/admin"}>
          <a className="flex items-center gap-2">
            <Image
              src="/logo-nav.png"
              alt="Bright Eyes Animal Sanctuary"
              width={42}
              height={38}
            />
            <span className="font-poppins">
              <span className="block text-sm font-semibold leading-4 tracking-wide text-brand">
                BRIGHT EYES
              </span>
              <span className="block text-[0.55rem] uppercase tracking-[0.25em] text-gray-500">
                Admin
              </span>
            </span>
          </a>
        </Link>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <Icon
            icon={mobileOpen ? "akar-icons:cross" : "fontisto:nav-icon"}
            color="#8b3479"
            width="16"
            height="16"
          />
        </button>
      </div>
      {mobileOpen && (
        <div className="z-30 border-b border-gray-100 bg-white shadow-lg lg:hidden">
          <NavContent />
        </div>
      )}

      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-gray-100 bg-white lg:flex">
        <div className="flex flex-col items-center py-8">
          <Link href={"/admin"}>
            <a className="flex flex-col items-center gap-2">
              <Image
                src="/logo-nav.png"
                alt="Bright Eyes Animal Sanctuary"
                width={72}
                height={66}
              />
              <span className="text-center font-poppins">
                <span className="block text-base font-semibold tracking-[0.2em] text-brand">
                  BRIGHT EYES
                </span>
                <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-gray-500">
                  Animal Sanctuary
                </span>
              </span>
            </a>
          </Link>
        </div>
        <NavContent />
      </aside>

      <div className="flex w-full grow flex-col">
        {props.children}
        <footer className="mt-auto border-t border-gray-100 bg-white px-6 py-4 text-center text-xs text-gray-400 font-poppins">
          Bright Eyes Animal Sanctuary &middot; Admin &middot; &copy;{" "}
          {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default AdminSidebarComponent;
