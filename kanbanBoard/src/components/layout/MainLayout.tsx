import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../../utils/breakpoints';

const styles = {
  mobile: {
    fontSize: '0.8rem',
    flexDirection: 'column',
  },
  tablet: {
    fontSize: '1rem',
    flexDirection: 'row',
  },
  desktop: {
    fontSize: '1.2rem',
    flexDirection: 'row',
  },
};

const Container = styled.div<{ fontSize: string; flexDirection: string }>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  font-size: ${({ fontSize }) => fontSize};
  gap: 1rem;
  padding: 1rem;
`;

type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const isTablet = useMediaQuery({
    minWidth: breakpoints.mobile + 1,
    maxWidth: breakpoints.tablet,
  });
  const isDesktop = useMediaQuery({ minWidth: breakpoints.tablet + 1 });

  const layoutType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  const { fontSize, flexDirection } = styles[layoutType];

  return (
    <Container fontSize={fontSize} flexDirection={flexDirection}>
      {children}
    </Container>
  );
};

export default MainLayout;
