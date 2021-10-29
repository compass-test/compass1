import React from 'react';

import { isMPSDefinedFeature } from '@atlassian/chroma-modals';

import { features } from '../../common/assets/static-data';
import { Category, Feature, Plan } from '../../common/types';
import { AnalyticsProvider } from '../../common/utils/analytics-provider';

import CategoryRow from './category-row';
import PlansFooter from './plans-footer';
import PlansHeaderRow from './plans-header-row';
import PlansRow from './plans-row';
import { Wrapper } from './styled';
import { PlansTableProps } from './types';

export const PlansTable = ({
  currentPlan = Plan.FREE,
  highlightedPlan,
  onFeatureRowClick = () => null,
  onPlanChangeButtonClick = () => null,
  product = 'confluence',
  testId,
  analyticsOriginProduct,
  analyticsPlatformClient,
}: PlansTableProps) => {
  const productFeatures = features[product];
  let highlight = highlightedPlan;

  const analyticsAttributes = {
    sourceScreen: analyticsOriginProduct,
    product: product,
    highlightedPlan: highlightedPlan,
    currentEdition: currentPlan,
  };

  if (!highlight) {
    const planValues = Object.values(Plan);
    const currentPlanIndex = planValues.indexOf(currentPlan);
    const highlightedPlanIndex = Math.min(
      currentPlanIndex + 1,
      planValues.length - 1,
    );

    highlight = planValues[highlightedPlanIndex];
  }

  function isFeature(tableItem: Feature | Category): tableItem is Feature {
    return (tableItem as Feature).free !== undefined;
  }

  return (
    <AnalyticsProvider
      analyticsPlatformClient={analyticsPlatformClient}
      analyticsOriginProduct={analyticsOriginProduct}
    >
      <Wrapper testId={testId}>
        <PlansHeaderRow
          product={product}
          highlightedPlan={highlight}
          currentPlan={currentPlan}
          onPlanChangeButtonClick={onPlanChangeButtonClick}
        />
        {productFeatures.map((feature, index) => {
          if (isFeature(feature)) {
            return (
              <PlansRow
                key={feature.key}
                feature={feature}
                highlightedPlan={highlight}
                isLastRow={index === productFeatures.length - 1}
                onClick={() =>
                  isMPSDefinedFeature(feature.key)
                    ? onFeatureRowClick(feature.key, product)
                    : null
                }
              />
            );
          } else {
            return (
              <CategoryRow
                category={feature as Category}
                highlightedPlan={highlight}
              />
            );
          }
        })}
        <PlansFooter
          product={product}
          analyticsAttributes={analyticsAttributes}
        />
      </Wrapper>
    </AnalyticsProvider>
  );
};

export default PlansTable;
