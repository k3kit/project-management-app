import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://still-dusk-31338.herokuapp.com/';

const getAllUsers = () => {
  return axios.get(API_URL + 'users', { headers: authHeader() });
};

const getUser = (id: string) => {
  return axios.get(API_URL + `users/${id}`, { headers: authHeader() });
};

const deleteUser = (id: string) => {
  return axios.delete(API_URL + `users/${id}`, { headers: authHeader() });
};
const updateUser = (id: string) => {
  return axios.delete(API_URL + `users/${id}`, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};
const userService = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
export default userService;
