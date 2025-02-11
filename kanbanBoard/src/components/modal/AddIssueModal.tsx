import styled from 'styled-components';
import colors from '../../styles/color';
import Title from '../common/Title';
import IssueForm from '../issue/IssueForm';
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 101;
  background-color: rgba(192, 192, 192, 0.329);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 50vw;
  height: 70vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1rem;
  font-weight: 800;
  color: ${colors.TEXT};
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const AddIssueModal = ({
  isOpen,
  setIsOpen,
  boardId,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  boardId: number;
}) => {
  if (!isOpen) return null;

  const handleModalClick = () => {
    setIsOpen(false);
  };

  return (
    <ModalContainer onClick={handleModalClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleModalClick}>X</CloseButton>
        <Title fontSize="1rem" fontWeight="800">
          Create new issue
        </Title>
        <IssueForm boardId={boardId} closeModal={handleModalClick} />
      </ModalContent>
    </ModalContainer>
  );
};

export default AddIssueModal;
