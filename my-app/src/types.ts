import { Icolumn, IcolumnTitle } from './services/columns.service';
import { ITask } from './store/slices/task';

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
