import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import * as typography from '@atlaskit/theme/typography';

export const SectionRowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${gridSize() * 2}px;
`;

export const FieldDescription = styled.span`
  ${typography.h200}
  margin-top: 0px;
  padding-left: 10px;
  padding-right: ${gridSize() * 3}px;
`;

export const WeightItems = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
