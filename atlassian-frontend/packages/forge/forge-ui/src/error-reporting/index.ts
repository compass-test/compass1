import { ErrorInfo } from 'react';
import {
  ProductEnvironment,
  ForgeUIExtensionType,
} from '@atlassian/forge-ui-types';

export interface ErrorDetails {
  error: Error;
  environment: ProductEnvironment;
  errorInfo: ErrorInfo;
  page: string;
  extension?: ForgeUIExtensionType;
}

export const captureAndReportError = async ({
  error,
  environment,
  extension,
  page,
  errorInfo,
}: ErrorDetails) => {
  try {
    const module = await import('@sentry/browser');
    const { BrowserClient, Hub } = module;

    const client = new BrowserClient({
      environment,
      dsn:
        'https://1210cfc4338849588134f2c80b99f75c@sentry.prod.atl-paas.net/1031',
    });

    const hub = new Hub(client);

    hub.withScope((scope) => {
      scope.setExtra('componentTrace', {
        errorInfo,
        componentStack: errorInfo.componentStack.substring(0, 1000),
      });
      scope.setTag('extensionPoint', page);

      if (extension) {
        scope.setExtra('extensionProperties', extension.properties);
        if (extension.environmentType) {
          scope.setTag('forgeEnvironment', extension.environmentType);
        }
        if (extension.type) {
          scope.setTag('extensionType', extension.type);
        }
        if (extension.appOwner) {
          scope.setTag('appOwner', extension.appOwner.accountId);
        }
      }
      hub.captureException(error);
    });
    return client.close();
  } catch (e) {
    // Error reporting failed, we don't want to cause a unhandledrejection event
  }
};
