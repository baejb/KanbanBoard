import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIssue } from '../../store/board/boardSlice';
import { RootState } from '../../store';
import styled from 'styled-components';
import colors from '../../styles/color';
import Title from '../common/Title';
import CommonInput from '../common/CommonInput';

const ContentDiv = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: ${colors.SUBMIT};
  width: 5vw;
  height: 2vw;
  color: white;
  font-weight: 800;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-top: auto;

  &:hover {
    cursor: pointer;
  }
`;

const IssueForm = ({ boardId, closeModal }: { boardId: number; closeModal: () => void }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { loading } = useSelector((state: RootState) => state.board);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and Content are required!');
      return;
    }

    dispatch(addIssue({ boardId, title, content }) as any)
      .unwrap()
      .then(() => {
        setTitle('');
        setContent('');
        closeModal();
      })
      .catch((error: string) => {
        alert('Error adding issue: ' + error);
      });
  };

  return (
    <>
      <ContentDiv>
        <InputDiv>
          <Title fontSize="0.9rem">Add a title</Title>
          <CommonInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            fontSize="0.8rem"
          />
        </InputDiv>
        <InputDiv>
          <Title fontSize="0.9rem">Add a description</Title>
          <CommonInput
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter description"
            fontSize="0.8rem"
            height="40vh"
          />
        </InputDiv>
      </ContentDiv>
      <SubmitButton onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Create'}
      </SubmitButton>
    </>
  );
};

export default IssueForm;
