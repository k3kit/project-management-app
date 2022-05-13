import { AxiosRequestHeaders } from 'axios';

export default function authHeader(): AxiosRequestHeaders {
  const token = JSON.parse(localStorage.getItem('token') || '');
  if (token) {
    return { Authorization: 'Bearer ' + token.token };
  } else {
    return {};
  }
}

// export default function authHeader(): AxiosRequestHeaders {
//   const minTokenLength = 1;
//   try {
//     const token = localStorage.getItem('token');
//     if (typeof token !== 'string') throw new Error('User info not found');

//     const tokenUsers = JSON.parse(token);
//     if (!(typeof tokenUsers === 'string' && tokenUsers.length >= minTokenLength)) {
//       throw new Error('Invalid user access token');
//     }
//     console.log({ Authorization: 'Bearer ' + tokenUsers });
//     return { Authorization: 'Bearer ' + tokenUsers };
//   } catch {
//     return { er: 'sa' };
//   }
// }
