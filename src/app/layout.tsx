"use client";

import "@styles/globals.scss";
import { Flowbite } from "flowbite-react";
import { brainboostersTheme } from "flowbite-theme-config";
import { usePathname } from "next/navigation";
import PrimaryNavbar from "@widgets/navigation/primary-navbar/PrimaryNavbar";
import SideNavigation from "@widgets/navigation/side-navigation/SideNavigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routeList = ["/", "/children", "/tasks", "/poses", "/quiz", "/focus"];
  const path = usePathname();

  return (
    <html lang="en">
      <Flowbite theme={{ theme: brainboostersTheme }}>
        <body className="flex items-start">
          <div
            className={`w-1/6 ${
              routeList.includes(path ?? "/") ? "block" : "hidden"
            }`}
          >
            <SideNavigation />
          </div>
          <div
            className={
              routeList.includes(path ?? "/") ? "w-5/6 pl-10" : "w-full"
            }
          >
            <div
              className={
                path === "/sign-in" || path === "/sign-up" ? "hidden" : "block"
              }
            >
              <PrimaryNavbar />
            </div>
            {children}
          </div>
        </body>
      </Flowbite>
    </html>
  );
}
