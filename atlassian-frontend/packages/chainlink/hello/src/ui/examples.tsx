import React from 'react';

import { withFlagsProvider } from '@atlassian/flags-provider';

import { Hello } from './index';

export default {
  decorators: [withFlagsProvider],
};

export const HelloChainlink = () => <Hello name="Chainlink" />;
