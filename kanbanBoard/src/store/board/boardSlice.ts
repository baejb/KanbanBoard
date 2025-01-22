import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Board, BoardState } from '../../types/boardType';
import { supabase } from '../../supabaseClient';
const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

export const fetchBoards = createAsyncThunk('board/fetchBoards', async () => {
  const { data, error } = await supabase.from('boards').select('*');
  if (error) throw new Error(error.message);
  return data as Board[];
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload.sort((a, b) => a.id - b.id);
        state.loading = false;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.error = action.error.message || 'Board 데이터를 불러오는데 실패하였습니다.';
        state.loading = false;
      });
  },
});

export default boardSlice.reducer;
