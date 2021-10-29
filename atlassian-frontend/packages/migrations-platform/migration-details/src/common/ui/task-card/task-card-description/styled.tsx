import styled from 'styled-components';

import { N300 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

export const SelectionWrapper = styled.div`
  margin-top: ${gridSize()}px;
`;

export const SelectionTitle = styled.h2`
  ${h400};
`;

export const SelectionDescription = styled.p`
  margin-top: 0px;
  color: ${N300};
`;

export const LozengeWrapper = styled.span`
  margin-left: 0.5em;
`;
