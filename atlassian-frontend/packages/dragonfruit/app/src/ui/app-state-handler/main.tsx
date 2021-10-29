import React from 'react';

import {
  Environment,
  getEnvironmentFromOrigin,
} from '@atlassian/dragonfruit-tenant-context';

import { useAppState } from '../../services/app-context';

export const AppStateHandler = () => {
  const appState = useAppState();
  const environment = getEnvironmentFromOrigin();

  if (appState.error !== undefined) {
    switch (appState.error) {
      case 'COMPASS_NOT_PROVISIONED':
        window.location.href = '/';
        return null;

      case 'NO_USER_PERMISSIONS':
        const destinationAfterAccess = window.location.href;

        if (
          environment === Environment.PROD ||
          environment === Environment.STAGING
        ) {
          // Redirect to request access
          window.location.href = `/login?application=compass&permission-violation=true&dest-url=${encodeURIComponent(
            destinationAfterAccess,
          )}`;

          return null;
        } else if (environment === Environment.LOCAL) {
          // Notify dev to request access to dev site
          // eslint-disable-next-line no-console
          console.error('You need to request access to the development site');
          return null;
        }
        return null;

      case 'TENANT_RETRIEVAL_ERROR':
        return <p>Tenant retrieval error</p>;

      case 'USER_NOT_AUTHENTICATED':
        const destinationAfterLogin = window.location.href;

        if (environment === Environment.PROD) {
          // Redirect to production login
          window.location.href = `https://id.atlassian.com/login?continue=${encodeURIComponent(
            destinationAfterLogin,
          )}`;
          return null;
        } else if (environment === Environment.STAGING) {
          // Redirect to staging login
          window.location.href = `https://id.stg.internal.atlassian.com/login?continue=${encodeURIComponent(
            destinationAfterLogin,
          )}`;
          return null;
        } else if (environment === Environment.LOCAL) {
          // Dev needs to set their cookies
          // eslint-disable-next-line no-console
          console.error('You need to set your cookies');
          return null;
        }
        return null;

      default:
        return <p>Unknown Error Occurred</p>;
    }
  } else {
    return null;
  }
};
