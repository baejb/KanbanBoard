import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Board, BoardState } from '../../types/boardType';
import { IssueType } from '../../types/issueType';
import { supabase } from '../../supabaseClient';

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

export const fetchBoards = createAsyncThunk('board/fetchBoards', async () => {
  const { data, error } = await supabase.from('boards').select('*,issues(*)');
  if (error) throw new Error(error.message);
  return data as Board[];
});

export const addIssue = createAsyncThunk(
  'board/addIssue',
  async (
    { boardId, title, content }: { boardId: number; title: string; content: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { data, error } = await supabase
        .from('issues')
        .insert([{ board_id: boardId, title, content, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;

      dispatch(fetchBoards());

      return { boardId, issue: data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addIssueToBoard(state, action: PayloadAction<{ boardId: number; issue: IssueType }>) {
      const { boardId, issue } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        board.issues.push(issue);
      }
    },
  },
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
      })
      .addCase(addIssue.fulfilled, (state, action) => {
        const { boardId, issue } = action.payload;
        const board = state.boards.find((b) => b.id === boardId);
        if (board) {
          board.issues.push(issue);
        }
      });
  },
});
export const { addIssueToBoard } = boardSlice.actions;
export default boardSlice.reducer;
