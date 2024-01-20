import { createTaskAPI } from "@/apis/taskApi";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddTaskProps {
  getAllTasks: () => Promise<void>;
}

const AddTask: React.FC<AddTaskProps> = ({ getAllTasks }) => {
  const [description, setDescription] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const notify = (error: any) => {
    toast.error(error?.message || "Unexpected Error", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const createTask = async () => {
    if (loadingCreate) return;
    setLoadingCreate(true);
    try {
      await createTaskAPI(description);
      getAllTasks();
    } catch (error) {
      notify(error);
    }
    setLoadingCreate(false);
  };
  return (
    <>
      <div className="join w-[400px]">
        <input
          className="input input-bordered join-item w-full"
          placeholder="Add task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary join-item" onClick={createTask}>
          {!loadingCreate ? (
            <p>Add</p>
          ) : (
            <span className="loading loading-spinner text-neutral" />
          )}
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddTask;
