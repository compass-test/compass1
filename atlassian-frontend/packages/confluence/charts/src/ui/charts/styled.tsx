/** @jsx jsx */
import { ReactNode } from 'react';

import { jsx } from '@emotion/core';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize } from '@atlaskit/theme';

export function Wrapper({
  children,
  testId,
}: {
  children?: ReactNode;
  testId?: string;
}) {
  return (
    <div
      css={{
        border: `1px solid ${colors.N50}`,
        borderRadius: `${gridSize() / 2}px`,
        backgroundColor: `#ffffff`,
        paddingTop: 20,
        paddingBottom: 20,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export const chartMargin = 20;
