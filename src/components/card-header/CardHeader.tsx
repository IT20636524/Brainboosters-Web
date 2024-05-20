import { Tooltip } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ICardHeader from "./ICardHeader";

const CardHeader = ({
  title,
  tooltipContent,
  tooltipPlacement = "auto",
}: ICardHeader) => {
  return (
    <div className="flex items-center">
      <h1 className="text-xl font-semibold text-black mr-1">{title}</h1>
      <Tooltip
        content={tooltipContent}
        style="light"
        className="text-gray-400"
        placement={tooltipPlacement}
      >
        <InformationCircleIcon className="h-5 w-5 font-semibold stroke-2 text-primary-500" />
      </Tooltip>
    </div>
  );
};

export default CardHeader;
