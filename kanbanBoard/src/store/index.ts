import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice';
import issueReducer from './issue/issueSlice';
export const store = configureStore({
  reducer: {
    board: boardReducer,
    issue: issueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
