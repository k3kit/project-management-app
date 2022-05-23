import axios from 'axios';
import { API_URL } from '../appConstants/api';
import { ITask } from '../store/slices/task';
import authHeader from './auth-header';
export interface Icolumn {
  title: string;
}
export interface IcolumnTitle {
  title: string;
  order: number;
}
export interface IcolumnTask {
  id: string;
  title: string;
  order: 1;
  tasks: ITask[];
}
const createColumns = (boardId: string, column: Icolumn) => {
  return axios.post(`${API_URL}boards/${boardId}/columns`, column, { headers: authHeader() });
};

const getAllColumns = (boardId: string) => {
  return axios.get(`${API_URL}boards/${boardId}/columns`, { headers: authHeader() });
};
const getColumnId = (boardId: string, columnId: string) => {
  return axios.get(`${API_URL}boards/${boardId}/columns/${columnId}`, {
    headers: authHeader(),
  });
};

const deleteColumns = (boardId: string, columnId: string) => {
  return axios.delete(`${API_URL}boards/${boardId}/columns/${columnId}`, { headers: authHeader() });
};

const updateColums = (boardId: string, columnsId: string, column: IcolumnTitle) => {
  return axios.put(`${API_URL}boards/${boardId}/columns/${columnsId}`, column, {
    headers: authHeader(),
  });
};

export interface Task {
  title: string;
  description: string;
  userId: string;
}
const createTask = (boardId: string, columnId: string, task: Task) => {
  return axios.post(`${API_URL}boards/${boardId}/columns/${columnId}/tasks`, task, {
    headers: authHeader(),
  });
};

const columnsService = {
  createColumns,
  getAllColumns,
  deleteColumns,
  updateColums,
  getColumnId,
  createTask,
};

export default columnsService;
// https://calm-savannah-72235.herokuapp.com/boards/eead8be7-cbf6-43d2-9b4e-90572185e3d1/columns/35474d6b-0305-4764-93ae-a8598f24ab98/tasks
// https://calm-savannah-72235.herokuapp.com/boards/eead8be7-cbf6-43d2-9b4e-90572185e3d1/columns/35474d6b-0305-4764-93ae-a8598f24ab98/tasks
