import styled from '@emotion/styled';

export const FadeOff = styled.div<{
  visible: boolean;
}>`
  transition-property: opacity, max-height;
  transition-duration: 300ms, 300ms;
  background-color: white;
  text-align: left;
  opacity: 0;
  max-height: 0;
  z-index: 1;
  pointer-events: none;
  grid-column: 1;
  grid-row: 1;

  ${({ visible }) =>
    visible
      ? {
          transitionDuration: '300ms, 0ms',
          maxHeight: '100%',
          opacity: 1,
          zIndex: 0,
          pointerEvents: 'all',
        }
      : {}}
`;
