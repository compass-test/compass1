import styled from 'styled-components';

export const ErrorBoundaryBox = styled.div`
  position: absolute;
  display: inline-block;
  border: 1px solid red;
  box-sizing: border-box;
  pointer-events: none; // Make the boundary box click through
  z-index: 201; // One higher than the navigation bar
`;

export const ForceErrorButton = styled.span`
  color: red;
  font-size: 30px;
  cursor: pointer;
  pointer-events: auto; // Make the button not be click through
  opacity: 0;

  ${ErrorBoundaryBox}:hover & {
    opacity: 1;
  }
`;
