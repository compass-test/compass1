import React, { FC, PropsWithChildren } from 'react';

import * as BillingDetailsListeners from '@atlassian/commerce-billing-details/telemetry-listeners';
import * as BillingHistoryListeners from '@atlassian/commerce-billing-history/telemetry-listeners';
import * as CreditCardCcpListeners from '@atlassian/commerce-credit-card-ccp/telemetry-listeners';
import * as CreditCardHamsListeners from '@atlassian/commerce-credit-card-hams/telemetry-listeners';
import * as CommerceEnviromentListeners from '@atlassian/commerce-environment/telemetry-listeners';
import * as PaymentFlowListeners from '@atlassian/commerce-payment-flow/telemetry-listeners';
import * as ReCaptchaBaseListeners from '@atlassian/commerce-recaptcha-base/telemetry-listeners';
import * as ReCaptchaHamsListeners from '@atlassian/commerce-recaptcha-hams/telemetry-listeners';
import { ChannelVersionFragmentationSafeGuard } from '@atlassian/commerce-telemetry';
import * as UIListeners from '@atlassian/commerce-telemetry/listeners';

const SafeGuard: FC = ({ children }) => (
  <ChannelVersionFragmentationSafeGuard
    childPackageListenerModules={[
      BillingDetailsListeners,
      BillingHistoryListeners,
      CommerceEnviromentListeners,
      CreditCardCcpListeners,
      CreditCardHamsListeners,
      PaymentFlowListeners,
      ReCaptchaHamsListeners,
      ReCaptchaBaseListeners,
    ]}
  >
    {children}
  </ChannelVersionFragmentationSafeGuard>
);

export const withSafeGuard = <T extends PropsWithChildren<any>>(
  Component: React.ComponentType<T>,
): FC<T> => (props) => (
  <Component {...props}>
    {SafeGuard({
      children: props.children,
    })}
  </Component>
);

export const GasV3UIEventListener = withSafeGuard(
  UIListeners.GasV3UIEventListener,
);
export const GasV3ScreenEventListener = withSafeGuard(
  UIListeners.GasV3ScreenEventListener,
);
export const GasV3TrackEventListener = withSafeGuard(
  UIListeners.GasV3TrackEventListener,
);
export const GasV3OperationalEventListener = withSafeGuard(
  UIListeners.GasV3OperationalEventListener,
);
export const MetalListener = withSafeGuard(UIListeners.MetalListener);
export const SentryExceptionListener = withSafeGuard(
  UIListeners.SentryExceptionListener,
);
