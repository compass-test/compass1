import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const AnnouncementListItem = styled.li`
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: ${gridSize() * 1.5}px;
  }
`;
