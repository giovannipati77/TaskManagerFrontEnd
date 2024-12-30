import React, { useState } from "react";
import TaskController from "../controllers/taskController";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../store/taskSlice";

const ModalTask = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.tasks.refresh);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
  });

  if (!isOpen) return null;

  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitTask = async (e) => {
    e.preventDefault();
    const task = new TaskController();
    const response = await task.createTask(
      formData.titulo,
      formData.descripcion
    );

    if (response) {
      onClose();
      setFormData({
        titulo: "",
        descripcion: "",
      });
    }
    dispatch(setRefresh(!refresh));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 m-2"
          onClick={onClose}>
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Agregar Nueva Tarea</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Titulo
            </label>
            <input
              type="text"
              id="titulo"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              placeholder="Ingresa un titulo para la tarea"
              value={formData.titulo}
              onChange={inputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700">
              Descripcion
            </label>
            <textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={inputChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              placeholder="Ingresa una descripcion para la tarea"></textarea>
          </div>
          <button
            type="submit"
            onClick={submitTask}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md ">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalTask;
