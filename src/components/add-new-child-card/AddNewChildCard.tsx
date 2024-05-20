"use client";
import { Avatar, Badge, Button, Card, Progress } from "flowbite-react";
import CardFooter from "@components/card-footer/CardFooter";
import Chart from "@components/chart/Chart";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import multilineChartOptions from "@utils/charts/MultilineChartOptions";
import { modalStore } from "@stores/StoreInitializer";
import { ChildModalType } from "@enums/ModalType";

const AddNewChildCard = () => {
  const handleClick = () => {
    modalStore.setIsOpen(true);
    modalStore.setTitle(ChildModalType.ADD_CHILD_PROFILE);
  };

  return (
    <Card
      className="w-full max-w-sm text-sm rounded-2xl cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="text-center">
        <div className="text-8xl font-thin">+</div>
        <div className="text-lg">Add Child</div>
      </div>
    </Card>
  );
};

export default AddNewChildCard;
