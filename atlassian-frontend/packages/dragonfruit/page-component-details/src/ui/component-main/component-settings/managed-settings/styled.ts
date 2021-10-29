import styled from 'styled-components';

import { N300 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

export const MainWrapper = styled.div`
  > div {
    margin: ${gridSize() * 2}px 0;
  }
`;

export const SectionWrapper = styled.div`
  padding-top: ${gridSize()}px;
`;

export const HeadingContainer = styled.h2`
  ${h400()}
  color: ${N300};
`;
