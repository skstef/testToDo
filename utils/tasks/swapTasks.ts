import { IProject } from "../../models/IProject";

export const swapTasks = (
  projectId: string,
  sourceIndex: number,
  destinationIndex: number
) => {
  const projects: IProject[] = JSON.parse(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("projects")) ||
      "[]"
  );

  const project = projects.find(({ id }) => id === projectId);

  const tasks = project?.tasks;

  if (tasks) {
    const [reorderedItem] = tasks.splice(sourceIndex, 1);
    tasks.splice(destinationIndex, 0, reorderedItem);
  }

  localStorage.setItem("projects", JSON.stringify(projects));
};
