import React from 'react';

import { action } from '@storybook/addon-actions';

import { AnalyticsListener } from '@atlaskit/analytics-next';

import { IntegrationsSurvey } from '../src';
import { testProps } from '../src/common/constants';

const props = {
  ...testProps,
  checkboxDefaultValue: true,
  onMount: action('Fired on mount'),
};

export default function () {
  return (
    <AnalyticsListener onEvent={action('Analytics event fired')}>
      <IntegrationsSurvey {...props} />
    </AnalyticsListener>
  );
}
