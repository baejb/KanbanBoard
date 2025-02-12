import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BoardType, BoardState } from '../../types/boardType';
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
  return data.map((board: any) => ({
    ...board,
    issues: Array.isArray(board.issues) ? (board.issues as IssueType[]) : ([] as IssueType[]),
  })) as BoardType[];
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
        board.issues = board.issues ?? ([] as IssueType[]);
        board.issues.push(issue);
      }
    },

    moveIssue: (state, action: PayloadAction<{ id: number; newBoardId: number }>) => {
      const { id, newBoardId } = action.payload;
      let movedIssue: IssueType | any = null;

      state.boards.forEach((board) => {
        if (!Array.isArray(board.issues)) board.issues = [] as IssueType[];
        const issueIndex = board.issues.findIndex((issue) => issue.id === id);
        if (issueIndex !== -1) {
          movedIssue = board.issues.splice(issueIndex, 1)[0];
        }
      });

      if (!movedIssue) return;

      movedIssue.board_id = newBoardId;
      const newBoard = state.boards.find((board) => board.id === newBoardId);
      if (newBoard) {
        newBoard.issues = newBoard.issues ?? ([] as IssueType[]);
        newBoard.issues.push(movedIssue);
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
        state.boards = action.payload;
        state.boards.sort((a, b) => a.id - b.id);
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
          board.issues = board.issues ?? ([] as IssueType[]);
          board.issues.push(issue);
        }
      });
  },
});

export const { addIssueToBoard, moveIssue } = boardSlice.actions;
export default boardSlice.reducer;
