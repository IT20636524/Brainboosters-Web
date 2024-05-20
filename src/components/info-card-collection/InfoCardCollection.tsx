"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoCard from "@components/info-card/InfoCard";
import AddNewChildCard from "@components/add-new-child-card/AddNewChildCard";
import { observer } from "mobx-react-lite";
import { IChild } from "@interfaces/models/IUser";
import { variables } from "src/env/env";

const InfoCardCollection = () => {
  const [children, setChildren] = useState<IChild[]>([]);

  useEffect(() => {
    // Fetch children data from the API endpoint
    const fetchChildren = async () => {
      try {
        const response = await axios.get(`${variables.server}/api/child`);
        setChildren(response.data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, []);

  const nameFormatter = (fName: string, lName: string): string =>
    [fName, lName].join(" ");

  const timeFormatter = (time: number): string => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-x-3 flex-wrap">
      <AddNewChildCard />
      {children.map((child: IChild) => (
        <InfoCard
          key={child.id}
          childName={nameFormatter(child?.firstName, child?.lastName)}
          childProfileUrl={child?.profileImage ?? ""}
          currentLevel={1}
          totalPlaytime={timeFormatter(child?.previousWeekAveragePlaytime ?? 0)}
          status={child.status as "online" | "offline" | "busy"}
          progress={child.progressInCurrentLevel ?? 0}
          snaps={child}
        />
      ))}
      
    </div>
  );
};

export default observer(InfoCardCollection);
