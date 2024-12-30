import React from "react";

export const ButtonsTask = ({ onClick, children }) => {
  return (
    <div class="grid max-sm:grid-rows-2 md:grid-cols-2 gap-4 lg:grid-cols-4 mx-auto w-full max-sm:px-10 mt-20 mb-5">
      <button
        class=" bg-blue-500 h-14 max-sm:row-start-1 max-sm:row-end-2 max-sm:col-start-1 max-sm:col-end-4 md:col-span-1 col-start-1 col-end-2 col-span-1  text-white px-6 py-3 rounded-lg shadow-lg"
        onClick={onClick}>
        Nueva Tarea
      </button>
      <div class="max-sm:row-start-2 max-sm:row-end-3 max-sm:col-start-1 max-sm:col-end-4  md:col-span-1 col-span-1 lg:col-start-4 lg:col-end-5 text-black">
        {children}
      </div>
    </div>
  );
};
