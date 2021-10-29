import { InjectedIntlProps } from 'react-intl';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { WithGranularPagesExperimentProps } from '../../types';

export type DispatchProps = {
  showConnectSpaceDialog: () => void;
};

export type OwnProps = WithGranularPagesExperimentProps;

export type Props = DispatchProps &
  OwnProps &
  InjectedIntlProps & {
    onConnectSpaceClick: (analyticsEvent: UIAnalyticsEvent) => void;
  };
