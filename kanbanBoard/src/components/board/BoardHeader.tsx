import styled from 'styled-components';
import colors from '../../styles/color';
import Title from '../common/Title';
import { BoardHeaderProps } from '../../types/boardType';
type CircleProps = {
  icons: 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE';
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
`;
const Circle = styled.div<CircleProps>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${({ icons }) => colors[icons]};
  border: 2px solid ${({ icons }) => colors[`${icons}_BORDER`]};
`;
const BoardCount = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${colors.BOARD_COUNT_BACKGROUND};
  color: ${colors.BOARD_COUNT};
  font-size: 0.8rem;
  text-align: center;
  padding: 0.2rem;
`;

const BoardHeader = ({ icons, name, issue_count }: BoardHeaderProps) => {
  return (
    <Container>
      <Circle icons={icons} />
      <Title fontSize="1.1rem">{name}</Title>
      <BoardCount>{issue_count}</BoardCount>
    </Container>
  );
};

export default BoardHeader;
