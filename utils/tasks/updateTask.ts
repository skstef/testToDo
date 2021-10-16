import { IProject } from "../../models/IProject";
export const updateTask = (
  projectId: string,
  taskId: string,
  updatedTask: { text?: string; done?: boolean },
  parentTaskId?: string
): void => {
  const projects: IProject[] = JSON.parse(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("projects")) ||
      "[]"
  );

  const project = projects.find(({ id }) => id === projectId);
  if (project) {
    if (parentTaskId) {
      const parentTask = project.tasks.find(({ id }) => id === parentTaskId);
      if (parentTask) {
        const task = parentTask.subTasks.find(({ id }) => id === taskId);
        Object.assign(task, updatedTask);
      }
    } else {
      const task = project.tasks.find(({ id }) => id === taskId);
      Object.assign(task, updatedTask);
    }
  }

  localStorage.setItem("projects", JSON.stringify(projects));
};
