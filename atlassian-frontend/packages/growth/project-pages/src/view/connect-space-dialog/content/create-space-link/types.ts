import { InjectedIntlProps } from 'react-intl';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';

export interface OwnProps {
  onCreateSpace: (analyticsEvent: UIAnalyticsEvent) => void;
}

export interface StateProps {
  isConnectingSpace: boolean;
}

export interface Props extends InjectedIntlProps, OwnProps, StateProps {}
