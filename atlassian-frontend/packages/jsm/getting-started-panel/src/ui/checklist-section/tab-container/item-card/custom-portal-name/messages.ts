import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface CustomPortalNameElements {
  projectSettings: ReactElement;
  portalSettings: ReactElement;
  serviceProjectInformation: ReactElement;
  namePortal: ReactElement;
  savePortal: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    customizePortalNameDescription: {
      id: 'jsm.gettingStartedPanel.customizePortalNameDescription',
      defaultMessage:
        'Keep it clear and relevant so users are sure they’re in the right place.',
      description: 'Summary of why we want to customize portal',
    },
    customizePortalNameStep1: {
      id: 'jsm.gettingStartedPanel.customizePortalNameStep1',
      defaultMessage: '1. Go to {projectSettings} > {portalSettings}',
      description: `
      The first step to customize your portal.
      {projectSettings} will match 'jsm.gettingStartedPanel.projectSettings' - Heading/button for the project settings page.
      {portalSettings} will match 'jsm.gettingStartedPanel.portalSettings' - Heading/button for the portal settings page.
    `,
    },
    customizePortalNameStep2: {
      id: 'jsm.gettingStartedPanel.customizePortalNameStep2',
      defaultMessage:
        '2. In the {serviceProjectInformation} section, enter the new portal name under {namePortal}',
      description: `
      The second step to customize your portal.
      {serviceProjectInformation} will match 'jsm.gettingStartedPanel.serviceProjectInformation' - Heading for the service project information section in portal settings.
      {namePortal} will match 'jsm.gettingStartedPanel.namePortal' - The "name" option under service project information in portal settings.
    `,
    },
    customizePortalNameStep3: {
      id: 'jsm.gettingStartedPanel.customizePortalNameStep3',
      defaultMessage: '3. Click {savePortal}',
      description: `
      The third step to customize your portal.
      {savePortal} will match 'jsm.gettingStartedPanel.savePortal' - The "save" button in portal settings.
    `,
    },
    customizePortalNameLearnMore: {
      id: 'jsm.gettingStartedPanel.customizePortalNameLearnMore',
      defaultMessage: 'Learn more about your portal',
      description: 'Button to learn more about your portal',
    },
  }),
};
