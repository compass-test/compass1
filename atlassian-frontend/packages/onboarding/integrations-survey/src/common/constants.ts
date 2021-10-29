import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

import circleCILogo from './assets/logos/logo-circleci.svg';
import figmaLogo from './assets/logos/logo-figma.svg';
import githubLogo from './assets/logos/logo-github.svg';
import gitlabLogo from './assets/logos/logo-gitlab.svg';
import googleSheetsLogo from './assets/logos/logo-googlesheet.svg';
import halpLogo from './assets/logos/logo-halp.svg';
import invisionLogo from './assets/logos/logo-invision.svg';
import jenkinsLogo from './assets/logos/logo-jenkins.svg';
import teamsLogo from './assets/logos/logo-microsoft-teams.svg';
import insightLogo from './assets/logos/logo-mindville-insight.svg';
import octopusDeployLogo from './assets/logos/logo-octopus.svg';
import outlookLogo from './assets/logos/logo-outlook.svg';
import sentryLogo from './assets/logos/logo-sentry.svg';
import slackLogo from './assets/logos/logo-slack.svg';
import zendeskLogo from './assets/logos/logo-zendesk.svg';
import zeplinLogo from './assets/logos/logo-zeplin.svg';
import zoomLogo from './assets/logos/logo-zoom.svg';
import { Integrations } from './types';

export const integrationsKeys = {
  SLACK: 'com.atlassian.jira.slack',
  MICROSOFT_TEAMS: 'microsoft-teams',
  GITHUB: 'com.github.integration.production',
  GITLAB: 'gitlab-jira-connect-gitlab.com',
  SENTRY: 'sentry.io.jira',
  CIRCLECI: 'circleci.jira',
  ZENDESK: 'zendesk_for_jira',
  JENKINS: 'com.atlassian.jira.plugins.jenkins',
  FIGMA: 'com.figma.jira-add-on',
  ZEPLIN: 'io.zeplin.integration.jira',
  INVISION: 'com.invisionapp.integration.jira',
  ZOOM: 'zoom-jira-connector',
  GOOGLE_SHEETS: 'jira-sheets-official',
  HALP: 'halp.com',
  MINDVILLE: 'com.riadalabs.jira.plugins.insight',
  MICROSOFT_OUTLOOK: 'jira-outlook-integration',
  OCTOPUS: 'com.octopus.jiraconnectapp.production',
};

export const integrations: Integrations = {
  [integrationsKeys.SLACK]: {
    name: 'Slack',
    fullName: 'Jira Cloud for Slack (Official)',
    imgSrc: slackLogo,
    isConnect: true,
  },
  [integrationsKeys.MICROSOFT_TEAMS]: {
    name: 'Microsoft Teams',
    fullName: 'Microsoft Teams for Jira',
    imgSrc: teamsLogo,
  },
  [integrationsKeys.GITHUB]: {
    name: 'GitHub',
    fullName: 'GitHub for Jira',
    imgSrc: githubLogo,
  },
  [integrationsKeys.GITLAB]: {
    name: 'GitLab',
    fullName: 'GitLab.com for Jira Cloud',
    imgSrc: gitlabLogo,
  },
  [integrationsKeys.SENTRY]: {
    name: 'Sentry',
    fullName: 'Sentry for Jira',
    imgSrc: sentryLogo,
  },
  [integrationsKeys.ZENDESK]: {
    name: 'Zendesk',
    fullName: 'Zendesk Support for Jira',
    imgSrc: zendeskLogo,
  },
  [integrationsKeys.CIRCLECI]: {
    name: 'CircleCI',
    fullName: 'CircleCI for Jira',
    imgSrc: circleCILogo,
  },
  [integrationsKeys.JENKINS]: {
    name: 'Jenkins',
    fullName: 'Jenkins for Jira (official)',
    imgSrc: jenkinsLogo,
  },
  [integrationsKeys.ZEPLIN]: {
    name: 'Zeplin',
    fullName: 'Zeplin for Jira',
    imgSrc: zeplinLogo,
  },
  [integrationsKeys.FIGMA]: {
    name: 'Figma',
    fullName: 'Figma for Jira',
    imgSrc: figmaLogo,
  },
  [integrationsKeys.INVISION]: {
    name: 'InVision',
    fullName: 'InVision for Jira',
    imgSrc: invisionLogo,
  },
  [integrationsKeys.ZOOM]: {
    name: 'Zoom',
    fullName: 'Zoom Notifications for Jira',
    imgSrc: zoomLogo,
  },
  [integrationsKeys.GOOGLE_SHEETS]: {
    name: 'Google Sheets',
    fullName: 'Jira Cloud for Google Sheets (Official)',
    imgSrc: googleSheetsLogo,
  },
  [integrationsKeys.HALP]: {
    name: 'Halp',
    fullName: 'Halp: Two-way Slack integration for Jira',
    imgSrc: halpLogo,
  },
  [integrationsKeys.OCTOPUS]: {
    name: 'Octopus Deploy',
    fullName: 'Octopus Deploy for Jira',
    imgSrc: octopusDeployLogo,
  },
  [integrationsKeys.MINDVILLE]: {
    name: 'Mindville Insight',
    fullName: 'Insight - Asset Management',
    imgSrc: insightLogo,
  },
  [integrationsKeys.MICROSOFT_OUTLOOK]: {
    name: 'Microsoft Outlook',
    fullName: 'Jira Cloud for Outlook (Official)',
    imgSrc: outlookLogo,
  },
};

export const EMCEE_PATH = '/plugins/servlet/ac/com.atlassian.jira.emcee';
export const MANAGE_APP_REQUEST_PATH = `${EMCEE_PATH}/app-requests#!/manage/app-requests`;
export const MARKETPLACE_DEMAND_SERVICE_PATH = `/gateway/api/marketplace/internal/demand`;
export const EMCEE_END_USER_DISCOVER_PATH = `${EMCEE_PATH}/enduser-discover#!/discover`;
export const ATLASSIAN_ID_REQUIRED_ERROR_MESSAGE =
  'An atlassian Account Id is required';

export const EXISTS_STATUS_CODE = 200;
export const NOT_EXISTS_STATUS_CODE = 404;

export const getIntegrationsValidStatusCodes = [
  EXISTS_STATUS_CODE,
  NOT_EXISTS_STATUS_CODE,
];

export const testProps = {
  aaid: 'abc',
  productName: 'def',
  baseUrl: 'ghi',
  cloudId: 'jkl',
  fireAnalytics: (event: UIAnalyticsEvent) => event.fire(),
};
