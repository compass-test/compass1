import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { N500 } from '@atlaskit/theme/colors';
import { h600 } from '@atlaskit/theme/typography';

export const TitleRow = styled.div`
  color: ${N500};

  display: flex;
  align-items: center;
  margin: 0 0 ${gridSize() * 1.5}px;
`;

export const Heading = styled.h3`
  ${h600};
  color: ${N500};

  &,
  &:first-child {
    margin: 0 ${gridSize()}px;
  }

  flex-grow: 1;
`;
