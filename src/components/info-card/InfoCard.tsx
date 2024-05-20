import React, { useState } from "react";
import { Avatar, Button, Card, Progress } from "flowbite-react";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import CardFooter from "@components/card-footer/CardFooter";
import PredictionModal from "@components/info-card/infoModel"; // Import the PredictionModal component

interface InfoCardProps {
  childName: string;
  childProfileUrl: string;
  currentLevel: number;
  totalPlaytime: string;
  status: "online" | "offline" | "busy";
  progress: number;
  snaps: number[];
}

const InfoCard = ({
  childName,
  childProfileUrl,
  currentLevel,
  totalPlaytime,
  status,
  progress,
  snaps
}: InfoCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    // Assuming modalStore is defined somewhere
    // modalStore.setIsOpen(true);
    // modalStore.setTitle(ChildModalType.EDIT_CHILD_PROFILE);
  };

  const handleViewMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="w-full max-w-sm text-sm rounded-2xl">
      {/* card header */}
      <div className="flex items-center space-x-4">
        <Avatar
          rounded
          img={childProfileUrl}
          size="md"
          status={status}
          statusPosition="bottom-right"
        />
        <div className="text-gray-900 font-semibold text-lg">{childName}</div>
      </div>
      {/* game related information */}
      <div>
        <div className="flex gap-1">
          <div>Current Level:</div>
          <div>{currentLevel}</div>
        </div>
        <div className="flex gap-1">
          <div>Total Playtime:</div>
          <div>{totalPlaytime}</div>
        </div>
      </div>
      {/* performance overview */}
      <div className="flex flex-col gap-2">
        <div>Current Level Progress</div>
        <Progress progress={progress} color="dark" />
        <div className="text-xs text-end">{`${progress}%`}</div>
      </div>
      {/* actions */}
      <CardFooter extras="justify-end gap-x-2">
        <Button
          size="xs"
          className="bg-transparent border border-primary-500 text-primary-500 uppercase hover:!bg-primary-500 hover:text-white focus:ring-0"
          type="button"
          onClick={handleEditClick}
        >
          <PencilIcon className="h-3 w-3 mr-2" />
          Edit
        </Button>
        <Button
          size="xs"
          className="bg-transparent border border-primary-500 text-primary-500 uppercase hover:!bg-primary-500 hover:text-white focus:ring-0"
          type="button"
          onClick={handleViewMoreClick}
        >
          <EyeIcon className="h-3 w-3 mr-2" />
          View More
        </Button>
      </CardFooter>
      {/* Prediction Modal */}
      <PredictionModal isOpen={isModalOpen} onClose={handleCloseModal} snaps={snaps} />
    </Card>
  );
};

export default InfoCard;
