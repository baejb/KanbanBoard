export interface Board {
  id: number;
  name: string;
}

export interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null;
}
