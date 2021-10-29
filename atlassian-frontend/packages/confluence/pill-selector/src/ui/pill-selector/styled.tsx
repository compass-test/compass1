import styled from 'styled-components';

import { B200, B400, B50, N20A, N30, N500 } from '@atlaskit/theme/colors';

export const PillButton = styled.button<{
  isSelected?: boolean;
}>`
  outline: none;
  box-sizing: border-box;
  padding: 4px 16px;
  background-color: ${props => (props.isSelected ? B50 : N20A)};
  display: inline-flex;
  border: none;
  border-radius: 13px;
  font-size: 14px;
  line-height: 20px;
  height: 28px;
  color: ${props => (props.isSelected ? B400 : N500)};
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  vertical-align: top;
  margin-left: 8px;
  &:focus {
    box-shadow: 0 0 0 2px ${B200};
  }
  &:hover {
    background-color: ${props => (props.isSelected ? B50 : N30)};
  }
  &:first-of-type {
    margin-left: 0;
  }
`;
