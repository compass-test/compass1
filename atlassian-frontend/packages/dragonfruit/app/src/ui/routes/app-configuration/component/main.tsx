import React from 'react';

import { useRouter } from 'react-resource-router';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { AppConfigPage } from '@atlassian/dragonfruit-page-apps';
import { decodeURIParam } from '@atlassian/dragonfruit-routes';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'apps';

export default withErrorBoundary(
  () => {
    const [{ match }] = useRouter();

    const encoded = match.params.extensionId || '';
    const extensionId = decodeURIParam(encoded) || '';

    return (
      <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
        <AppConfigPage
          extensionId={extensionId}
          pageUrl={window.location.href}
        />
        <FireScreenAnalytics />
      </ContextualAnalyticsData>
    );
  },
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
