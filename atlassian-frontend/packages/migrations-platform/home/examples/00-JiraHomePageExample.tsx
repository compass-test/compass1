import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import { AnalyticsButton as Button } from '@atlassian/mpt-elements';

import { HomePage } from '../src';
import {
  getAppsStats,
  getCustomersStats,
  getProductInstanceStats,
  getUsersAndGroupsStats,
} from '../src/ui/home-page/mocks';

export default function JiraHomePage() {
  return (
    <IntlProvider locale="en">
      <HomePage
        productKey="jira-server"
        headerButtons={
          <>
            <Button>Button 3</Button>
            <Button>Button 2</Button>
          </>
        }
        getUsersAndGroupsStats={getUsersAndGroupsStats}
        getProductInstanceStats={getProductInstanceStats}
        getAppsStats={getAppsStats}
        getCustomersStats={getCustomersStats}
        onClickAssessApps={action('onClickAssessApps')}
        onClickManage={action('onClickManage')}
      />
    </IntlProvider>
  );
}
