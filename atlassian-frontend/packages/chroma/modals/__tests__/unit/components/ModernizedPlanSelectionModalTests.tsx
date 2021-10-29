import React from 'react';

import { Editions, ProductKeys } from '../../../src/common/constants';
import { mountWithIntl } from '../../../src/common/utils/test-helpers';
import {
  isMPSDefinedFeature,
  ModernizedPlanSelectionModal,
} from '../../../src/ui/modernized-plan-selection-container';

describe('Modernized Plan Selection Modal', () => {
  it('Should render correct text given a feature', () => {
    const mockProps = {
      featureModal: 'userLimits',
      product: ProductKeys.CONFLUENCE,
      edition: Editions.FREE,
      analyticsOriginProduct: ProductKeys.CONFLUENCE,
      analyticsPlatformClient: 'TEST-CLIENT',
    };
    const wrapper = mountWithIntl(
      <ModernizedPlanSelectionModal {...mockProps} />,
    );
    const headerText = wrapper.findWhere((n: { text: () => string }) => {
      return n.text() === 'User limit';
    });
    const subHeaderText = wrapper.findWhere((n: { text: () => string }) => {
      return (
        n.text() === 'Get the flexibility to grow your team beyond 10 users.'
      );
    });
    const featureOneText = wrapper.findWhere((n: { text: () => string }) => {
      return n.text() === 'Track and plan with your entire team.';
    });
    const featureTwoText = wrapper.findWhere((n: { text: () => string }) => {
      return n.text() === 'Allow anyone on your team to invite new users.';
    });
    const featureThreeText = wrapper.findWhere((n: { text: () => string }) => {
      return (
        n.text() ===
        'Sync all your users from Google, Slack, and more without hitting limits.'
      );
    });
    expect(headerText.length).toBeGreaterThanOrEqual(1);
    expect(subHeaderText.length).toBeGreaterThanOrEqual(1);
    expect(featureOneText.length).toBeGreaterThanOrEqual(1);
    expect(featureTwoText.length).toBeGreaterThanOrEqual(1);
    expect(featureThreeText.length).toBeGreaterThanOrEqual(1);
  });
});

describe('isMPSDefinedFeature', () => {
  it('Should return true if a feature message and image exist', () => {
    expect(isMPSDefinedFeature('userLimits')).toEqual(true);
  });

  it('Should return false if a feature message or image does not exist', () => {
    expect(isMPSDefinedFeature('invalidFeature')).toEqual(false);
  });
});
