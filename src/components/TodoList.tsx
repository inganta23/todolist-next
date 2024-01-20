import { createTaskAPI, getAllTasksAPI, swapOrder } from "@/apis/taskApi";
import React, { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import AddTask from "./AddTask";
import SortItem from "./SortItem";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskType {
  id: string;
  description: string;
  createdAt: string;
  completed: boolean;
  updatedAt: string;
}

const TodoList = () => {
  const [alltasks, setAllTasks] = useState<TaskType[] | []>([]);
  const [loadingGet, setloadingGet] = useState(false);
  const dragBox = useRef(0);
  const draggedOverBox = useRef(0);

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

  const getAllTasks = async (sortType?: string, direction?: boolean) => {
    if (loadingGet) return;
    setloadingGet(true);
    try {
      const res = await getAllTasksAPI(sortType, direction);
      setAllTasks([...res.data]);
    } catch (error) {
      notify(error);
    }
    setloadingGet(false);
  };

  const handleSort = async () => {
    try {
      const firstId = alltasks[dragBox.current].id;
      const secondId = alltasks[draggedOverBox.current].id;
      await swapOrder({ firstId, secondId });
      await getAllTasks();
    } catch (error) {
      notify(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="flex flex-col items-center pt-6">
      <h2 className="text-2xl font-bold">Todo List</h2>
      <div className="my-3">
        <AddTask getAllTasks={getAllTasks} />
        <SortItem getAllTasks={getAllTasks} />
      </div>
      {loadingGet ? (
        <span className="loading loading-dots loading-md" />
      ) : (
        <>
          {alltasks.map((task: TaskType, index: number) => (
            <div
              key={task.id}
              className="my-2 cursor-pointer"
              draggable
              onDragStart={() => (dragBox.current = index)}
              onDragEnter={() => (draggedOverBox.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <TodoItem
                id={task.id}
                completed={task.completed}
                description={task.description}
                getAllTasks={getAllTasks}
              />
            </div>
          ))}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default TodoList;
