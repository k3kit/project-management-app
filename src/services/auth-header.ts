import { AxiosRequestHeaders } from 'axios';

export default function authHeader(): AxiosRequestHeaders {
  const token = JSON.parse(localStorage.getItem('token') || '');
  if (token) {
    return { Authorization: 'Bearer ' + token.token };
  } else {
    return {};
  }
}
