import { ITask, ISubTask } from "../../models/ITask";
import CheckSvg from "../../assets/check.svg";
import styles from "../../styles/Task.module.css";
import CheckBoxSvg from "../../assets/checkbox.svg";
import CheckedBoxSvg from "../../assets/checkedbox.svg";
import TrashSvg from "../../assets/trash.svg";
import CreateSvg from "../../assets/create.svg";
import React, { useState } from "react";
import { deleteTask } from "../../utils/tasks/deleteTask";
import { updateTask } from "../../utils/tasks/updateTask";
import clsx from "clsx";
import CreateTask from "./CreateTask";

interface ITaskProps {
  task: ITask | ISubTask;
  parentTaskId?: string;
  projectId: string;
  reloadTasks: () => void;
}

const Task: React.FC<ITaskProps> = ({
  task,
  projectId,
  reloadTasks,
  parentTaskId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingSubTask, setIsCreatingSubTask] = useState(false);
  const [newText, setNewText] = useState<string>("");

  const handleFocus = () => {
    setIsEditing(true);
    setNewText(task.text);
  };

  const handleDelete = () => {
    deleteTask(projectId, task.id, parentTaskId);
    reloadTasks();
  };

  const handleNewTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  const handleSubmitEditTaskText = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    updateTask(projectId, task.id, { text: newText }, parentTaskId);
    setIsEditing(false);
    reloadTasks();
  };

  const handleChangeTaskDoneStatus = () => {
    updateTask(projectId, task.id, { done: !task.done }, parentTaskId);
    setIsEditing(false);
    reloadTasks();
  };

  const handleToggleDisplayCreateSubTask = (): void => {
    setIsCreatingSubTask((oldState) => !oldState);
  };

  return (
    <>
      <div className={styles.container}>
        <button
          onClick={handleChangeTaskDoneStatus}
          className={styles.checkBox}
        >
          {task.done ? <CheckedBoxSvg /> : <CheckBoxSvg />}
        </button>
        {isEditing ? (
          <form className={styles.editTask}>
            <input
              onChange={handleNewTextChange}
              value={newText}
              className={styles.editTaskText}
            />
            <button
              type="submit"
              onClick={handleSubmitEditTaskText}
              className={styles.submitEditTask}
            >
              <CheckSvg viewBox="0 0 14 10" />
            </button>
          </form>
        ) : (
          <span
            onClick={handleFocus}
            className={clsx(styles.text, { [styles.textDone]: task.done })}
          >
            {task.text}
          </span>
        )}
        <button onClick={handleDelete} className={styles.trash}>
          <TrashSvg />
        </button>
        {!parentTaskId && (
          <button
            onClick={handleToggleDisplayCreateSubTask}
            className={styles.addSubTask}
          >
            <CreateSvg viewBox="0 0 21 21" />
          </button>
        )}
      </div>

      <div className={styles.subTaskList}>
        {(task as ITask).subTasks &&
          (task as ITask).subTasks.map((subTask) => (
            <Task
              key={subTask.id}
              task={subTask}
              projectId={projectId}
              reloadTasks={reloadTasks}
              parentTaskId={task.id}
            />
          ))}
        {isCreatingSubTask && (
          <CreateTask
            projectId={projectId}
            reloadTasks={reloadTasks}
            taskId={task.id}
          />
        )}
      </div>
    </>
  );
};

export default Task;
