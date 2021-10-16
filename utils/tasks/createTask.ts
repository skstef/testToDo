import { IProject } from "../../models/IProject";
import { v4 as uuidv4 } from "uuid";

export const createTask = (
  projectId: string,
  taskText: string,
  taskId?: string
): void => {
  const projects: IProject[] = JSON.parse(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("projects")) ||
      "[]"
  );

  const project = projects.find(({ id }) => id === projectId);
  if (project) {
    const newTask = { text: taskText, done: false, id: uuidv4() };
    if (taskId) {
      const task = project.tasks.find(({ id }) => id === taskId);
      task?.subTasks.push(newTask);
    } else {
      project.tasks.push({
        ...newTask,
        subTasks: [],
      });
    }
  }

  localStorage.setItem("projects", JSON.stringify(projects));
};
