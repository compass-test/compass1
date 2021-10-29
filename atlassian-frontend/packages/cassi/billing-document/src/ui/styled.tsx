/** @jsx jsx */
import { ReactNode } from 'react';

import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

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
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export const BillingDocumentContainer = styled.div`
  max-width: 900px;
  overflow: unset;
`;
