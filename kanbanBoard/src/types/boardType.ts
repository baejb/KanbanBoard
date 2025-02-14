import { IssueType } from './issueType';
export interface BoardType {
  id: number;
  name: string;
  issue_count: number;
  issues: IssueType[];
}

export interface BoardState {
  boards: BoardType[];
  loading: boolean;
  error: string | null;
}

export type BoardProps = {
  board: BoardType;
  icons: 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE';
  onDrop: (id: number, newBoardId: number, newIndex: number) => void;
};

export type BoardHeaderProps = {
  icons: 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE';
  name: string;
  issue_count: number;
};

export type BoardContentProps = {
  issues: IssueType[];
};
