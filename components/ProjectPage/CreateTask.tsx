import AddSvg from "../../assets/add.svg";
import React, { useState } from "react";
import { createTask } from "../../utils/tasks/createTask";
import styles from "../../styles/CreateTask.module.css";

interface ICreateTaskProps {
  projectId: string;
  reloadTasks: () => void;
  taskId?: string;
}

const CreateTask: React.FC<ICreateTaskProps> = ({
  projectId,
  reloadTasks,
  taskId,
}) => {
  const [taskText, setTaskText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleSubmitTaskCreation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (taskText.trim().length > 0) {
      setTaskText("");
      createTask(projectId, taskText, taskId);
      reloadTasks();
    }
  };

  return (
    <form className={styles.container}>
      <input
        onChange={handleTextChange}
        value={taskText}
        type="text"
        className={styles.newTaskTitle}
        placeholder={`Type ${taskId ? "sub-task" : "task"} text here`}
      />

      <button
        type="submit"
        onClick={handleSubmitTaskCreation}
        className={styles.button}
      >
        <AddSvg viewBox="0 0 21 21" />
        <span>{`Add ${taskId ? "sub-task" : "task"}`}</span>
      </button>
    </form>
  );
};

export default CreateTask;
