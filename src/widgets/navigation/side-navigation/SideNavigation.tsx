"use client";

import { Sidebar, Button } from "flowbite-react";
import {
  ClipboardDocumentCheckIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";

const sidebarItems = [
  {
    label: "Analytics",
    icon: DocumentCheckIcon,
    href: "/",
  },
  {
    label: "Player Records",
    icon: DocumentCheckIcon,
    href: "/focus",
  },
  {
    label: "Pose Records",
    icon: DocumentCheckIcon,
    href: "/poses",
  },
  {
    label: "Quiz Records",
    icon: DocumentCheckIcon,
    href: "/quiz",
  },
  {
    label: "Task Management",
    icon: DocumentCheckIcon,
    href: "/tasks",
  },
  {
    label: "Children",
    icon: DocumentCheckIcon,
    href: "/children",
  },
];

const sideBarSettingsItems = [
  {
    label: "Contact Us",
    icon: LifebuoyIcon,
    href: "/contact",
  },
  {
    label: "FAQ",
    icon: ClipboardDocumentCheckIcon,
    href: "/faq",
  },
];

const SideNavigation = () => {
  return (
    <div className="md:block hidden h-screen fixed">
      <Sidebar>
        <div className="flex h-full flex-col justify-between">
          <Sidebar.Logo href="/" img="" imgAlt="">
            <p>BrainBoosters</p>
          </Sidebar.Logo>
          <Sidebar.Items className="h-1/3 flex flex-col justify-between">
            <Sidebar.ItemGroup>
              {sidebarItems.map((sidebarItem) => (
                <Sidebar.Item
                  key={sidebarItem.label}
                  href={sidebarItem.href}
                  icon={sidebarItem.icon}
                >
                  {sidebarItem.label}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {sideBarSettingsItems.map((sidebarItem) => (
                <Sidebar.Item
                  key={sidebarItem.label}
                  href={sidebarItem.href}
                  icon={sidebarItem.icon}
                >
                  {sidebarItem.label}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
          <div className="flex flex-col items-center">
            <Button
              href="/sign-in"
              className="mb-4"
              outline
              gradientDuoTone="purpleToBlue"
            >
              Switch Account
            </Button>
            <div className="text-xs font-extralight">
              Copyright &copy; {new Date().getFullYear()}. All rights reserved.
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideNavigation;
