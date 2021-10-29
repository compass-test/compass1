import React from 'react';

import { IntlProvider } from 'react-intl';

import { toLanguageTag } from '@atlassian/proforma-translations';

import { IssueViewBaseApp } from '../src/components';

import { locale, moduleContext, settings } from './mocks/MockIssueFormApiV3';

export default function IssueViewPanelOpen() {
  return (
    <div data-testid="proforma-jira-issue-view">
      <IntlProvider locale={toLanguageTag(locale)}>
        <IssueViewBaseApp
          settings={settings}
          moduleContext={moduleContext}
          panelAddFormButtonClickedCount={1}
        />
      </IntlProvider>
    </div>
  );
}
