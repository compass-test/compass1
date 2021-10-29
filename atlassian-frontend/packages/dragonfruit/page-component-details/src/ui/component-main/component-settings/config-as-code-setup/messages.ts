import { defineMessages } from 'react-intl';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';

export default defineMessages({
  heading: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.heading',
    defaultMessage: `Set up ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Heading for the modal on the component details page to set up a compass.yml file to link to the component',
  },
  learnMore: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.learn-more.nonfinal',
    defaultMessage: `Learn more about formatting a compass.yml file`,
    description:
      'Learn more message for the modal on the component details page to set up a compass.yml file to link to the component',
  },
  description: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.description',
    defaultMessage:
      'Set up config-as-code to manage your component alongside your code.',
    description: 'Describes the purpose of the modal',
  },
  firstStepHeading: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.first-step-heading.nonfinal',
    defaultMessage: `Create ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Describes the action to copy the yaml file displayed below this message',
  },
  secondStepHeading: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.second-step-heading.nonfinal',
    defaultMessage: `Add ${CONFIG_AS_CODE_FILE_NAME} to your repository`,
    description:
      'Describes the action to add the yaml file to a git repository',
  },
  addToRepositoryStep1: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.add-to-repository-step-1',
    defaultMessage: 'Name the file',
    description: 'Describes the action to name the file',
  },
  addToRepositoryStep2: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.add-to-repository-step-2',
    defaultMessage: 'Add the file anywhere in your component’s repository.',
    description:
      'Describes the action to add the yaml file to a git repository',
  },
  addToRepositoryStep3: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.add-to-repository-step-3',
    defaultMessage:
      'Ensure the repository is located in the connected container',
    description:
      'Describes the action to add the yaml file to a git repository',
  },
  addToRepositoryStep4: {
    id:
      'dragonfruit-external-component-management.ui.config-as-code-setup-modal.add-to-repository-step-4',
    defaultMessage: 'Commit the file to the default branch of your repository.',
    description:
      'Describes the action to commit the yaml file to a git repository',
  },
});
