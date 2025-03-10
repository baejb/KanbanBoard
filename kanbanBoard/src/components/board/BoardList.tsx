import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoards, moveIssue } from '../../store/board/boardSlice';
import { RootState, AppDispatch } from '../../store';
import MainLayout from '../layout/MainLayout';
import Board from './Board';

const BoardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, loading, error } = useSelector((state: RootState) => state.board);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDrop = (id: number, newBoardId: number, newIndex: number) => {
    dispatch(moveIssue({ id, newBoardId, newIndex }));
  };

  return (
    <MainLayout>
      {boards.map((board) => (
        <Board
          key={board.id}
          icons={board.name.toUpperCase() as 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE'}
          board={board}
          onDrop={handleDrop}
        />
      ))}
    </MainLayout>
  );
};

export default BoardList;
