import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface NotificationsElements {
  settings: ReactElement;
  notifications: ReactElement;
  sms: ReactElement;
  voice: ReactElement;
  notificationRules: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    notificationsDescription: {
      id: 'jsm.gettingStartedPanel.notificationsDescription',
      defaultMessage:
        'To get notified of major incidents, you’ll first need to set up your profile.',
      description:
        'Summary of why we need to set up profile to get notified of major incidents',
    },
    notificationsStep1: {
      id: 'jsm.gettingStartedPanel.notificationsStep1',
      defaultMessage:
        '1. From Jira Service Management, select {alerts} in the main navigation sidebar to go to Opsgenie',
      description: `
      The first step to set up your profile
      {alerts} will match 'jsm.gettingStartedPanel.alerts' - The link in JSM navigation sidebar to go to the Opsgenie alerts page.
    `,
    },
    notificationsStep2: {
      id: 'jsm.gettingStartedPanel.notificationsStep2',
      defaultMessage: '2. Select {settings} > {notifications}',
      description: `
    The second step to set up your profile.
    {settings} will be the untranslated string "Settings" - The Settings page in Opsgenie.
    {notifications} will be the untranslated string "Notifications" - The Notifications page in Opsgenie settings.
    `,
    },
    notificationsStep3: {
      id: 'jsm.gettingStartedPanel.notificationsStep3',
      defaultMessage: '3. Enter your phone number under {sms} and {voice}',
      description: `
    The third step to set up your profile.
    {sms} will be the untranslated string "SMS" - The "SMS" section of Opsgenie notifications settings.
    {voice} will be the untranslated string "Voice" - The "Voice" (phone number) section of Opsgenie notifications settings.
    `,
    },
    notificationsStep4: {
      id: 'jsm.gettingStartedPanel.notificationsStep4',
      defaultMessage: '4. Scroll down the page to set your {notificationRules}',
      description: `
    The fourth step to set up your profile.
    {notificationRules} will be the untranslated string "Notification rules" - the "Notification rules" section of Opsgenie notifications settings.
    `,
    },
    notificationsLearnMore: {
      id: 'jsm.gettingStartedPanel.notificationsLearnMore',
      defaultMessage: 'Learn more about Opsgenie notifications',
      description: 'Button to learn more about Opsgenie notifications',
    },
  }),
};
