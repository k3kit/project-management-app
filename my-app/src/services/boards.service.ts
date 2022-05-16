import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://still-dusk-31338.herokuapp.com/boards/';

const getAllBoards = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createBoard = (title: string) => {
  return axios.post(API_URL, { title }, { headers: authHeader() });
};

const boardById = (id: string) => {
  return axios.get(API_URL + id, {
    headers: authHeader(),
  });
};

const deleteBoard = (id: string) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const updateBoard = (id: string, title: string) => {
  return axios.put(API_URL + id, { title }, { headers: authHeader() });
};
const boardsService = {
  getAllBoards,
  createBoard,
  boardById,
  deleteBoard,
  updateBoard,
};

export default boardsService;
