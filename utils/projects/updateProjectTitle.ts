import { IProject } from "../../models/IProject";
import { v4 as uuidv4 } from "uuid";

export const updateProjectTitle = (
  projectId: string,
  newTitle: string
): void => {
  const projects: IProject[] = JSON.parse(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("projects")) ||
      "[]"
  );

  const project = projects.find(({ id }) => id === projectId);
  if (project) {
    project.title = newTitle;
  }

  localStorage.setItem("projects", JSON.stringify(projects));
};
