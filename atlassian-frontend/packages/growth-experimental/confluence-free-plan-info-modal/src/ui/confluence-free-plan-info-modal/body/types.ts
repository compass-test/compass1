import React from 'react';

import { FormattedMessage } from 'react-intl';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export interface FeatureItem {
  icon: any;
  title: FormattedMessage.MessageDescriptor;
  description: FormattedMessage.MessageDescriptor;
}

export interface BodyProps {
  onPrimaryActionClick: (
    _: React.MouseEvent,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  onSecondaryActionClick: (
    _: React.MouseEvent,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
}
