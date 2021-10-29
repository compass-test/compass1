import styled from '@emotion/styled';

import { G300, G400, N0, R200, R500, Y300 } from '@atlaskit/theme/colors';

import { AlertPriority } from './__generated__/opsgeniePriorityFragment.graphql';

const BACKGROUND_COLOR: Record<string, string> = {
  P1: R500,
  P2: R200,
  P3: Y300,
  P4: G300,
  P5: G400,
};

export const Container = styled.div<{ priority?: AlertPriority | null }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    (props.priority && BACKGROUND_COLOR[props.priority]) ??
    BACKGROUND_COLOR.P1};
  color: ${N0};
  width: 20px;
  height: 20px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
`;
