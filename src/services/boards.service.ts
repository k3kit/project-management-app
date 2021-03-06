import axios from 'axios';
import { API_URL } from '../appConstants/api';
import { IBoard } from '../types';
import authHeader from './auth-header';

const getAllBoards = () => {
  return axios.get(API_URL + 'boards', { headers: authHeader() });
};

const createBoard = (board: IBoard) => {
  return axios.post(API_URL + 'boards', board, { headers: authHeader() });
};

const boardById = (id: string) => {
  return axios.get(API_URL + 'boards/' + id, {
    headers: authHeader(),
  });
};

const deleteBoard = (id: string) => {
  return axios.delete(API_URL + 'boards/' + id, { headers: authHeader() });
};

const updateBoard = (id: string, title: string) => {
  return axios.put(API_URL + 'boards/' + id), { title }, { headers: authHeader() };
};
const boardsService = {
  getAllBoards,
  createBoard,
  boardById,
  deleteBoard,
  updateBoard,
};

export default boardsService;
