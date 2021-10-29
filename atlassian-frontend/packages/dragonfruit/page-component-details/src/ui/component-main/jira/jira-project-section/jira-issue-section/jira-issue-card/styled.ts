import styled from 'styled-components';

import { N90 } from '@atlaskit/theme/colors';
import { Card as CommonCard } from '@atlassian/dragonfruit-common-ui';

export const Card = styled(CommonCard)<{
  roundedTop: boolean;
  roundedBottom: boolean;
}>`
  ${({ roundedTop, roundedBottom }) =>
    `border-radius: ${roundedTop ? '3px 3px' : '0px 0px'} ${
      roundedBottom ? '3px 3px' : '0px 0px'
    };`}
`;

export const IssueWrapper = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: center;
  max-width: 100%;
`;

export const LeftIssueWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const IssueIcon = styled.img`
  padding: 0px 9px;
`;

export const IssueKeyWrapper = styled.div`
  color: ${N90};
  font-size: 12px;
  padding-right: 9px;
  font-weight: 600;
  margin-top: 1px;
  white-space: nowrap;
  cursor: pointer;
`;

export const IssueSummaryWrapper = styled.div`
  height: 42px;
  line-height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RightFloatIssueWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const StatusLozengeWrapper = styled.div`
  padding-right: 44px;
  padding-left: 9px;
`;

export const AssigneeWrapper = styled.div`
  padding-left: 9px;
`;
