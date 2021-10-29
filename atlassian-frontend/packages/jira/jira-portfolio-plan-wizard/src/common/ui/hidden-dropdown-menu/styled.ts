import styled from 'styled-components';

export const HiddenButtonContainer = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 200ms ease;
`;
