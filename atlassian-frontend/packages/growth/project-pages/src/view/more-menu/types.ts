import { InjectedIntlProps } from 'react-intl';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';

export type State = {
  isOpen: boolean;
};

export type StateProps = {
  isSpaceConnected: boolean;
  cloudId: string;
};

export type DispatchProps = {
  triggerConnectToSpace: () => void;
};

export type AnalyticsProps = {
  onOpenChange: (opened: boolean, analyticsEvent: UIAnalyticsEvent) => void;
  onDropdownItemClick: (isSpaceConnected: boolean, analyticsEvent: any) => void;
};

export type OwnProps = {};

export type Props = OwnProps &
  StateProps &
  DispatchProps &
  AnalyticsProps &
  InjectedIntlProps;
