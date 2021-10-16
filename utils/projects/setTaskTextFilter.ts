import { IProject } from "../../models/IProject";

export const setStorageTasksTextFilter = (
  projectId: string,
  textFilter: string
): void => {
  const projects: IProject[] = JSON.parse(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("projects")) ||
      "[]"
  );

  const project = projects.find(({ id }) => id === projectId);
  if (project) {
    project.taskTextFilter = textFilter;
  }

  localStorage.setItem("projects", JSON.stringify(projects));
};
