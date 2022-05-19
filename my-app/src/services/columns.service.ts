import axios from 'axios';
import { API_URL } from '../appConstants/api';
import authHeader from './auth-header';
export interface Icolumn {
  title: string;
  order: number;
}
const createColumns = (boardId: string, column: Icolumn) => {
  return axios.post(`${API_URL}boards/${boardId}/columns`, column, { headers: authHeader() });
};

const getAllColumns = (boardId: string) => {
  return axios.get(`${API_URL}boards/${boardId}/columns`, { headers: authHeader() });
};

const deleteColumns = (boardId: string) => {
  return axios.get(`${API_URL}boards/${boardId}/columns`, { headers: authHeader() });
};

const updateColimns = (boardId: string, columnsId: string, column: Icolumn) => {
  return axios.put(`${API_URL}boards/${boardId}/columns/${columnsId}`, column, {
    headers: authHeader(),
  });
};
const columnsService = {
  createColumns,
  getAllColumns,
  deleteColumns,
  updateColimns,
};

export default columnsService;
