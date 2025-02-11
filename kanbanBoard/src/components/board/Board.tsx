import styled from 'styled-components';
import colors from '../../styles/color';
import BoardHeader from './BoardHeader';
import { BoardProps } from '../../types/boardType';
import BoardContent from './BoardContent';
import AddIssueButton from './AddIssueButton';
// Board 는 Board 헤더 , 푸터 , issue를 가지는것 (IssueList)

const Container = styled.div`
  height: 75vh;
  min-width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0.5rem;
  background-color: ${colors.BOARD_BACKGROUND};
  border: 1px solid ${colors.BOARD_BACKGROUND_BORDER};
  border-radius: 5px;
  position: relative;
`;

const Board = ({ icons, board }: BoardProps) => {
  return (
    <Container>
      <BoardHeader icons={icons} name={board.name} issue_count={board.issue_count} />
      <BoardContent issues={board.issues} />
      <AddIssueButton boardId={board.id} />
    </Container>
  );
};

export default Board;
