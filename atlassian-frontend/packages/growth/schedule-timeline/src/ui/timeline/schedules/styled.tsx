// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const RuleLayers = styled.ul`
  &,
  &:first-of-type {
    margin: 34px 0 0;
    border-top: 1px dashed ${colors.N40};
  }

  padding: 0;
  list-style: none;
`;
