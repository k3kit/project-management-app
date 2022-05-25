import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Auth';
import messageReducer from './slices/Message';
import modalReducer from './slices/header';
import userReducer from './slices/user';
import boardReducer from './slices/boards';
import columnsReducer from './slices/columns';
const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  modalReducer,
  userReducer,
  boardReducer,
  columnsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
