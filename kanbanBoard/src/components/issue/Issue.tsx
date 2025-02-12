import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import colors from '../../styles/color';
import { IssueType } from '../../types/issueType';

// board에서 보이는 issue는 타이틀만 보임 , 클릭 시 모달 생성 및 세부정보 확인
const Container = styled.div<{ isDragging: boolean }>`
  padding: 5%;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.BOARD_BACKGROUND_BORDER};
  border-radius: 5px;
  background-color: white;
  cursor: grab;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};

  &:active {
    cursor: grabbing;
    border: 1px solid ${colors.DRAG_BORDER};
  }
`;

const Title = styled.div`
  font-size: 0.8rem;
  text-align: start;
`;

const Issue = ({ issues }: { issues: IssueType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ISSUE',
    item: { id: issues.id, boardId: issues.board_id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Container ref={drag} isDragging={isDragging}>
      <Title>{issues.title}</Title>
    </Container>
  );
};

export default Issue;
