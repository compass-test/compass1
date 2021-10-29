import React from 'react';

import Lozenge, { ThemeAppearance } from '@atlaskit/lozenge';

export type StatusNames = 'To Do' | 'In Progress' | 'Done';

export type Status = {
  name: StatusNames;
};

const statusAppearanceMap: { [K in StatusNames]: ThemeAppearance } = {
  'To Do': 'default',
  'In Progress': 'inprogress',
  Done: 'success',
};

export const StatusLozenge = ({ name }: Status) => {
  const appearance = statusAppearanceMap[name];

  return <Lozenge appearance={appearance}>{name}</Lozenge>;
};

export default StatusLozenge;
