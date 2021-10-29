import React, { FC } from 'react';

import { FlagsProvider } from '@atlassian/flags-provider';

export const Providers: FC = ({ children }) => (
  <FlagsProvider>{children}</FlagsProvider>
);
