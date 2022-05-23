import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TaskService from '../../services/task.service';
interface Task {
  IdBoard: string;
  IdColumn: string;
}
export const getTasks = createAsyncThunk(
  'tasks/all',
  async ({ IdBoard, IdColumn }: Task, ThunkAPI) => {
    try {
      const response = await TaskService.getAllTask(IdBoard, IdColumn);
      console.log(response.data);
      return response.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);
export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
}
interface TaskState {
  task: ITask[];
}
const initialState: TaskState = {
  task: [],
};
const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    [getTasks.fulfilled.type]: (state, action) => {
      state.task = action.payload;
    },
  },
});

export default TaskSlice.reducer;
