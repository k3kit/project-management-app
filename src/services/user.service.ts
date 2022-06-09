import axios from 'axios';
import { API_URL } from '../appConstants/api';
import { IFormEdit } from '../types';
import authHeader from './auth-header';

const getAllUsers = () => {
  return axios.get(API_URL + 'users', { headers: authHeader() });
};

const getUser = (id: string) => {
  return axios.get(API_URL + `users/${id}`, { headers: authHeader() });
};

const deleteUser = (id: string) => {
  return axios.delete(API_URL + `users/${id}`, { headers: authHeader() });
};
const updateUser = (id: string, user: IFormEdit) => {
  return axios.put(API_URL + `users/${id}`, user, { headers: authHeader() });
};

const userService = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
export default userService;
