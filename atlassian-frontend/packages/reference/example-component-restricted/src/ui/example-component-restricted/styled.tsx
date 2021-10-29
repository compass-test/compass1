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
  children: ReactNode;
  testId?: string;
}) {
  return (
    <div
      css={{
        border: `1px solid ${colors.N50}`,
        borderRadius: `${gridSize() / 2}px`,
        boxSizing: 'border-box',
        margin: `${gridSize() * 2}px 0`,
        padding: `${gridSize()}px`,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span
      css={{
        display: 'inline-block',
        fontWeight: 'bold',
        marginRight: `${gridSize()}px`,
      }}
    >
      {children}
    </span>
  );
}

export function Content({ children }: { children: ReactNode }) {
  return <div css={{ marginTop: `${gridSize()}px` }}>{children}</div>;
}
