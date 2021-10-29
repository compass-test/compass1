import css from '@emotion/css';
import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const flexedRow = () => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;

  & > :not(:last-child) {
    margin-right: ${gridSize()}px;
  }
`;

const IconWithText = styled.div`
  ${flexedRow()}

  // Make sure that the icon itself doesn't shrink in response to flex flow.
  & > :first-child:not(:only-child) {
    flex-shrink: 0;
  }
`;

export const ComponentDisplay = styled(IconWithText)`
  overflow: hidden;
  flex: 2 1 0px;
`;

export const LabelText = styled.div`
  white-space: nowrap;
`;

export const ManagedExternallyIndicator = styled(IconWithText)`
  font-size: 11px;
  margin-left: ${gridSize() / 2}px;

  & > :first-child {
    width: 16px;
    margin-right: ${gridSize() / 2}px;
  }
`;

export const NoOwnerIndicator = styled(IconWithText)`
  font-size: 11px;
  color: ${colors.N200};
  flex: 1 1 0px;
`;

export const Option = styled.div`
  ${flexedRow()}
`;

export const TeamDisplay = styled(IconWithText)`
  overflow: hidden;
  flex: 1 1 0px;
  font-size: 11px;

  & > :first-child {
    margin-right: ${gridSize() / 2}px;
  }
`;

export const TruncatedLabelText = styled(LabelText)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PlaceholderTeamName = styled.div`
  width: 71px;
  height: 6px;
  left: 432px;
  top: 13px;
  background: ${colors.N60A};
  border-radius: 3px;
`;

export const PlaceholderTeamIcon = styled.div`
  margin: ${gridSize() * 0.5}px;
`;
