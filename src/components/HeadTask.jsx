import React from "react";

export const HeadTask = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-start flex-col">
      <h1 className="text-black text-4xl font-bold text-center mt-7">
        Task Manager
      </h1>
      {children}
    </div>
  );
};
