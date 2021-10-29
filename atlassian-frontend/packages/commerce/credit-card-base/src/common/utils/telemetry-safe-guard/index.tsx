import React, { FC } from 'react';

import * as CommerceEnviromentListeners from '@atlassian/commerce-environment/telemetry-listeners';
import { ChannelVersionFragmentationSafeGuard } from '@atlassian/commerce-telemetry';

export const SafeGuard: FC = ({ children }) => (
  <ChannelVersionFragmentationSafeGuard
    childPackageListenerModules={[CommerceEnviromentListeners]}
  >
    {children}
  </ChannelVersionFragmentationSafeGuard>
);
