import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const DescriptionWrapper = styled.div`
  margin-top: 0;
  flex-grow: 1;
`;

export const TierWrapper = styled.div`
  margin-top: -${2 * gridSize()}px;
  margin-bottom: ${2 * gridSize()}px;
`;

export const LabelsSectionWrapper = styled.div`
  margin-top: ${3 * gridSize()}px;
`;
