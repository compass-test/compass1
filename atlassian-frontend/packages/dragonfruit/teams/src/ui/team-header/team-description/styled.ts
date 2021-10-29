import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const EmptyTeamDescription = styled.div`
  color: ${colors.N300};
  font-style: italic;
`;

export const TeamDescriptionWrapper = styled.div`
  overflow-wrap: break-word;
  max-width: ${gridSize() * 94}px;
`;
