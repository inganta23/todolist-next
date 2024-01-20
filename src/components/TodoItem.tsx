import React, { useEffect, useState } from "react";
import Trash from "../../public/trash.svg";
import Image from "next/image";
import { deleteTaskAPI, editTaskAPI } from "@/apis/taskApi";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TodoItemProps {
  id: string;
  description: string;
  completed: boolean;
  getAllTasks: () => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  description,
  completed,
  getAllTasks,
}) => {
  const [itemDesc, setItemDesc] = useState("");
  const [itemCompleted, setItemCompleted] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isEdit, setisEdit] = useState(false);

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

  const handleCompleted = async () => {
    if (loadingEdit) return;
    setItemCompleted(!itemCompleted);
    await handleEdit(description, !itemCompleted);
  };

  const handleEditDesc = async () => {
    if (loadingEdit) return;
    await handleEdit(itemDesc, completed);
    setisEdit(false);
  };

  const handleEdit = async (description: string, completed: boolean) => {
    if (loadingEdit) return;
    setLoadingEdit(true);
    try {
      await editTaskAPI({
        id: id,
        description: description,
        completed: completed,
      });
      await getAllTasks();
    } catch (error: any) {
      notify(error);
    }
    setLoadingEdit(false);
  };

  const handleDelete = async () => {
    if (loadingDelete) return;
    setLoadingDelete(true);
    try {
      await deleteTaskAPI(id);
      await getAllTasks();
    } catch (error) {
      notify(error);
    }
    setLoadingDelete(false);
  };

  const handleCloseEdit = () => {
    setisEdit(false);
    setItemDesc(description);
  };

  useEffect(() => {
    setItemCompleted(completed);
    setItemDesc(description);
  }, [description, completed]);

  return (
    <div
      className={`flex w-[400px] shadow-md rounded-md ${
        itemCompleted ? "bg-gray-200" : "bg-white"
      }`}
    >
      {!isEdit && (
        <div className="border-r-2 p-2 w-1/5">
          {!loadingEdit ? (
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={itemCompleted}
              onChange={handleCompleted}
            />
          ) : (
            <span className="loading loading-spinner text-primary" />
          )}
        </div>
      )}
      <div className="p-2 flex w-full justify-between itema-center gap-2">
        <div onClick={() => setisEdit(true)} className="w-2/3">
          <input
            type="text"
            readOnly={!isEdit}
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
            className={`outline-0 w-full bg-transparent ${
              itemCompleted ? "line-through" : ""
            }`}
          />
        </div>
        {!isEdit ? (
          <div className="flex items-center gap-3">
            <button className="w-5" onClick={handleDelete}>
              {!loadingDelete ? (
                <Image src={Trash} alt="delete" />
              ) : (
                <span className="loading loading-spinner text-neutral" />
              )}
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="btn btn-sm btn-primary" onClick={handleEditDesc}>
              {!loadingEdit ? (
                <p>Save</p>
              ) : (
                <span className="loading loading-spinner text-neutral" />
              )}
            </button>
            <button
              className="btn btn-sm btn-neutral"
              onClick={handleCloseEdit}
            >
              {!loadingEdit ? (
                <p>Close</p>
              ) : (
                <span className="loading loading-spinner text-primary" />
              )}
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoItem;
