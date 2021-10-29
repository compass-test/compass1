import styled from 'styled-components';

import { N500 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const PageWrapper = styled.div`
  padding-top: ${gridSize() * 2}px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${gridSize() * 2}px;
`;

export const ProjectHeader = styled.a`
  display: flex;
  align-items: center;
  margin-top: 30px;
  cursor: pointer;

  :hover {
    text-decoration: none;
  }
`;

export const EpicsSection = styled.div`
  padding-left: 42px;
`;

export const ProjectNameText = styled.div`
  // Margin in design is 13px, Avatar wrapper has 4 px padding, so 13 - 4 = 9
  margin-left: 9px;
  font-size: 14px;
  line-height: 16px;
  color: ${N500};
`;
