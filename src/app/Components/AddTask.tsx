"use client";
import { AddRoundDuotone } from "@/assets";
import Image from "next/image";
import React from "react";

const AddTask: React.FC<{
  setShowAddTask: (value: boolean) => void;
  showAddTask: boolean;
}> = ({ setShowAddTask, showAddTask }) => {
  return (
    <div
      className=" flex  items-center gap-7 bg-peach h-20 px-3 py-4 rounded-xl cursor-pointer mb-2 shadow-md"
      onClick={() => setShowAddTask(!showAddTask)}
    >
      <div className=" h-12 w-12 rounded-xl bg-orange  flex justify-center items-center">
        <Image src={AddRoundDuotone} alt="add" height={40} width={40} />
      </div>
      <p className=" text-lg font-semibold">Add new Task</p>
    </div>
  );
};

export default AddTask;
