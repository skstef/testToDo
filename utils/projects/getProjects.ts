import { IProject } from "../../models/IProject";
import { v4 as uuidv4 } from "uuid";

export const getProjects = (): IProject[] => {
  const projects: IProject[] = JSON.parse(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("projects")) ||
      "[]"
  );

  return projects;
};
