import { InjectedIntlProps } from 'react-intl';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';

import { ConnectSpaceDialogError } from '../../../state/ui/connect-space/types';

export interface OwnProps {}

export interface StateProps {
  errorState?: ConnectSpaceDialogError;
  isSubmitAllowed: boolean;
  isSubmitting: boolean;
}

export interface DispatchProps {
  onFetch: () => void;
  onConnect: () => void;
  onCancel: () => void;
}

export type DefaultProps = {
  errorState: ConnectSpaceDialogError;
};

export interface AnalyticsProps {
  onRetryClick: (action: string, event: UIAnalyticsEvent) => void;
  onConnectClick: (event: UIAnalyticsEvent) => void;
  onCancelClick: (event: UIAnalyticsEvent) => void;
}

export interface Props
  extends OwnProps,
    Required<StateProps>,
    DefaultProps,
    InjectedIntlProps,
    DispatchProps,
    AnalyticsProps {}
