import React from 'react';

import { NarrowLayout } from '@atlassian/commerce-layout';

import { ErrorCreditCard as RealErrorCreditCard } from './index';

export const ErrorCreditCard = () => (
  <NarrowLayout>
    <RealErrorCreditCard />
  </NarrowLayout>
);
