import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import IAvatarDropdown from "./IAvatarDropdown";
import Link from "next/link";

const AvatarDropdown = ({ username, isCollapsable }: IAvatarDropdown) => {
  const renderAvatar = () => (
    <div
      className={`shadow-md py-2 px-4 outline outline-slate-100 rounded-full gap-10 items-center
    ${isCollapsable ? "md:hidden flex" : "md:flex hidden"}`}
    >
      <Avatar alt="User settings" rounded />
      <div className={isCollapsable ? "order-2 text-left" : "text-right"}>
        <div
          className={[
            "text-sm text-gray-900 font-semibold",
            username === ""
              ? "bg-gray-300 w-44 h-5 rounded-sm animate-pulse"
              : "",
          ].join(" ")}
        >
          {username}{" "}
        </div>
      </div>
    </div>
  );
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={renderAvatar()}
      className="bg-white rounded-xl w-64"
    >
      <Link href="/profile">
        <Dropdown.Item className="w-full flex gap-6">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          Profile
        </Dropdown.Item>
      </Link>
      <Dropdown.Item
        className="w-full flex gap-6"
        //TODO: onClick={() => authenticationStore.logout()}
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        Billing
      </Dropdown.Item>
      <Link href="/sign-in">
        <Dropdown.Item
          className="w-full flex gap-6"
          //TODO: onClick={() => authenticationStore.logout()}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          Logout
        </Dropdown.Item>
      </Link>
    </Dropdown>
  );
};

export default AvatarDropdown;
