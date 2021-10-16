import { IProject } from "../../models/IProject";
import { v4 as uuidv4 } from "uuid";

export const getProject = (projectId: string): IProject | undefined => {
  const projects: IProject[] = JSON.parse(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("projects")) ||
      "[]"
  );

  return projects.find(({ id }) => id === projectId);
};
