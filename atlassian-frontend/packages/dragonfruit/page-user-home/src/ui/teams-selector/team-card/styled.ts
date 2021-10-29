import styled from '@emotion/styled';

import { N30 } from '@atlaskit/theme/colors';

export const AvatarGroupWrapper = styled.div`
  margin-left: auto;
`;

export const CardContent = styled.div`
  padding: 29px;
  display: flex;
  align-items: center;
`;

export const TopContent = styled.div`
  min-width: 25%;
  width: 25%;
`;

export const TeamWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TeamDetailsWrapper = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

export const TeamMembersWrapper = styled.div``;

export const TeamName = styled.div`
  font-size: 1.5em;
  line-height: 1.2;
  font-weight: 500;
  display: flex;
  &:hover {
    cursor: pointer;
    background-color: ${N30};
  }
`;

export const StatsWrapper = styled.div`
  display: flex;
`;
