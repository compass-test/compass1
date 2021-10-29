import styled from 'styled-components';

import { N20, N30, N500 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: ${gridSize()}px ${gridSize() * 1.5}px;
  background-color: ${N20};

  // Override default button styles
  border: none;
  width: 100%;
  border-radius: 2px;

  &:hover {
    background-color: ${N30};
    cursor: pointer;
  }
`;

export const Link = styled.div`
  color: ${N500};
  cursor: pointer;

  &:hover {
    color: ${N500};
    text-decoration: none;
  }
`;

export const IconPositionWrapper = styled.div`
  margin-right: 4px;
  display: flex;
  align-items: center;
`;
