import React from 'react';

import { actions } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { IntlProvider } from 'react-intl';

import PlansTable from '../src';
import { OriginProduct, Plan, SupportedProduct } from '../src/common/types';
const planOptions = [null, ...Object.values(Plan)];
const productOptions = ['confluence', 'jira-software', 'jira-servicedesk'];
const groupId = 'Plans Table Options';
import { actionAndConsoleAnalyticsClient } from '../src/common/utils/storybook/analytics';

const eventsFromObject = actions({
  onFeatureRowClick: 'feature row clicked',
  onPlanChangeButtonClick: 'plan change button clicked',
});

export default function Basic() {
  const currentPlanValue: Plan = select(
    'Current Plan',
    // @ts-ignore
    planOptions,
    Plan.FREE,
    groupId,
  ) as Plan;
  const highlightedPlanValue: Plan = select(
    'Highlighted Plan',
    // @ts-ignore
    planOptions,
    null,
    groupId,
  ) as Plan;
  const productValue: SupportedProduct = select(
    'Product',
    productOptions,
    'jira-software',
    groupId,
  ) as SupportedProduct;

  return (
    <IntlProvider>
      <PlansTable
        currentPlan={currentPlanValue}
        highlightedPlan={highlightedPlanValue}
        product={productValue}
        {...eventsFromObject}
        testId="chroma-plans-table"
        analyticsOriginProduct={OriginProduct.ADMINHUB}
        analyticsPlatformClient={actionAndConsoleAnalyticsClient}
      />
    </IntlProvider>
  );
}
