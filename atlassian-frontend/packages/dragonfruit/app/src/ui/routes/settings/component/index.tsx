import React from 'react';

import { Redirect } from 'react-resource-router';

import { routes } from '@atlassian/dragonfruit-routes';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'root';

const SettingsRedirectComponent = () => {
  return <Redirect to={routes.SCORECARD_LIST()} />;
};

export default withErrorBoundary(SettingsRedirectComponent, {
  componentName: PAGE,
  Fallback: ErrorPage,
});
