import styled from '@emotion/styled';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { fontSize } from '@atlaskit/theme';
import { headingSizes } from '@atlaskit/theme/typography';

export const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

export const H2 = styled.h2`
  font-size: ${headingSizes.h800.size / fontSize()}em;
  font-weight: 400;
`;

export const LabelGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const EventKeyWrapper = styled.div`
  margin: 3px 0 5px;
`;
