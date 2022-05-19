import axios from 'axios';
import { API_URL } from '../appConstants/api';

const register = (name: string, login: string, password: string) => {
  return axios
    .post(API_URL + 'signup', {
      name,
      login,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const login = (login: string, password: string) => {
  return axios
    .post(API_URL + 'signin', {
      login,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
