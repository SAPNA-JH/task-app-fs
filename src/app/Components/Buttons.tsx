import { DoneRound, Trash } from "@/assets";
import Image from "next/image";
import React, { FC, ReactNode } from "react";

const Button: FC<{
  isDeleteButton?: boolean;
  children: ReactNode;
  onClick?: () => void;
}> = ({ isDeleteButton, children, onClick }) => {
  return (
    <div
      className={`${
        isDeleteButton ? " bg-grayBlue" : "bg-blue"
      } text-white px-8 py-3 flex items-center gap-2 rounded-3xl cursor-pointer`}
      onClick={onClick}
    >
      {children}
      <Image
        src={isDeleteButton ? Trash : DoneRound}
        alt="icon"
        height={25}
        width={25}
      />
    </div>
  );
};

export default Button;
