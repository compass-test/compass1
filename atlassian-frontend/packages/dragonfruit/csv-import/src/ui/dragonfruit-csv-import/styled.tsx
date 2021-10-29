import React, { ReactNode } from 'react';

import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize } from '@atlaskit/theme';

export const WrapperDiv = styled.div`
  border: 1px solid ${colors.N50};
  border-radius: ${gridSize() / 2}px;
  padding: ${gridSize()}px;
`;

export function Wrapper({
  children,
  testId,
}: {
  children: ReactNode;
  testId?: string;
}) {
  return <WrapperDiv data-testid={testId}>{children}</WrapperDiv>;
}
