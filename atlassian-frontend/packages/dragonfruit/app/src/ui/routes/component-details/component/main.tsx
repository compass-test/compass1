import React from 'react';

import { useRouter } from 'react-resource-router';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { ComponentDetails } from '@atlassian/dragonfruit-page-component-details';
import {
  ComponentDetailPageUrlParam,
  withErrorBoundary,
} from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'componentDetails';

export default withErrorBoundary(
  () => {
    const [{ match }] = useRouter();

    const componentId = match.params.componentId ?? '';
    const pageType = match.params.componentPage as ComponentDetailPageUrlParam;
    const extensionId = match.params.extensionId;

    return (
      <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
        <ComponentDetails
          componentResourceId={componentId}
          pageType={pageType}
          extensionId={extensionId}
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
