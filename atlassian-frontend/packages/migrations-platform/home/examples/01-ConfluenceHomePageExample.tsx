import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import { AnalyticsButton as Button } from '@atlassian/mpt-elements';

import { HomePage } from '../src';
import {
  getAppsStats,
  getProductInstanceStats,
  getUsersAndGroupsStats,
} from '../src/ui/home-page/mocks';

export default function ConfluenceHomePage() {
  return (
    <IntlProvider locale="en">
      <HomePage
        productKey="confluence-server"
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
        onClickManage={action('onClickManage')}
      />
    </IntlProvider>
  );
}
