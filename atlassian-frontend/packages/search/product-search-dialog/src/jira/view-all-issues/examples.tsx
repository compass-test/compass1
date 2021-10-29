import React from 'react';
import { IntlProvider } from 'react-intl';
import ViewAllIssuesLink from './view-all-issues';
import { action } from '@storybook/addon-actions';

export const basic = () => (
  <IntlProvider locale="en">
    <ViewAllIssuesLink query="test" onClick={action('onAdvancedSearchClick')} />
  </IntlProvider>
);

export default {
  title: 'Jira Search Dialog/Search Results/Advanced issue search link',
};
