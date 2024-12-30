import React, { useState, useEffect } from "react";
import TaskController from "../controllers/taskController";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../store/taskSlice";

const ModalUpdate = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.tasks.refresh);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    completed: false,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        titulo: task.title,
        descripcion: task.description,
        completed: task.completed,
      });
    }
  }, [task]);

  if (!isOpen) return null;

  const inputChange = (e) => {
    if (e.target.id === "completed") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value === "true",
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const submitTask = async (e) => {
    e.preventDefault();
    const taskController = new TaskController();
    const response = await taskController.updateTasks(
      task._id,
      formData.titulo,
      formData.descripcion,
      formData.completed
    );
    if (!response.isConfirmed) {
      onClose();
      setFormData({
        titulo: "",
        descripcion: "",
        completed: false,
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
        <h2 className="text-xl font-bold mb-4">Actualizar Tarea</h2>
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
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              id="completed"
              value={formData.completed}
              onChange={inputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2">
              <option value={true}>Completada</option>
              <option value={false}>Pendiente</option>
            </select>
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
