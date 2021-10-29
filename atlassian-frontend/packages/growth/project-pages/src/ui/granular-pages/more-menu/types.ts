import { InjectedIntlProps } from 'react-intl';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';

export type StateProps = {
  isSpaceConnected: boolean;
  spaceOrPageTitle: string | null;
  spaceOrPageLink: string | null;
  isConnectedToPage: boolean;
  spaceIcon: string | null;
};

export type DispatchProps = {
  triggerShowConnectSpaceDialog: () => void;
  triggerFetchConnectedSpacePageTitle: () => void;
};

export type AnalyticsProps = {
  onUpdateSpaceOrPageClick: (
    isSpaceConnected: boolean,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  onNavigateToConnectedSpaceOrPage: (
    isConnectedToPage: boolean,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
};

export type OwnProps = {};

export type Props = OwnProps &
  StateProps &
  DispatchProps &
  AnalyticsProps &
  InjectedIntlProps;
