import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { lineClamp } from '@atlassian/dragonfruit-common-ui';

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const LinkContainer = styled.div`
  padding-top: ${gridSize() / 2}px;
  padding-bottom: ${gridSize() / 2}px;
`;

export const DescriptionStyled = styled.div`
  padding: 2px;
  float: left;
  ${lineClamp(1)}
`;
