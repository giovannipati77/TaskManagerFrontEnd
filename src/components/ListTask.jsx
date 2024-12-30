import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdTask, setRefresh } from "../store/taskSlice";
import TaskController from "../controllers/taskController";

export const ListTask = ({ tasks, onEdit }) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state.tasks);

  const handleEdit = (task) => {
    dispatch(
      setIdTask({
        _id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
      })
    );
    onEdit();
  };

  const deleteTasks = async (id) => {
    const deleteResponse = new TaskController();
    const response = await deleteResponse.deleteTask(id);
    if (response) dispatch(setRefresh(!refresh));
  };

  return (
    <div className="w-full h-full mx-auto p-10 max-sm:px-10 bg-gray-200 py-5 rounded-lg">
      {tasks?.length === 0 ? (
        <p className="text-center text-gray-600">No tiene tareas pendientes.</p>
      ) : (
        <ul className="space-y-4">
          {tasks?.map((task) => (
            <li
              key={task?._id}
              className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.createdAt.split("T")[0]}</p>
                <p className="text-lg text-gray-500">
                  {task.completed ? "Completada" : "Pendiente"}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(task)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteTasks(task._id)}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
