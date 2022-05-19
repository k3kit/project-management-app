import { Icolumn } from './services/columns.service';

export interface IUpdateColumns {
  boardId: string;
  columnsId: string;
  column: Icolumn;
}

export interface ICreateColumn {
  boardId: string;
  column: Icolumn;
}
export interface IColumn {
  id: string;
  title: string;
  order: number;
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
