import React from 'react';

import { ProgressCheck } from './index';

export const ProgressCheckCompleteExample = () => (
  <ProgressCheck complete={true} />
);

export const ProgressCheckIncompleteExample = () => (
  <ProgressCheck complete={false} />
);
