import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import colors from '../../styles/color';
import BoardHeader from './BoardHeader';
import { BoardProps } from '../../types/boardType';
import AddIssueButton from './AddIssueButton';
import BoardContent from './BoardContent';
const Container = styled.div<{ isOver: boolean }>`
  height: 75vh;
  min-width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0.5rem;
  background-color: ${colors.BOARD_BACKGROUND};
  border: ${({ isOver }) =>
    isOver ? `1px solid ${colors.DRAG_BORDER}` : `1px solid ${colors.BOARD_BACKGROUND_BORDER}`};
  border-radius: 5px;
  position: relative;
  transition: border 0.2s ease-in-out;
`;

const Board = ({ icons, board, onDrop }: BoardProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ISSUE',
    drop: (item: { id: number; boardId: number }) => {
      onDrop(item.id, board.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Container ref={drop} isOver={isOver}>
      <BoardHeader icons={icons} name={board.name} issue_count={board.issue_count} />
      <BoardContent issues={board.issues} />
      <AddIssueButton boardId={board.id} />
    </Container>
  );
};

export default Board;
