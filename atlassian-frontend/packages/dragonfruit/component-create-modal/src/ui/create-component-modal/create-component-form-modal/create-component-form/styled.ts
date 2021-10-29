import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: ${gridSize() * 3}px 0;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${gridSize() * 2}px;
  margin-left: -${gridSize() / 2}px;
  width: ${gridSize() * 19}px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StartTeamButtonLabelWrapper = styled.div`
  margin-top: ${gridSize() / 4}px;
`;
