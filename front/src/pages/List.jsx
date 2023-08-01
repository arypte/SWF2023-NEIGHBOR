import React from "react";

const List = () => {
  return (
    <div className="h-full mb-24 overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <div className="flex justify-around pt-6 pb-6 border-b-2 border-zinc-200">
        <div className="font-bold text-3xl">Categories</div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4 pb-6">
        <div className="text-lg font-bold">List</div>
        <div className="mt-4 flex flex-col gap-6">
          <div className="w-[340px] h-40 bg-neutral-300 rounded-xl">box</div>
          <div className="w-[340px] h-40 bg-neutral-300 rounded-xl">box</div>
          <div className="w-[340px] h-40 bg-neutral-300 rounded-xl">box</div>
          <div className="w-[340px] h-40 bg-neutral-300 rounded-xl">box</div>
        </div>
      </div>
    </div>
  );
};

export default List;
