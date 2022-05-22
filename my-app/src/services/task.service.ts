import axios from 'axios';
import { API_URL } from '../appConstants/api';
import authHeader from './auth-header';

const getAllTask = (IdBoard: string, IdColumn: string) => {
  return axios.get(`${API_URL}boards/${IdBoard}/columns/${IdColumn}/tasks`, {
    headers: authHeader(),
  });
};

const TaskService = {
  getAllTask,
};

export default TaskService;
