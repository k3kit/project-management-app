import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Auth';
import messageReducer from './slices/Message';
const rootReducer = combineReducers({
  authReducer,
  messageReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
