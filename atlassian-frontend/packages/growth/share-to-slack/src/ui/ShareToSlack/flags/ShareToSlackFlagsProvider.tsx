import React, { useMemo } from 'react';

import type { FlagAPI } from '../../../common/types';

import FlagsContext from './FlagsContext';

type Props = FlagAPI & {
  children: React.ReactNode;
};

export default function ShareToSlackFlagsProvider({
  showFlag,
  children,
}: Props) {
  const value: FlagAPI = useMemo(() => ({ showFlag }), [showFlag]);

  return (
    <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
  );
}
