import React from "react";

export const HeadTask = ({ children }) => {
  return (
    <div class="h-screen flex items-center justify-start flex-col">
      <h1 class="text-black text-4xl font-bold text-center mt-7">
        Task Manager
      </h1>
      {children}
    </div>
  );
};
