import React from "react";
import ICardFooter from "./ICardFooter";

const CardFooter = ({ children, extras }: ICardFooter) => {
  return (
    <div
      className={[
        "border-t border-t-gray-200 pt-4 mt-2 flex items-center",
        `${extras}`,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default CardFooter;
