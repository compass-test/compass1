import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const ProgressBarWrapper = styled.div<{ size: string }>`
  background: rgba(9, 30, 66, 0.13);
  border-radius: 3px;
  height: ${(props) =>
    props.size === 'small' ? gridSize() * 0.5 : gridSize()}px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const Bar = styled.span<{
  size: string;
  background: string | undefined;
  width: number;
}>`
  border-radius: 3px;
  display: block;
  height: ${(props) =>
    props.size === 'small' ? gridSize() * 0.5 : gridSize()}px;
  position: absolute;
  background: ${(props) => props.background};
  transition: width 0.2s;
  width: ${(props) => props.width}%;
`;
