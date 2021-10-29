import styled from '@emotion/styled';

import { subtleHeading } from '@atlaskit/theme/colors';
import { fontSize, gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

export const GoalWrapper = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-left: ${gridSize() * 2}px;
  }
  > div:nth-child(1) {
    margin-left: 0;
  }
`;

export const Wrapper = styled.div`
  margin-top: ${gridSize() * 2}px;
  margin-bottom: ${gridSize() * 2}px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const SectionTitleLabel = styled.label`
  font-size: ${headingSizes.h200.size / fontSize()}em;
  font-style: 'inherit';
  line-height: ${headingSizes.h200.lineHeight / headingSizes.h200.size};
  color: ${subtleHeading()};
  font-weight: 600;
`;
