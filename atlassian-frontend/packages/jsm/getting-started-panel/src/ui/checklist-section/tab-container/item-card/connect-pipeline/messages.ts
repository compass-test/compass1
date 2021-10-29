import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface ConnectPipelineElements {
  projectSettings: ReactElement;
  changeManagement: ReactElement;
  connectPipeline: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    connectPipelineDescription: {
      id: 'jsm.gettingStartedPanel.connectPipelineDescription',
      defaultMessage:
        'This will enable you to automatically create requests as changes are submitted.',
      description: 'Summary of what connecting pipelines means',
    },
    connectPipelineStep1: {
      id: 'jsm.gettingStartedPanel.connectPipelineStep1',
      defaultMessage: '1. Go to {projectSettings} > {changeManagement}',
      description: `
    The first step to connect pipelines.
    {projectSettings} will match 'jsm.gettingStartedPanel.projectSettings' - Heading/button for the project settings page.
    {changeManagement} will match 'jsm.gettingStartedPanel.changeManagement' - Heading for the Change management page in project settings.
    `,
    },
    connectPipelineStep2: {
      id: 'jsm.gettingStartedPanel.connectPipelineStep2',
      defaultMessage: '2. Select {connectPipeline}',
      description: `
    The second step to connect pipelines.
    {connectPipeline} will match 'jsm.gettingStartedPanel.connectPipeline' - The Connect Pipeline button in Change management settings.
    `,
    },
    connectPipelineStep3: {
      id: 'jsm.gettingStartedPanel.connectPipelineStep3',
      defaultMessage: '3. Follow the steps provided',
      description: 'The third step to connect pipelines',
    },
    connectPipelineLearnMore: {
      id: 'jsm.gettingStartedPanel.connectPipelineLearnMore',
      defaultMessage: 'Learn more about connecting your pipeline',
      description: 'Button to learn more about connecting pipelines',
    },
  }),
};
