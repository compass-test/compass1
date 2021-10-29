import React from 'react';

import {
  ContextualAnalyticsData,
  SourceType,
} from '@atlassian/analytics-bridge';
import { ReportErrors } from '@atlassian/error-handling';

import { ANALYTICS_SOURCE_NAME } from '../../constants';

export type ModalBoundaryProps = {
  sourceType: SourceType;
  sourceId: string;
  sourcePackage?: string;
  attributes?: Record<string, any>;
  children?: React.ReactNode;
};

export const ModalScreenBoundary = ({
  sourceType,
  sourceId,
  sourcePackage = ANALYTICS_SOURCE_NAME,
  attributes,
  children,
}: ModalBoundaryProps): React.ReactElement => {
  return (
    <ContextualAnalyticsData
      sourceType={sourceType}
      sourceName={sourceId}
      attributes={attributes}
    >
      <ReportErrors id={sourceId} packageName={sourcePackage}>
        {children}
      </ReportErrors>
    </ContextualAnalyticsData>
  );
};
