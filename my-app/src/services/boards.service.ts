import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://still-dusk-31338.herokuapp.com/';

const getAllBoards = () => {
  return axios.get(API_URL + 'boards', { headers: authHeader() });
};

const createBoard = (title: string) => {
  return axios.post(API_URL + 'boards', { title }, { headers: authHeader() });
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
