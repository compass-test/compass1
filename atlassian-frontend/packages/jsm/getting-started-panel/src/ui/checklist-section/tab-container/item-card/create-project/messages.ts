import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface CreateProjectElements {
  projects: ReactElement;
  createProject: ReactElement;
  changeTemplate: ReactElement;
  create: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    createProjectDescription: {
      id: 'jsm.gettingStartedPanel.createProjectDescription',
      defaultMessage:
        'Create your project using the IT service management template.',
      description:
        'Create your project using the IT service management template.',
    },
    createProjectStep1: {
      id: 'jsm.gettingStartedPanel.createProjectStep1',
      defaultMessage: '1. Select the {projects} dropdown in the top navigation',
      description: `
    The first step to create your ITSM project
    {projects} will match 'jsm.gettingStartedPanel.projects' - The "Projects" dropdown in global nav.
    `,
    },
    createProjectStep2: {
      id: 'jsm.gettingStartedPanel.createProjectStep2',
      defaultMessage: '2. Select {createProject}',
      description: `
    The second step to create your ITSM project
    {createProject} will match 'jsm.gettingStartedPanel.createProject' - The "Create project" button in the Projects dropdown.
    `,
    },
    createProjectStep3: {
      id: 'jsm.gettingStartedPanel.createProjectStep3',
      defaultMessage: '3. Enter your project name',
      description: 'The third step to create your ITSM project',
    },
    createProjectStep4: {
      id: 'jsm.gettingStartedPanel.createProjectStep4',
      defaultMessage:
        '4. (To browse other template types) Select {changeTemplate}',
      description: `
    The fourth step to create your ITSM project
    {changeTemplate} will match 'jsm.gettingStartedPanel.changeTemplate' - The button for changing the template during project creation.
    `,
    },
    createProjectStep5: {
      id: 'jsm.gettingStartedPanel.createProjectStep5',
      defaultMessage: '5. Select {create}',
      description: `
    The fifth step to create your ITSM project
    {create} will match 'jsm.gettingStartedPanel.create' - The button for submitting the project create form.
    `,
    },
    createProjectLearnMore: {
      id: 'jsm.gettingStartedPanel.createProjectLearnMore',
      defaultMessage: 'Learn more about creating projects',
      description: 'Button to learn more about creating projects',
    },
  }),
};
