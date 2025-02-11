import styled from 'styled-components';

interface TitleType {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  children: React.ReactNode;
}

const TitleText = styled.div<TitleType>`
  width: 100%;
  font-size: ${({ fontSize }) => fontSize || '1.5rem'};
  color: ${({ color }) => color || '#000'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
`;
const Title = ({ fontSize, color, fontWeight, children }: TitleType) => {
  return (
    <TitleText fontSize={fontSize} color={color} fontWeight={fontWeight}>
      {children}
    </TitleText>
  );
};

export default Title;
