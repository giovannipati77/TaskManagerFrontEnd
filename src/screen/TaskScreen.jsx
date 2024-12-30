import React from "react";
import { HeadTask } from "../components/HeadTask";
import { ButtonsTask } from "../components/ButtonsTask";
import { ListTask } from "../components/ListTask";
import ModalTask from "../components/ModalTask";
import { useTask } from "../hooks/useTask";
import { FilterTask } from "../components/FilterTask";
import ModalUpdate from "../components/ModalUpdate";

const TaskScreen = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    tasks,
    filterTasks,
    isModalUpdate,
    setIsModalUpdate,
    idTask,
  } = useTask();
  return (
    <div className="container  bg-opacity-40 rounded-lg items-center justify-start mx-auto">
      <HeadTask>
        <ButtonsTask
          onClick={() => {
            setIsModalOpen(true);
          }}>
          <FilterTask onFilterChange={filterTasks} />
        </ButtonsTask>
        <ListTask
          tasks={tasks}
          onEdit={() => setIsModalUpdate(true)}
        />
        <ModalTask isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <ModalUpdate
          onClose={() => setIsModalUpdate(false)}
          isOpen={isModalUpdate}
          task={idTask}
        />
      </HeadTask>
    </div>
  );
};

export default TaskScreen;
