"use client";

import { Navbar } from "flowbite-react";
import { observer } from "mobx-react-lite";
import AvatarDropdown from "../avatar-dropdown/AvatarDropdown";
import { useEffect, useState } from "react";

const PrimaryNavbar = () => {
  const [username, setUsername] = useState(localStorage.getItem('name'));

  const loadData = () => {
    setUsername(localStorage.getItem('name'))
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <header>
      <Navbar fluid>
        <div className="flex w-full justify-end">
          <AvatarDropdown username={username} />
        </div>
      </Navbar>
    </header>
  );
};

export default observer(PrimaryNavbar);
