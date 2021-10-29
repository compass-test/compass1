import React from 'react';

import { useRouter } from 'react-resource-router';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { ComponentListPage } from '@atlassian/dragonfruit-page-component-list';
import {
  ComponentListTypeUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'componentList';

export default withErrorBoundary(
  () => {
    const [{ match }, { replace }] = useRouter();

    const componentType = getComponentTypeFromParam(
      match.params.componentType || '',
    );

    // Redirect to service list if user navigates to root '/components' route)
    if (!componentType) {
      replace(routes.COMPONENTS(ComponentListTypeUrlParam.SERVICES));
      return <></>;
    }

    return (
      <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
        <ComponentListPage componentType={componentType} />
        <FireScreenAnalytics />
      </ContextualAnalyticsData>
    );
  },
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);

function getComponentTypeFromParam(
  param: string,
): ComponentListTypeUrlParam | undefined {
  switch (param.toLowerCase()) {
    case ComponentListTypeUrlParam.SERVICES:
      return ComponentListTypeUrlParam.SERVICES;
    case ComponentListTypeUrlParam.APPLICATIONS:
      return ComponentListTypeUrlParam.APPLICATIONS;
    case ComponentListTypeUrlParam.LIBRARIES:
      return ComponentListTypeUrlParam.LIBRARIES;
    case ComponentListTypeUrlParam.OTHER:
      return ComponentListTypeUrlParam.OTHER;
    default:
      return undefined;
  }
}
