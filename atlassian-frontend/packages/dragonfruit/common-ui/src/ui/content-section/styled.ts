import styled from 'styled-components';

import { N700, N800 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import * as typography from '@atlaskit/theme/typography';

interface SectionHeadingProps {
  position?: 'main' | 'sidebar';
}

export const SectionHeadingText = styled.div<SectionHeadingProps>`
  ${(props) =>
    props.position === 'sidebar' ? typography.h200() : typography.h400()};
  margin-top: 0;
  flex: 1 0 auto;
  margin-bottom: ${(props) =>
    props.position === 'sidebar' ? 0 : gridSize() * 1.5}px;
  color: ${N800};
`;

export const SectionDescriptionText = styled.div`
  margin-top: ${gridSize()}px;
  flex: 1 0 auto;
  margin-bottom: ${gridSize() * 2}px;
  color: ${N700};
`;

export const SectionWrapper = styled.section``;
