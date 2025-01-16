import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Issue, IssueState } from '../../types/issueType';
import { supabase } from '../../supabaseClient';
const initialState: IssueState = {
  issues: [],
  loading: false,
  error: null,
};
export const fetchIssues = createAsyncThunk('issue/fetchIssues', async () => {
  const { data, error } = await supabase.from('issues').select('*');
  if (error) throw new Error(error.message);
  return data as Issue[];
});

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    addIssue(state, action: PayloadAction<Issue>) {
      state.issues.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.issues = action.payload;
        state.loading = false;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch issues';
        state.loading = false;
      });
  },
});

export const { addIssue } = issueSlice.actions;
export default issueSlice.reducer;
