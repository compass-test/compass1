import styled, { css } from 'styled-components';

import { N40A, N600 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';
import { lineClamp } from '@atlassian/dragonfruit-common-ui';

const flexedRow = () => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;

  & > :not(:last-child) {
    margin-right: ${gridSize()}px;
  }
`;

export const Option = styled.div`
  ${flexedRow()}
`;

export const ScorecardInfoWrapper = styled.div`
  overflow: hidden;
`;

export const Header = styled.div`
  ${flexedRow()}
`;

export const LabelText = styled.h4`
  ${h400};
`;

export const DescriptionText = styled.div`
  font-size: 12px;
  color: ${N600};
  margin-top: 2px;
  ${lineClamp(1)}
`;

export const EmptyScorecardIconWrapper = styled.div`
  background-color: ${N40A};
  width: ${gridSize() * 2}px;
  height: ${gridSize() * 2}px;
  border-radius: 2px;
`;

export const EmptyScorecardInfo = styled.div`
  background-color: ${N40A};
  width: ${gridSize() * 15}px;
  height: ${gridSize()}px;
  border-radius: 3px;
`;
