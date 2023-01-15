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
      <Link href={path}>
        <a
          onClick={onClickFunction}
          className="flex items-center mr-5 text-lg font-medium font-poppins"
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
        </a>
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
      <Link href={"/" + path}>
        <a className="text-lg font-normal leading-6 text-black" href="#">
          {text}
        </a>
      </Link>
    </li>
  );
};
