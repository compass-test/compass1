import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const BadgeWrapper = styled.div`
  display: inline-flex;
  margin-left: ${gridSize() / 2}px;
  opacity: 0.5;
`;

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const LabelValueWrapper = styled.div`
  margin-left: ${gridSize() / 2}px;
  display: inline-flex;
  align-items: center;
`;
