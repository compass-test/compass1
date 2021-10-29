import styled from 'styled-components';
import { B100 } from '@atlaskit/theme/colors';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

const borderThickness = gridSize() / 4;

export const AvatarRing = styled.div`
  box-sizing: content-box;
  width: ${gridSize() * 5}px;
  height: ${gridSize() * 5}px;

  border-radius: 50%;
  border: ${borderThickness}px solid rgba(0, 0, 0, 0);
  overflow: hidden;
`;

export const InactiveAvatarBorder = styled.div`
  box-sizing: content-box;
  width: max-content;
  height: max-content;

  border-radius: 50%;
  border: ${borderThickness}px solid rgba(0, 0, 0, 0);

  margin: -${(borderThickness * 5) / 3}px;
`;

export const ActiveAvatarBorder = styled.div`
  box-sizing: content-box;
  width: max-content;
  height: max-content;

  border-radius: 50%;
  border: ${borderThickness}px solid ${B100};

  margin: -${(borderThickness * 5) / 3}px;
`;
