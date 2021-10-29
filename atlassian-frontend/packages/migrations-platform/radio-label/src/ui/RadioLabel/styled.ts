import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { N300 } from '@atlaskit/theme/colors';
import { fontSizeSmall } from '@atlaskit/theme/constants';

export const Description = styled.div`
  font-size: ${fontSizeSmall}px;
  padding-top: ${gridSize() / 2}px;
  color: ${N300};
`;

export const Title = styled.div<{
  isDisabled?: boolean;
}>`
  color: ${(props) => (props.isDisabled ? N300 : 'inherit')};
`;
