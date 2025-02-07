export interface IssueType {
  id: number;
  title: string;
  content: string;
  created_at: string;
  status: string;
  board_id: number;
}

export interface IssueState {
  issues: IssueType[];
  loading: boolean;
  error: string | null;
}
