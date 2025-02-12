import styled from 'styled-components';
import { IssueType } from '../../types/issueType';
import Issue from '../issue/Issue';
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
`;

const BoardContent = ({ issues }: { issues: IssueType[] }) => {
  return (
    <Container>
      {issues.map((issue) => (
        <Issue key={issue.id} issues={issue} />
      ))}
    </Container>
  );
};

export default BoardContent;
