import axios from 'axios';
import { StringMappingType } from 'typescript';
import authHeader from './auth-header';
const API_URL = 'https://still-dusk-31338.herokuapp.com/boards/';

const createColumns = (title: string, boardId: string) => {
  return axios.post(`${API_URL}${boardId}/columns`, { title }, { headers: authHeader() });
};

const getAllColumns = (boardId: string) => {
  return axios.get(`${API_URL}${boardId}/columns`, { headers: authHeader() });
};

const deleteColumns = (boardId: string) => {
  return axios.get(`${API_URL}${boardId}/columns`, { headers: authHeader() });
};

export interface IColum {
  title: string;
  order: number;
}
const updateColimns = (boardId: string, columnsId: string, column: IColum) => {
  return axios.put(`${API_URL}${boardId}/columns/${columnsId}`, column, { headers: authHeader() });
};
const columnsService = {
  createColumns,
  getAllColumns,
  deleteColumns,
  updateColimns,
};

export default columnsService;
