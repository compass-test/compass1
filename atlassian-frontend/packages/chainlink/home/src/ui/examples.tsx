import React from 'react';

import { withFlagsProvider } from '@atlassian/flags-provider';

import { Home } from './index';

export default {
  decorators: [withFlagsProvider],
};

export const HelloChainlink = () => <Home name="Chainlink" />;
