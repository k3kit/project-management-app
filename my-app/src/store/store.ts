import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/Auth';
const rootReducer = combineReducers({
  userReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
