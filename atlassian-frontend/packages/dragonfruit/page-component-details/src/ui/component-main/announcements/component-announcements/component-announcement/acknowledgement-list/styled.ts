import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import * as typography from '@atlaskit/theme/typography';

export const SectionHeading = styled.div`
  ${typography.h200()};
  margin: 0;
  padding: ${gridSize() * 1.5}px;
`;

export const ItemsList = styled.ul`
  list-style-type: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const ListWrapper = styled.div`
  min-width: 200px;
  max-width: 225px;
  max-height: 328px;
  padding-bottom: ${gridSize() * 1.5}px;
`;
