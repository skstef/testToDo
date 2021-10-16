export interface ISubTask {
  text: string;
  done: boolean;
  id: string;
}

export interface ITask extends ISubTask {
  subTasks: ISubTask[];
}
