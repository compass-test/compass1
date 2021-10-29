import React from 'react';
import { action } from '@storybook/addon-actions';

import Flags from './index';
import { mockIntl, generateMetadata } from '../../common/util/storybook';
import AnalyticsListener from '@atlaskit/analytics-next/AnalyticsListener';

const defaultProps = {
  intl: mockIntl,
  hasErrors: false,
  showSuccessFlag: false,
};

const defaultEventHandlers = {
  onErrorDismiss: action('onErrorDismiss triggered'),
  onSuccessDismiss: action('onSuccessDismiss triggered'),
  onReload: action('onReload triggered'),
};

export default generateMetadata('ProjectPagesComponent/Flags');

export const DefaultFlag = (props: any) => (
  <Flags {...defaultProps} {...defaultEventHandlers} {...props} />
);

export const ErrorFlag = (props: any) => (
  <Flags {...defaultProps} {...defaultEventHandlers} {...props} hasErrors />
);

export const SuccessFlag = (props: any) => (
  // eslint-disable-next-line no-console
  <AnalyticsListener onEvent={(...args) => console.log(...args)}>
    <Flags
      {...defaultProps}
      {...defaultEventHandlers}
      {...props}
      showSuccessFlag
    />
  </AnalyticsListener>
);

export const SuccessFlagWithSpaceName = () => (
  <SuccessFlag connectedSpaceOrPageName="FooBar" />
);
export const CommonFlagWithTitleAndDescription = () => (
  <SuccessFlag title="custom title" description="custom description" />
);
