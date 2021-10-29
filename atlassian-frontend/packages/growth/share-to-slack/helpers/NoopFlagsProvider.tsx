import React from 'react';

import type { FlagAPI } from '../src/common/types';
import FlagsContext from '../src/ui/ShareToSlack/flags/FlagsContext';

type Props = {
  children: React.ReactNode;
};

const value: FlagAPI = {
  showFlag: () => () => {},
};

/**
 * Dummy flags provider for testing only
 */
export default function NoopFlagsProvider({ children }: Props) {
  return (
    <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
  );
}
