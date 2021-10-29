import styled from 'styled-components';

import { Y200 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

import { ErrorAppearance } from './types';

export const SetRulesSection = styled.div`
  margin-top: ${gridSize() * 2}px;
  display: flex;
`;

export const SetRulesSectionInner = styled.div`
  flex: auto;
  margin-left: ${gridSize() * 2}px;
`;

export const SetRulesButtonGroup = styled.div`
  margin-top: ${gridSize() * 2}px;
`;

// AkErrorMessage doesn't provide a way to change color
export const WarningStyledMessageWrapper = styled.div<{
  appearance: ErrorAppearance;
}>`
  * {
    ${({ appearance }) => appearance === 'warning' && `color: ${Y200};`}
  }
`;

export const ProjectOverLimitTitle = styled.div`
  position: relative;
  padding: ${gridSize() * 2}px 0px;
  overflow: hidden;
`;
