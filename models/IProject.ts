import { ITask } from "./ITask";

export interface IProject {
  id: string;
  title: string;
  tasks: ITask[];
  taskTextFilter?: string;
}
