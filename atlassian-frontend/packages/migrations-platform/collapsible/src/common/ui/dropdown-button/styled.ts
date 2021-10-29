import styled from 'styled-components';

import { N40 } from '@atlaskit/theme/colors';

export const Button = styled.button`
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  border-radius: 2px;
  transition: background 0.1s ease-out,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);
  height: 32px;
  margin: auto 0;

  &:hover {
    background-color: ${N40};
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(38, 132, 255, 0.6);
    outline: none;
  }
`;

export const IconWrapper = styled.span<{ isOpen: boolean }>`
  transform: rotate(${(props) => (props.isOpen ? '180deg' : '0deg')});
  transition: transform 0.2s ease-out;
`;
