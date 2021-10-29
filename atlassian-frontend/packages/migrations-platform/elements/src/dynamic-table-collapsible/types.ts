import type { ReactNode } from 'react';

import type { RowType } from '@atlaskit/dynamic-table/types';

export type CollapsibleRow = Omit<RowType, 'key'> & {
  key: string;
  collapsibleContent?: ReactNode;
};
