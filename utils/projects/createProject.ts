import { IProject } from "../../models/IProject";
import { v4 as uuidv4 } from "uuid";

export const createProject = (title: string): void => {
  const projects: IProject[] = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("projects")) || "[]"
  );

  projects.unshift({
    id: uuidv4(),
    title,
    tasks: [],
  });

  localStorage.setItem("projects", JSON.stringify(projects));
};
