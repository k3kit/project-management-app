import axios from 'axios';
const API_URL = 'https://still-dusk-31338.herokuapp.com/';
type registerType = {
  name: string;
  login: string;
  password: string;
};
const register = (name: string, login: string, password: string) => {
  return axios.post(API_URL + 'signup', {
    name,
    login,
    password,
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
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
