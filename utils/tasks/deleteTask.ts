import { IProject } from "../../models/IProject";
export const deleteTask = (
  projectId: string,
  taskId: string,
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
        parentTask.subTasks = parentTask.subTasks.filter(
          ({ id }) => id !== taskId
        );
      }
    } else {
      project.tasks = project.tasks.filter(({ id }) => id !== taskId);
    }
  }

  localStorage.setItem("projects", JSON.stringify(projects));
};
