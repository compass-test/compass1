import React from 'react';

import { LoadingForm } from '@atlassian/commerce-billing-details';
import { TaskH1Skeleton } from '@atlassian/commerce-layout';

export const BillingStepLoadingState = () => (
  <>
    <div style={{ marginTop: 120 }} />
    <TaskH1Skeleton />
    <LoadingForm />
  </>
);
