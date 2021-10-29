import React from 'react';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import { MetricsExpiredScreen } from '../src';

export default () => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      background: colors.N800,
    }}
  >
    <MetricsExpiredScreen />
  </div>
);
