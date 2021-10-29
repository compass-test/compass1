/** @jsx jsx */
import { ReactNode } from 'react';

import { jsx } from '@emotion/core';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export function Wrapper({
  children,
  testId,
}: {
  children: ReactNode;
  testId?: string;
}) {
  return (
    <div
      css={{
        padding: `${gridSize()}px`,
        paddingTop: `${gridSize() * 5}px`,
        minWidth: 1000,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}
