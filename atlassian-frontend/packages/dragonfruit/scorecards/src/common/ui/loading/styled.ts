import styled from 'styled-components';

interface SpinnerWrapperProps {
  height: string;
}

export const SpinnerWrapper = styled.div<SpinnerWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
`;
