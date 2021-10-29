import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const AnnouncementsTabContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: ${colors.N20};
  border-radius: 3px;
  padding: ${gridSize() * 2}px;
`;

export const AnnouncementsSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${gridSize() * 2}px;
`;
