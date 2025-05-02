import {
  CloseRingDuotone,
  CloseRingDuotone1,
  DoneRound,
  DoneRoundDuotone,
  TimeAtackDuotone,
} from "@/assets";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { icons } from "../lib/helpers";
import Button from "../Components/Buttons";
import db from "../lib/schemaDB";
import toast from "react-hot-toast";

const TaskScreen: FC<{
  setShowAddTask: (value: boolean) => void;
  initialData: any;
}> = ({ setShowAddTask, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    status: "",
  });
  const [hasInitialData, setHasInitialData] = useState<any>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.task,
        description: initialData.description,
        icon: initialData.tag,
        status: initialData.status,
      });
      setHasInitialData(initialData);
    }
  }, [initialData]);

  const handleDelete = () => {
    setFormData({
      title: "",
      description: "",
      icon: "",
      status: "",
    });
    setShowAddTask(false);
    toast.success("Task deleted successfully");
  };
  const handleSave = async () => {
    try {
      if (Object.values(formData).some((field) => field === "")) {
        toast.error("Please fill all the fields");
        return;
      }
      if (hasInitialData) {
        db.tasks
          .update(hasInitialData?.id, {
            id: hasInitialData?.id,
            created_at: hasInitialData?.created_at,
            status: formData.status,
            task: formData.title,
            description: formData.description,
            tag: formData.icon,
          })
          .then(() => {
            toast.success("Task updated successfully");
            setShowAddTask(false);
            setFormData({
              title: "",
              description: "",
              icon: "",
              status: "",
            });
          })
          .catch((e) => {
            console.error(e);
            toast.error("Failed to update task");
          });
      } else {
        const taskCount = await db.tasks.count();
        await db.tasks.add({
          id: taskCount + 1,
          created_at: new Date().toISOString(),
          status: formData.status,
          task: formData.title,
          description: formData.description,
          tag: formData.icon,
        });
        toast.success("Task added successfully");
        setShowAddTask(false);
        setFormData({
          title: "",
          description: "",
          icon: "",
          status: "",
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to add task");
    }
  };

  return (
    <div className=" h-screen w-screen absolute top-0 left-0 flex justify-end items-center z-50 bg-black/50">
      <section className=" bg-white h-[92vh] overflow-y-scroll md:h-[97vh] max-w-4xl md:w-1/2 rounded-lg px-4 py-5 slidein flex flex-col justify-between">
        <header className="flex justify-between items-center">
          <p className="text-2xl font-bold">Task Details</p>
          <div
            className=" flex justify-center h-10 w-10 items-center border-2 border-gray-500/20 rounded-xl"
            onClick={() => setShowAddTask(false)}
          >
            <Image
              src={CloseRingDuotone1}
              alt="logo"
              height={25}
              className=" cursor-pointer"
              width={25}
            />
          </div>
        </header>
        <section
         
          className=" md:h-full"
        >
          <div className="flex flex-col gap-2 my-4">
            <label className=" text-grayBlue" htmlFor="title">
              Task Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Enter Task Name"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              id="title"
              className=" border-2 border-gray-500/20 py-2 rounded-xl px-3 outline-none focus:border-blue"
            />
          </div>

          <div className="flex flex-col gap-2 my-4">
            <label className=" text-grayBlue" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter a short description"
              rows={8}
              className=" border-2 border-gray-500/20 py-2 rounded-xl px-3 outline-none focus:border-blue "
            />
          </div>

          <div className=" flex flex-col gap-2 my-4">
            <label className=" text-grayBlue" htmlFor="icon">
              Icon
            </label>
            <div className=" flex gap-4">
              {icons.map((icon) => (
                <div
                  key={icon.name}
                  className={`${
                    formData.icon === icon.name ? " bg-yellow " : "bg-darkGray "
                  }  flex justify-center items-center rounded-xl p-3 cursor-pointer `}
                  onClick={() => setFormData({ ...formData, icon: icon.name })}
                >
                  <Image
                    src={icon.icon}
                    alt={icon.name}
                    height={30}
                    width={30}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className=" flex flex-col gap-2 my-4">
            <label className=" text-grayBlue" htmlFor="icon">
              Status
            </label>
            <div className=" flex gap-4 flex-wrap">
              <div
                onClick={() =>
                  setFormData({ ...formData, status: "In Progress" })
                }
                className={`${
                  formData.status === "In Progress"
                    ? "border-2 border-blue "
                    : "border-2 border-gray-500/20 "
                }   flex gap-3 justify-between items-center rounded-2xl p-1 w-full md:w-[45%] cursor-pointer`}
              >
                <div className=" flex gap-3 items-center">
                  <div className=" flex h-10 w-10 bg-orange justify-center items-center rounded-xl">
                    <Image
                      src={TimeAtackDuotone}
                      alt="logo"
                      height={30}
                      width={30}
                    />
                  </div>
                  <p>In Progress</p>
                </div>
                {formData.status === "In Progress" && (
                  <div className=" bg-blue h-6 w-6 rounded-full flex justify-center items-center me-3">
                    <Image src={DoneRound} alt="logo" height={15} width={15} />
                  </div>
                )}
              </div>
              <div
                className={`${
                  formData.status === "Completed"
                    ? "border-2 border-blue  "
                    : "border-2 border-gray-500/20 "
                }  flex gap-3 justify-between items-center rounded-2xl p-1 w-full md:w-[45%] cursor-pointer`}
                onClick={() =>
                  setFormData({ ...formData, status: "Completed" })
                }
              >
                <div className=" flex gap-3 items-center">
                  <div className=" flex h-10 w-10 bg-green justify-center items-center rounded-xl">
                    <Image
                      src={DoneRoundDuotone}
                      alt="logo"
                      height={30}
                      width={30}
                    />
                  </div>
                  <p>Completed</p>
                </div>
                {formData.status === "Completed" && (
                  <div className=" bg-blue h-6 w-6 rounded-full flex justify-center items-center me-3">
                    <Image src={DoneRound} alt="logo" height={15} width={15} />
                  </div>
                )}
              </div>
              <div
                className={`${
                  formData.status === "Won't Do"
                    ? "border-2 border-blue "
                    : "border-2 border-gray-500/20 "
                }  flex gap-3 items-center justify-between rounded-2xl p-1 w-full md:w-[45%] cursor-pointer`}
                onClick={() => setFormData({ ...formData, status: "Won't Do" })}
              >
                <div className=" flex gap-3 items-center">
                  {" "}
                  <div className=" flex h-10 w-10 bg-red justify-center items-center rounded-xl">
                    {" "}
                    <Image
                      src={CloseRingDuotone}
                      alt="logo"
                      height={30}
                      width={30}
                    />
                  </div>
                  <p>Won't Do</p>
                </div>
                {formData.status === "Won't Do" && (
                  <div className=" bg-blue h-6 w-6 rounded-full flex justify-center items-center me-3">
                    <Image src={DoneRound} alt="logo" height={15} width={15} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <div className=" flex justify-end gap-4 me-5 mb-4">
          <Button isDeleteButton={true} onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </section>
    </div>
  );
};

export default TaskScreen;
