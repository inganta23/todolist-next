import React, { useState } from "react";
import ArrowUp from "../../public/arrow_up.svg";
import Image from "next/image";

interface SortItemProps {
  getAllTasks: (sortType?: string, direction?: boolean) => Promise<void>;
}

const SortItem: React.FC<SortItemProps> = ({ getAllTasks }) => {
  const [sort, setSort] = useState({ sortType: "createdAt", direction: false });

  const handleSort = async (type: string) => {
    const sortType = sort.sortType === type && sort.direction ? "" : type;
    const direction = sort.sortType === type ? !sort.direction : false;
    setSort({
      sortType: sortType,
      direction: direction,
    });
    await getAllTasks(sortType, direction);
  };
  return (
    <div className="flex items-center gap-2 justify-center my-3">
      <button
        className="btn btn-xs bg-slate-300 shadow-sm"
        onClick={() => handleSort("id")}
      >
        <div className="flex item-center justify-center gap-2">
          <p>Id</p>
          {sort.sortType === "id" && (
            <Image
              src={ArrowUp}
              alt="sort type"
              className={`w-3  ${!sort.direction ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </button>
      <button
        className="btn btn-xs bg-slate-300 shadow-sm"
        onClick={() => handleSort("description")}
      >
        <div className="flex item-center justify-center gap-2">
          <p>Description</p>
          {sort.sortType === "description" && (
            <Image
              src={ArrowUp}
              alt="sort type"
              className={`w-3 ${!sort.direction ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </button>
      <button
        className="btn btn-xs bg-slate-300 shadow-sm"
        onClick={() => handleSort("createdAt")}
      >
        <div className="flex item-center justify-center gap-2">
          <p>Created At</p>
          {sort.sortType === "createdAt" && (
            <Image
              src={ArrowUp}
              alt="sort type"
              className={`w-3 ${!sort.direction ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </button>
      <button
        className="btn btn-xs bg-slate-300 shadow-sm"
        onClick={() => handleSort("updatedAt")}
      >
        <div className="flex item-center justify-center gap-2">
          <p>Updated At</p>
          {sort.sortType === "updatedAt" && (
            <Image
              src={ArrowUp}
              alt="sort type"
              className={`w-3 ${!sort.direction ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default SortItem;
