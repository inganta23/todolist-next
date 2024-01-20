import axios from "axios";
const TASK_URL = `${process.env.NEXT_PUBLIC_API_URL}/task`;

interface EditBodyType {
  description: string;
  id: string;
  completed?: boolean;
}

interface SwapBodyType {
  firstId: string;
  secondId: string;
}

const getAllTasksAPI = async (
  sortType: string = "createdAt",
  direction?: boolean
) => {
  const newDirection = direction ? "-" : "";
  const res = await axios.get(`${TASK_URL}?order=${newDirection}${sortType}`);
  return res;
};

const createTaskAPI = async (description: string) => {
  const body = {
    description,
  };
  const res = await axios.post(TASK_URL, body);
  return res;
};

const editTaskAPI = async (editBody: EditBodyType) => {
  const body = editBody;
  const res = await axios.put(TASK_URL, body);
  return res;
};

const deleteTaskAPI = async (id: string) => {
  const res = await axios.delete(`${TASK_URL}?id=${id}`);
  return res;
};

const swapOrder = async (swapBody: SwapBodyType) => {
  const body = swapBody;
  const res = await axios.post(`${TASK_URL}/swap`, body);
  return res;
};

export { getAllTasksAPI, createTaskAPI, editTaskAPI, deleteTaskAPI, swapOrder };
