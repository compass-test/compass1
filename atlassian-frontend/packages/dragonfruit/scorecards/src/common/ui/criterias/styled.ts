import styled from 'styled-components';

import { N800 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

export const Heading = styled.div`
  font-size: ${headingSizes.h200.size}px;
  line-height: ${headingSizes.h200.lineHeight}px;
  color: ${N800};
  margin: ${gridSize() * 2}px 0;
  font-weight: 500;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const CriteriaList = styled.div`
  padding-left: ${gridSize()}px;
`;
