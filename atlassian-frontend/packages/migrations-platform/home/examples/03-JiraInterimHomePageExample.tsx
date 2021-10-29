import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import { AnalyticsButton as Button } from '@atlassian/mpt-elements';

import { HomePageInterim } from '../src';
import {
  getAppsStats,
  getProductInstanceStats,
  getUsersAndGroupsStats,
} from '../src/ui/home-page/mocks';

export default function JiraInterimHomePage() {
  return (
    <IntlProvider locale="en">
      <HomePageInterim
        productKey="jira-server"
        headerButtons={
          <>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </>
        }
        getUsersAndGroupsStats={getUsersAndGroupsStats}
        getProductInstanceStats={getProductInstanceStats}
        getAppsStats={getAppsStats}
        onClickAssessApps={action('onClickAssessApps')}
        onClickMigrateData={action('onClickMigrateData')}
        onClickPrepareApps={action('onClickPrepareApps')}
        appsMigrationEapEnabled={false}
      />
    </IntlProvider>
  );
}
