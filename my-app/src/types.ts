import { Icolumn, IcolumnTitle } from './services/columns.service';
export interface IUpdateColumns {
  boardId: string;
  columnsId: string;
  column: IcolumnTitle;
}

export interface ICreateColumn {
  boardId: string;
  column: Icolumn;
}
export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
  index: number;
}

export interface IFormEdit {
  name: string;
  login: string;
  password: string;
}

export interface Jwt {
  iat?: number;
  login?: string;
  userId: string;
}

export interface IBoard {
  title: string;
  description: string;
}
export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
}
export interface ITaskTypeUpdate {
  // id: string;
  title?: string;
  order: number;
  description?: string;
  userId: string;
  boardId: string;
  columnId: string;
}
export interface ITask2 {
  id: string;
  title: string;
  order: number;
  description: string;
  userIds: string;
  boardId: string;
  columnId: string;
}
export interface IcolumnDelete {
  boardId: string;
  columnId: string;
}
export interface ITaskId {
  boardId: string;
  columnId: string;
  taskId: string;
}
export interface ITaskAll {
  boardId: string;
  columnId: string;
}
export interface Task {
  title: string;
  description: string;
  userId: string;
}
export interface ITaskType {
  boardId: string;
  columnsId: string;
  task: Task;
}

export interface boardType {
  id: string;
  title: string;
}
