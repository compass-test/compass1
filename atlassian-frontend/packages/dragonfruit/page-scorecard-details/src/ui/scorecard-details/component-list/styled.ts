// Have to use styled-components until lineClamp is moved to emotion
import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { lineClamp } from '@atlassian/dragonfruit-common-ui';

export const LinkContainer = styled.div`
  padding-top: ${gridSize() / 2}px;
  padding-bottom: ${gridSize() / 2}px;
`;

export const DescriptionStyled = styled.div`
  padding: 2px;
  float: left;
  ${lineClamp(1)};
`;

export const IconWithPercentage = styled.div`
  display: flex;
  align-items: center;
`;

export const PercentageWrapper = styled.div`
  margin-left: ${gridSize() * 0.5}px;
  color: ${colors.N400};
`;

export const TeamStyled = styled.div`
  display: block;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 280px;
`;
