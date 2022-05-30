import axios from 'axios';
import { API_URL } from '../appConstants/api';
import { ITask, ITaskTypeUpdate, Task } from '../types';
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
  order: number;
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

const updateTask = (boardId: string, columnsId: string, taskId: string, task: ITaskTypeUpdate) => {
  return axios.put(`${API_URL}boards/${boardId}/columns/${columnsId}/tasks/${taskId}`, task, {
    headers: authHeader(),
  });
};

const createTask = (boardId: string, columnId: string, task: Task) => {
  return axios.post(`${API_URL}boards/${boardId}/columns/${columnId}/tasks`, task, {
    headers: authHeader(),
  });
};

const getTaskId = (boardId: string, columnId: string, taskId: string) => {
  return axios.get(`${API_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
    headers: authHeader(),
  });
};
const getAllTask = (boardId: string, columnId: string) => {
  return axios.get(`${API_URL}boards/${boardId}/columns/${columnId}/tasks`, {
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
  getTaskId,
  getAllTask,
  updateTask,
};

export default columnsService;
