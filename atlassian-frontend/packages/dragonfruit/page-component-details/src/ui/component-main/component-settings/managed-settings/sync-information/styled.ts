import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const ErrorBody = styled.div`
  line-height: ${gridSize() * 3}px;
`;

export const ListItem = styled.li`
  margin: 0;
`;

export const TimeStringContainer = styled.time`
  &::first-letter {
    text-transform: uppercase;
  }
`;
