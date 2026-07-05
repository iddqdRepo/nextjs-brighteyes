import { Icon } from "@iconify/react";
import Link from "next/link";

export const NavbarListItem = ({
  text,
  path,
  active,
}: {
  text: string;
  path: string;
  active: boolean;
}) => {
  return (
    <li>
      <Link href={path}>
        <a
          className={`flex items-center gap-1.5 border-b-2 pb-1 text-base font-medium transition font-poppins ${
            active
              ? "border-brand text-brand"
              : "border-transparent text-gray-800 hover:text-brand"
          }`}
        >
          {active && (
            <Icon
              icon="foundation:paw"
              color="#8b3479"
              width="16"
              height="16"
            />
          )}
          {text}
        </a>
      </Link>
    </li>
  );
};

export const MobileNavListItem = ({
  text,
  path,
  active,
  onClickFunction,
}: {
  text: string;
  path: string;
  active: boolean;
  onClickFunction: () => void;
}) => {
  return (
    <li onClick={onClickFunction}>
      <Link href={"/" + path}>
        <a
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium font-poppins ${
            active ? "bg-brand-50 text-brand" : "text-gray-800"
          }`}
        >
          {active && (
            <Icon
              icon="foundation:paw"
              color="#8b3479"
              width="16"
              height="16"
            />
          )}
          {text}
        </a>
      </Link>
    </li>
  );
};
