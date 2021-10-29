import React from 'react';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import CsvImportPage from '@atlassian/dragonfruit-csv-import';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'csvImport';

export default withErrorBoundary(
  () => {
    return (
      <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
        <CsvImportPage />
        <FireScreenAnalytics />
      </ContextualAnalyticsData>
    );
  },
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
