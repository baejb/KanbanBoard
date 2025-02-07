import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoards } from '../../store/board/boardSlice';
import { RootState, AppDispatch } from '../../store';
import MainLayout from '../layout/MainLayout';
import Board from './Board';

const BoardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, loading, error } = useSelector((state: RootState) => state.board);
  console.log(boards);
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <MainLayout>
      {boards.map((board) => (
        <Board
          key={board.id}
          icons={board.name.toUpperCase() as 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE'}
          board={board}
        />
      ))}
    </MainLayout>
  );
};

export default BoardList;
