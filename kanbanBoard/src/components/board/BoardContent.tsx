import React from 'react';
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

interface BoardContentProps {
  issues: IssueType[];
}

const BoardContent = React.forwardRef<HTMLDivElement, BoardContentProps>(({ issues }, ref) => {
  return (
    <Container ref={ref}>
      {issues.map((issue) => (
        <Issue key={issue.id} issues={issue} />
      ))}
    </Container>
  );
});

export default BoardContent;
