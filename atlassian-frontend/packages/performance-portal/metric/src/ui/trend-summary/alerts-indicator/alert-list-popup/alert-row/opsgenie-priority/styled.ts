import styled from '@emotion/styled';

import { G300, G400, N0, R200, R500, Y300 } from '@atlaskit/theme/colors';

import { AlertPriority } from '../../../../../../__generated__/graphql';

const BACKGROUND_COLOR = {
  [AlertPriority.P1]: R500,
  [AlertPriority.P2]: R200,
  [AlertPriority.P3]: Y300,
  [AlertPriority.P4]: G300,
  [AlertPriority.P5]: G400,
};

export const Container = styled.div<{ priority: AlertPriority }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => BACKGROUND_COLOR[props.priority]};
  color: ${N0};
  width: 20px;
  height: 20px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
`;
