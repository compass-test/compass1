import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { layers } from '@atlaskit/theme';

export const PopupContainer = styled.div`
  position: relative;
`;

export const PopupContentContainer = styled.div`
  background: white;
  position: absolute;
  z-index: ${layers.layer()};
`;
