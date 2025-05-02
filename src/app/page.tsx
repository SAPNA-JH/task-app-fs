"use client";

import Image from "next/image";
import { EditDuotone, Logo, Trash } from "@/assets/index";
import AddTask from "./Components/AddTask";
import { use, useEffect, useState } from "react";
import TaskScreen from "./Pages/TaskScreen";
import { useLiveQuery } from "dexie-react-hooks";
import db from "./lib/schemaDB";
import { icons } from "./lib/helpers";
import toast from "react-hot-toast";

export default function Home() {
  const [currentIndex, setcurrentIndex] = useState(-1);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const tasks = useLiveQuery(() => db.tasks.toArray());
  return (
    <div className="h-screen w-screen relative ">
      <main className="  h-screen w-screen py-5 flex flex-col max-w-4xl  mx-auto">
        <header className="flex justify-center items-enter  flex-col gap-3 my-7">
          <div className="flex  items-center gap-8">
            <Image src={Logo} alt="logo" height={45} width={45} />
            <div className=" flex flex-col gap-1">
              <p className="text-4xl font-light">My Task List</p>
              <p className="text-lg ">Tasks to keep organised</p>
            </div>
            <Image src={EditDuotone} alt="logo" height={25} width={25} />
          </div>
        </header>
        <AddTask setShowAddTask={setShowAddTask} showAddTask={showAddTask} />
        <div className="flex flex-col gap-4 mb-20 mt-4">
          {tasks &&
            tasks.map((task) => (
              <div
                key={task.id}
                className={`${
                  task.status === "In Progress"
                    ? "bg-lightGray"
                    : task.status === "Completed"
                    ? "bg-mint"
                    : "bg-pink"
                } flex  items-center py-3 gap-7 h-20 px-3 rounded-xl   shadow-md`}
                onMouseEnter={() => {
                  setcurrentIndex(task.id);
                  setShowDeleteIcon(true);
                }}
                onMouseLeave={() => {
                  setcurrentIndex(-1);
                  setShowDeleteIcon(false);
                }}
              >
                <div className=" h-12 w-12 rounded-xl bg-white  flex justify-center items-center">
                  <Image
                    src={icons.filter((obj) => obj.name === task.tag)[0].icon}
                    alt="add"
                    height={40}
                    width={40}
                  />
                </div>
                <div
                  className=" flex flex-col gap-0.5 flex-grow cursor-pointer"
                  onClick={() => {
                    setShowAddTask(true);
                    setcurrentIndex(task.id);
                  }}
                >
                  <p className=" text-lg font-semibold">{task.task}</p>
                  <p className=" font-light text-lg">{task.description}</p>
                </div>
                {currentIndex === task.id && showDeleteIcon && (
                  <div
                    className=" p-4 bg-red rounded-xl z-20 cursor-pointer"
                    onClick={() => {
                      db.tasks.delete(task.id);
                      toast.success("Task deleted");
                    }}
                  >
                    <Image src={Trash} alt="delete" height={20} width={20} />
                  </div>
                )}
              </div>
            ))}
        </div>
      </main>
      {showAddTask && (
        <TaskScreen
          initialData={tasks?.filter((task) => task.id === currentIndex)[0]}
          setShowAddTask={setShowAddTask}
        />
      )}
    </div>
  );
}
