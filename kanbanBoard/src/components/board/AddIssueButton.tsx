import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/color';
import AddIssueModal from '../modal/AddIssueModal';
const BUTTON_TEXT = '+ Add issue';

const AddButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  color: ${colors.TEXT};
  background-color: ${colors.BOARD_BACKGROUND};
  border: none;
  border-radius: 5px;
  font-weight: 700;
  padding: 1rem;
  text-align: start;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const AddIssueButton = ({ boardId }: { boardId: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickButton = () => {
    setIsOpen(true);
  };
  return (
    <>
      <AddButton onClick={handleClickButton}>{BUTTON_TEXT}</AddButton>
      {isOpen && <AddIssueModal isOpen={isOpen} setIsOpen={setIsOpen} boardId={boardId} />}
    </>
  );
};

export default AddIssueButton;
