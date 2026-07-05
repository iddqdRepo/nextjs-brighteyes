import { Icon } from "@iconify/react";
import Link from "next/link";

export const NavbarListItem = ({
  text,
  path,
  listRef,
  onClickFunction,
}: {
  text: string;
  path: string;
  listRef: any;
  onClickFunction: () => void;
}) => {
  return (
    <li>
      <Link
        href={path}
        onClick={onClickFunction}
        className="mr-5 flex items-center text-lg font-medium font-poppins"
      >
        <div className="w-5">
          <div ref={listRef} className="hidden">
            <Icon
              icon="foundation:paw"
              color="#8b3479"
              width="20"
              height="20"
            />
          </div>
        </div>
        <span className="cursor-pointer">{text}</span>
      </Link>
    </li>
  );
};

export const MobileNavListItem = ({
  text,
  path,
  onClickFunction,
}: {
  text: string;
  path: string;
  onClickFunction: () => void;
}) => {
  return (
    <li
      className="flex py-4 mx-4 text-lg font-medium text-black font-poppins justify-left"
      onClick={onClickFunction}
    >
      <Link
        href={path ? `/${path}` : "/"}
        className="text-lg font-normal leading-6 text-black"
      >
        {text}
      </Link>
    </li>
  );
};
