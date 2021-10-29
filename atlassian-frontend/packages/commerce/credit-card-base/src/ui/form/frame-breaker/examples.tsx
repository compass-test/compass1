import React from 'react';

import { NarrowLayout } from '@atlassian/commerce-layout';

import { InsecureIframeErrorMessage } from './index';

export const FrameBreaker = () => (
  <NarrowLayout>
    <InsecureIframeErrorMessage />
  </NarrowLayout>
);
