export interface Issue {
  id: number;
  title: string;
  content: string;
  created_at: string;
  status: string;
  boardId: number;
}

export interface IssueState {
  issues: Issue[];
  loading: boolean;
  error: string | null;
}
