import React from 'react';

import { NarrowLayout } from '@atlassian/commerce-layout';

import { LoadingCreditCard as RealLoadingCreditCard } from './index';

export const LoadingCreditCard = () => (
  <NarrowLayout>
    <RealLoadingCreditCard visible />
  </NarrowLayout>
);
