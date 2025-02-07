import { Issue } from './issueType';
export interface Board {
  id: number;
  name: string;
  issue_count: number;
  issues: Issue[];
}

export interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null;
}

export type BoardProps = {
  board: Board;
  icons: 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE';
};

export type BoardHeaderProps = {
  icons: 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE';
  name: string;
  issue_count: number;
};

export type BoardContentProps = {
  issues: Issue[];
};
