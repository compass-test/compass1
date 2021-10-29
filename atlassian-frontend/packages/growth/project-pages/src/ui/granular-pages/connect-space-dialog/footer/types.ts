import { InjectedIntlProps } from 'react-intl';
import {
  ConnectSpaceDialogError,
  SelectedSpaceData,
} from '../../../../state/ui/connect-space/types';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';

type WithIsPageSelected = {
  isPageSelected: boolean;
};

export type OnRetryClickAnalyticsParams = {
  name: string;
} & Partial<WithIsPageSelected>;

export type OnConnectClickAnalyticsParams = Partial<WithIsPageSelected>;

export type Props = {
  isSubmitAllowed: boolean;
  isSubmitting: boolean;
  errorState?: ConnectSpaceDialogError;
  selectedSpace: SelectedSpaceData;
  onFetch: () => void;
  onConnect: () => void;
  onCancel: () => void;
  onRetryClick: (
    { name, isPageSelected }: OnRetryClickAnalyticsParams,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  onCancelClick: (analyticsEvent: UIAnalyticsEvent) => void;
  onConnectClick: (
    { isPageSelected }: OnConnectClickAnalyticsParams,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
} & InjectedIntlProps;
