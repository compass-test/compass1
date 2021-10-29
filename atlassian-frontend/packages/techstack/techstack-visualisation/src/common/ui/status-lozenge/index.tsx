import React, { FC } from 'react';

import Lozenge, { ThemeAppearance } from '@atlaskit/lozenge';

import { Status } from '../../types';

interface Data {
  [status: string]: {
    appearance: ThemeAppearance;
    isBold: boolean;
    caption: string;
  } | void;
}

const data: Data = {
  recommended: {
    appearance: 'success',
    isBold: false,
    caption: 'Recommended',
  },
  discouraged: {
    appearance: 'moved',
    isBold: false,
    caption: 'Discouraged',
  },
  deprecated: {
    appearance: 'removed',
    isBold: false,
    caption: 'Deprecated',
  },
  'no-go': {
    appearance: 'removed',
    isBold: true,
    caption: 'No go',
  },
  unavailable: undefined,
};

export const StatusLozenge: FC<{ status: Status }> = ({ status }) => {
  const lozengeProps = data[status];
  if (lozengeProps) {
    return (
      <Lozenge
        appearance={lozengeProps.appearance}
        isBold={lozengeProps.isBold}
      >
        {lozengeProps.caption}
      </Lozenge>
    );
  }
  return null;
};
