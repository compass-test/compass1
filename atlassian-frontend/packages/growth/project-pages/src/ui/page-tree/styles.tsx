import styled from 'styled-components';

interface DisplayWrapperProps {
  isShown: boolean;
}

export const DisplayWrapper = styled.div<DisplayWrapperProps>`
  display: ${(props) => (props.isShown ? 'initial' : 'none')};
`;
