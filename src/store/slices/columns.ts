import { Satellite } from '@mui/icons-material';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { string } from 'yup/lib/locale';

import columnsService from '../../services/columns.service';
import {
  IColumn,
  IcolumnDelete,
  IColumnType,
  ICreateColumn,
  ITask,
  ITask2,
  ITaskAll,
  ITaskId,
  ITaskType,
  ITaskTypeDrag,
  ITaskTypeUpdate,
  IUpdateColumns,
} from '../../types';

export const createColumns = createAsyncThunk(
  'columns/add',
  async ({ boardId, column }: ICreateColumn, ThunkAPI) => {
    try {
      const response = await columnsService.createColumns(boardId, column);
      return response.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getColumns = createAsyncThunk('columns/all', async (boardId: string, ThunkAPI) => {
  try {
    const response = await columnsService.getAllColumns(boardId);
    return response.data;
  } catch (error) {
    ThunkAPI.rejectWithValue(error);
  }
});

export const updateTitleColumns = createAsyncThunk(
  'columns/updateTitle',
  async ({ boardId, columnsId, column }: IUpdateColumns, ThunkAPI) => {
    try {
      const response = await columnsService.updateColums(boardId, columnsId, column);
      return response.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const updateColumns = createAsyncThunk(
  'columns/update',
  async ({ boardId, columnsId, column }: IUpdateColumns, ThunkAPI) => {
    try {
      const response = await columnsService.updateColums(boardId, columnsId, column);
      return response.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColums = createAsyncThunk(
  'columns/delete',
  async ({ boardId, columnId }: IcolumnDelete, ThunkAPI) => {
    try {
      await columnsService.deleteColumns(boardId, columnId);
      return columnId;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getColumnById = createAsyncThunk(
  'columns/id',
  async ({ boardId, columnId }: IcolumnDelete, ThunkAPI) => {
    try {
      const respons = await columnsService.getColumnId(boardId, columnId);
      return respons.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const addTask = createAsyncThunk(
  'task/add',
  async ({ boardId, columnsId, task }: ITaskType, ThunkAPI) => {
    try {
      const respons = await columnsService.createTask(boardId, columnsId, task);
      return respons.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getTaskById = createAsyncThunk(
  'task/id',
  async ({ boardId, columnId, taskId }: ITaskId, ThunkAPI) => {
    try {
      const respons = await columnsService.getTaskId(boardId, columnId, taskId);
      return respons.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllTask = createAsyncThunk(
  'task/all',
  async ({ boardId, columnId }: ITaskAll, ThunkAPI) => {
    try {
      const respons = await columnsService.getAllTask(boardId, columnId);
      console.log(respons.data);
      return respons.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/update',
  async ({ boardId, columnsId, taskId, task }: IUpdateTask, ThunkAPI) => {
    try {
      const response = await columnsService.updateTask(boardId, columnsId, taskId, task);
      return response.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);
interface ITaskDelete {
  boardId: string;
  columnId: string;
  taskId: string;
}
export const deleteTask = createAsyncThunk(
  'taskdel',
  async ({ boardId, columnId, taskId }: ITaskDelete, ThunkAPI) => {
    try {
      await columnsService.deleteTask(boardId, columnId, taskId);
      return { columnId: columnId, taskId };
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export interface IUpdateTask {
  boardId: string;
  columnsId: string;
  taskId: string;
  task: ITaskTypeUpdate;
}

interface ColumnState {
  columns: IColumn[];
  isLoading: boolean;
  dialog: boolean;
  fade: boolean;
  taskInfo: ITask[];
  error: string;
}

const initialState: ColumnState = {
  columns: [],
  isLoading: false,
  dialog: false,
  fade: false,
  error: '',
  taskInfo: [],
};

type setNewOrderTasksType = {
  columnId: string;
  tasks: TaskType[];
};

export type TaskType = {
  order: number;
  id: string;
  title: string;
  description: string;
  userId: string;
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setOpen(state: { dialog: boolean }, action: PayloadAction<boolean>) {
      state.dialog = action.payload;
    },
    orderColumn: (state: { columns: IColumnType[] }, action: PayloadAction<IColumnType[]>) => {
      state.columns = [...action.payload];
    },
    orderTask: (state, action: PayloadAction<setNewOrderTasksType>) => {
      const column = [...state.columns.filter((item) => item.id === action.payload.columnId)];
      column[0].tasks = action.payload.tasks.sort((a, b) => a.order - b.order);
    },
  },
  extraReducers: {
    [createColumns.fulfilled.type]: (state, action) => {
      state.columns.push(action.payload);
    },
    [createColumns.pending.type]: (state, action) => {
      state.fade = true;
    },
    [getColumns.fulfilled.type]: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
      state.fade = true;
      state.isLoading = false;
    },
    [getColumns.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [updateTitleColumns.fulfilled.type]: (state, action) => {
      const index = state.columns.findIndex((columns) => columns.id === action.payload.id);
      state.columns[index].title = action.payload.title;
    },
    [deleteColums.fulfilled.type]: (state, action) => {
      state.columns = state.columns.filter((column) => column.id !== action.payload);
      state.fade = true;
    },
    [deleteTask.fulfilled.type]: (state, action) => {
      const index = state.columns.findIndex((columns) => columns.id === action.payload.columnId);
      state.columns[index].tasks.filter((task) => task.id !== action.payload.taskId);
    },
    [deleteColums.pending.type]: (state, action) => {
      state.fade = false;
    },
    [getColumnById.fulfilled.type]: (state, action: PayloadAction<IColumn>) => {
      const index = state.columns.findIndex((columns) => columns.id === action.payload.id);
      state.columns[index].tasks = action.payload.tasks;
      state.fade = true;
    },
    [getColumnById.pending.type]: (state, action) => {
      state.isLoading = true;
      state.fade = false;
    },
    [getTaskById.fulfilled.type]: (state, action) => {
      state.taskInfo = action.payload;
    },
    [getAllTask.fulfilled.type]: (state, action: PayloadAction<IColumn>) => {},
    [updateTask.rejected.type]: (state, action) => {
      state.error = action.payload;
    },
    [addTask.fulfilled.type]: (state, action) => {
      const column = state.columns.find(({ id }) => id === action.payload.columnId);
      column?.tasks.push({
        id: action.payload.id,
        title: action.payload.title,
        order: action.payload.order,
        description: action.payload.description,
        userId: action.payload.userId,
      });
    },
  },
});
export default columnsSlice.reducer;
