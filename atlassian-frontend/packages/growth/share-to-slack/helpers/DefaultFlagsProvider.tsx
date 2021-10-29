import React, { useCallback } from 'react';

import { FlagsProvider, useFlags as useAKFlags } from '@atlaskit/flag';
import Tick from '@atlaskit/icon/glyph/check-circle';
import Error from '@atlaskit/icon/glyph/error';
import { G400, R300 } from '@atlaskit/theme/colors';

import type { Flag, FlagAPI } from '../src/common/types';
import ShareToSlackFlagsProvider from '../src/ui/ShareToSlack/flags/ShareToSlackFlagsProvider';

type FlagType = Flag['type'];

const icons: { [key in FlagType]: React.FC } = {
  success: React.memo(() => <Tick label="Success" secondaryColor={G400} />),
  error: React.memo(() => <Error label="Error icon" secondaryColor={R300} />),
};

type Props = {
  children: (showFlag: FlagAPI['showFlag']) => React.ReactNode;
};

/**
 * Wraps <code>ShareToSlackFlagsProvider</code> in <code>FlagsProvider</code>
 */
export default function DefaultFlagsProvider({ children }: Props) {
  return (
    <FlagsProvider>
      <Inner>{children}</Inner>
    </FlagsProvider>
  );
}

function Inner({ children }: Props) {
  const { showFlag: showAKFlag } = useAKFlags();

  const showFlag: FlagAPI['showFlag'] = useCallback(
    ({ type, ...restFlag }) => {
      const Icon = icons[type];

      showAKFlag({ ...restFlag, appearance: type, icon: <Icon /> });
    },
    [showAKFlag],
  );

  return (
    <ShareToSlackFlagsProvider showFlag={showFlag}>
      {children(showFlag)}
    </ShareToSlackFlagsProvider>
  );
}
