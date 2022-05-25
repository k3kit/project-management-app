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
