import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface AddChangeApproversElements {
  serviceHub: ReactElement;
  createService: ReactElement;
  ellipsis: ReactElement;
  editService: ReactElement;
  changeApprovers: ReactElement;
  saveService: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    addChangeApproversDescription: {
      id: 'jsm.gettingStartedPanel.addChangeApproversDescription',
      defaultMessage:
        'These will be the go-to approvers for any changes on a specific service.',
      description: 'Summary of what adding change approvers can do',
    },
    addChangeApproversStep1: {
      id: 'jsm.gettingStartedPanel.addChangeApproversStep1',
      defaultMessage: '1. Go to {serviceHub}',
      description: `
    The first step to add change approvers.
    {serviceHub} will match 'jsm.gettingStartedPanel.serviceHub' - The Service hub page in a service project.
  `,
    },
    addChangeApproversStep2: {
      id: 'jsm.gettingStartedPanel.addChangeApproversStep2',
      defaultMessage:
        '2. (To add approvers to a new service) Select {createService}',
      description: `
    The second step to add change approvers.
    {createService} will match 'jsm.gettingStartedPanel.createService' - Button to add a new service in the service hub.
  `,
    },
    addChangeApproversStep3: {
      id: 'jsm.gettingStartedPanel.addChangeApproversStep3',
      defaultMessage:
        '3. (To add approvers to an existing service) Select the connected service name > {ellipsis} > {editService}',
      description: `
    The third step to add change approvers.
    {ellipsis} will match 'jsm.gettingStartedPanel.ellipsis' - The meatballs menu for a service in Service hub.
    {editService} will match 'jsm.gettingStartedPanel.editService' - The "edit" meatballs option for an ITSM Service.
  `,
    },
    addChangeApproversStep4: {
      id: 'jsm.gettingStartedPanel.addChangeApproversStep4',
      defaultMessage: '4. Select the {changeApprovers}',
      description: `
    The fourth step to add change approvers.
    {changeApprovers} will match 'jsm.gettingStartedPanel.changeApprovers' - The "Change approvers" field for an ITSM service.
  `,
    },
    addChangeApproversStep5: {
      id: 'jsm.gettingStartedPanel.addChangeApproversStep5',
      defaultMessage: '5. Select {saveService}',
      description: `
    The fifth step to add change approvers.
    {saveService} will match 'jsm.gettingStartedPanel.saveService' - The "save" button in service hub.
  `,
    },
    addChangeApproversDescriptionNote: {
      id: 'jsm.gettingStartedPanel.addChangeApproversDescriptionNote',
      defaultMessage:
        'Note: You may need to create a group of Change approvers before you can select them.',
      description:
        'A note text that appears after the add change approvers steps',
    },
    addChangeApproversLearnMore: {
      id: 'jsm.gettingStartedPanel.addChangeApproversLearnMore',
      defaultMessage: 'Learn about creating services and change approvers',
      description:
        'Link text to open documentation about creating services and change approvers',
    },
  }),
};
