import styled from 'styled-components';
import MainLayout from './components/layout/MainLayout';
import Title from './components/common/Title';
import BoardList from './components/board/BoardList';
import useRealtimeBoards from './hooks/useRealtimeBoard';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;
function App() {
  useRealtimeBoards();
  return (
    <Container>
      <Title fontSize="2rem">KanbanBoard</Title>
      <MainLayout>
        <BoardList />
      </MainLayout>
    </Container>
  );
}

export default App;
