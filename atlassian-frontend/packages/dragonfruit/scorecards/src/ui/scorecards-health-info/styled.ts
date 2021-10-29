import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { lineClamp } from '@atlassian/dragonfruit-common-ui';

export const NoScorecards = styled.div`
  color: ${colors.N600};
`;

export const ContentWrapper = styled.div`
  width: ${gridSize() * 33}px;
  // parent has padding: 16px 24px with no api
  // this is to adjust that
  margin: -8px -12px;
`;

export const Summary = styled.p`
  color: ${colors.N900};
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
`;

export const Divider = styled.hr`
  border: 1px ${colors.N30A};
  height: 2px;
  background: ${colors.N30A};
  margin-top: ${gridSize()}px;
  margin-bottom: ${gridSize()}px;
  border-radius: 1px;
`;

export const Scorecards = styled.div`
  margin-bottom: ${gridSize()}px;
`;

export const Scorecard = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-of-type) {
    margin-bottom: ${gridSize() * 1.5}px;
  }
`;

export const ScorecardName = styled.div`
  flex-grow: 2;

  ${lineClamp(1)};
`;

export const ScorecardButtonWrapper = styled.div`
  // to remove the nested buttons padding for alignment
  margin: 0px 10px 0px -8px;
`;

export const ScorecardScore = styled.div`
  color: ${colors.N900};
  padding-top: ${gridSize() / 4}px;
  font-size: 14px;
  font-weight: 600;
`;

export const ButtonWrapper = styled.div`
  // to remove the nested buttons padding for alignment
  margin: 0px 10px 0px -14px;
`;

export const LinkWrapper = styled.div`
  a {
    // atlaskit link doesnt export configuring color
    // this is to override with our own
    color: ${colors.N500} !important;
  }
`;
