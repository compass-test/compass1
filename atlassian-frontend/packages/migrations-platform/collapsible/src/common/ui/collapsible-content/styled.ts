import styled from 'styled-components';

export const collapseAnimationDuration = 200;

export const CollapsibleWrapper = styled.div<{ contentHeight: string }>`
  transition: max-height ${collapseAnimationDuration}ms ease-out;
  overflow: hidden;
  max-height: 0;

  /* enter from  */
  &.collapse-enter {
    max-height: 0;
  }

  /* enter to */
  &.collapse-enter-active {
    max-height: ${(props) => props.contentHeight};
  }

  /* finish entering, allow content to auto expand */
  &.collapse-enter-done {
    max-height: none;
  }

  /* exit from, set the max height back to can transition */
  &.collapse-exit {
    max-height: ${(props) => props.contentHeight};
  }

  /* exit to */
  &.collapse-exit-active {
    max-height: 0;
  }
`;
