import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface CustomPortalLogoElements {
  projectSettings: ReactElement;
  portalSettings: ReactElement;
  serviceProjectInformation: ReactElement;
  addLogo: ReactElement;
  uploadAnImage: ReactElement;
  upload: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    customizePortalLogoDescription: {
      id: 'jsm.gettingStartedPanel.customizePortalLogoDescription',
      defaultMessage:
        'Use your brand logo if possible, something users can recognize and feel familiar with.',
      description: 'Adding a logo to your portal',
    },
    customizePortalLogoStep1: {
      id: 'jsm.gettingStartedPanel.customizePortalLogoStep1',
      defaultMessage: '1. Go to {projectSettings} > {portalSettings}',
      description: `
      The first step to add a logo to your portal.
      {projectSettings} will match 'jsm.gettingStartedPanel.projectSettings' - Heading/button for the project settings page.
      {portalSettings} will match 'jsm.gettingStartedPanel.portalSettings' - Heading/button for the portal settings page.
    `,
    },
    customizePortalLogoStep2: {
      id: 'jsm.gettingStartedPanel.customizePortalLogoStep2',
      defaultMessage:
        '2. In the {serviceProjectInformation} section, click {addLogo}',
      description: `
      The second step to add a logo to your portal.
      {serviceProjectInformation} will match 'jsm.gettingStartedPanel.serviceProjectInformation' - Heading for the service project information section in portal settings.
      {addLogo} will match 'jsm.gettingStartedPanel.addLogo' - The "Add logo" button under service project information in portal settings.
    `,
    },
    customizePortalLogoStep3: {
      id: 'jsm.gettingStartedPanel.customizePortalLogoStep3',
      defaultMessage:
        '3. Drag and drop an image in, or click {uploadAnImage} to select one from your computer',
      description: `
      The third step to add a logo to your portal.
      {uploadAnImage} will match 'jsm.gettingStartedPanel.uploadAnImage' - The "Upload an image" button in portal settings.
    `,
    },
    customizePortalLogoStep4: {
      id: 'jsm.gettingStartedPanel.customizePortalLogoStep4',
      defaultMessage: '4. Click {upload}',
      description: `
      The fourth step to add a logo to your portal.
      {upload} will match 'jsm.gettingStartedPanel.upload' - The "Upload" button for submitting a file to be uploaded in portal settings.
    `,
    },
    customizePortalLogoLearnMore: {
      id: 'jsm.gettingStartedPanel.customizePortalLogoLearnMore',
      defaultMessage: 'Learn more about your portal',
      description: 'Button to learn more about your portal',
    },
  }),
};
