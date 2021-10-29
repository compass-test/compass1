import styled from 'styled-components';

export const delay = 150;
export const spinnerSize = 16;
export const spinnerMargin = 4;

export const TransitionElement = styled.span`
  display: inline-block;
  opacity: 1;
  padding-right: 0;
  min-height: 1em;
  transition: padding-right 200ms ease-out;
  will-change: padding-right, opacity;

  &.is-loading {
    opacity: 0.5;
    padding-right: ${spinnerSize + spinnerMargin}px;
  }
`;

export const SpinnerWrapper = styled.span`
  position: absolute;
  transform: translateX(${spinnerMargin}px);
`;
