import styled from '@emotion/styled';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const textColor = colors.N800;

export const ErrorStateContainer = styled.div`
  margin: 80px auto 0px auto;
  text-align: center;
  width: 30%;
  color: ${textColor};
`;

export const DescriptionContainer = styled.div`
  margin: 10px 0px;
`;

export const ContributorsContainer = styled.div`
  margin: -2px 0px;
`;

export const ErrorStateTitleContainer = styled.h3``;

export const LastUpdatedContainer = styled.div``;
export const LastUpdatedUnknown = styled.small``;
