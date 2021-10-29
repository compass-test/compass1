// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const DayContainer = styled.ul`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const Day = styled.li`
  white-space: nowrap;
  box-sizing: border-box;
  margin: 0;
  padding-top: 4px;
  padding-left: 6px;
  display: inline-block;
  border-left: 1px solid ${colors.N40};
  color: ${colors.N80};
  font-size: 10px;
  height: 100%;
`;
