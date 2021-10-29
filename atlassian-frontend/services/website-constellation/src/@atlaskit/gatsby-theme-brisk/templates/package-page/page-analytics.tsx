import React from 'react';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import { useLocation } from '@reach/router';

import { normalizeSourceName } from '../../../../utils/analytics';

interface PageAnalyticsProps {
  /**
   * Title of the page, for example "Avatar".
   */
  pageTitle: string;

  /**
   * Names of the tabs displayed on the page.
   * Used to get the current selected tab or default tab for analytics.
   */
  tabNames: string[];

  /**
   * Name of the package this documentation is for, e.g. "@atlaskit/avatar".
   */
  packageName: string;

  /**
   * Page component, probably.
   */
  children: React.ReactNode;
}

const getTabNameFromLocation = (
  path: string,
  tabs: string[],
): string | undefined => {
  const pathArray = path.split('/');
  const currentPage = pathArray[pathArray.length - 1];
  return tabs.includes(currentPage) ? currentPage : undefined;
};

export default function PageAnalytics(props: PageAnalyticsProps) {
  const { pathname } = useLocation();
  const tabName =
    getTabNameFromLocation(pathname, props.tabNames) || props.tabNames[0];
  const sourceName = normalizeSourceName(
    'components',
    props.pageTitle,
    tabName,
  );

  return (
    <ContextualAnalyticsData
      sourceType={SCREEN}
      sourceName="content"
      attributes={{
        name: sourceName,
        context: 'components',
        packageName: props.packageName,
      }}
    >
      <FireScreenAnalytics key={sourceName} />
      {props.children}
    </ContextualAnalyticsData>
  );
}
