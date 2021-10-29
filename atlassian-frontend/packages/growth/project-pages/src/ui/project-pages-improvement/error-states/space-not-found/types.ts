import { InjectedIntlProps } from 'react-intl';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export type DispatchProps = {
  showConnectSpaceDialog: () => void;
};

export type Props = DispatchProps &
  InjectedIntlProps & {
    onClick: (analyticsEvent: UIAnalyticsEvent) => void;
  };
