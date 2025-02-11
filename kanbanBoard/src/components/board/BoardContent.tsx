import styled from 'styled-components';
import { IssueType } from '../../types/issueType';
import Issue from '../issue/Issue';
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: auto;
`;

const BoardContent = ({ issues }: { issues: IssueType[] }) => {
  return (
    <Container>
      {issues.map((issue, index) => (
        <Issue key={index} issues={issue} />
      ))}
    </Container>
  );
};

export default BoardContent;
