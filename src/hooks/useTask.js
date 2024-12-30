/* eslint-disable */
import { useEffect, useState } from "react";
import TaskController from "../controllers/taskController";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/taskSlice";
import Swal from "sweetalert2";

export const useTask = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const {tasks,refresh,idTask} = useSelector((state) => state.tasks)

  useEffect(() => {
    (async () => {
      const task = new TaskController();
      const response = await task.getAllTasks();
      if (response) {
        dispatch(addTask(response));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al cargar las tareas",
          text: response.message,
        });
      }
    })();
  }, [refresh]);



  const filterTasks = async (filter) => {
    const filterTask = new TaskController();
    if (filter === null) {
      const responseAll = await filterTask.getAllTasks(null);
      dispatch(addTask(responseAll));
    } else {
      const response = await filterTask.getAllTasks(filter);
      dispatch(addTask(response));
    }
  };

  return {
    tasks,
    isModalOpen,
    setIsModalOpen,
    filterTasks,
    isModalUpdate,
    setIsModalUpdate,
    idTask,
  };
};
