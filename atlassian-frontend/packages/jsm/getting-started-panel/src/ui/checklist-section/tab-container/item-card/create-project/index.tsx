import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { TaskId } from '../../../../../common/types';

import messages from './messages';

const CreateProjectItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const keyElements = {
    projects: <strong>{intl.formatMessage(messages.projects)}</strong>,
    createProject: (
      <strong>{intl.formatMessage(messages.createProject)}</strong>
    ),
    changeTemplate: (
      <strong>{intl.formatMessage(messages.changeTemplate)}</strong>
    ),
    create: <strong>{intl.formatMessage(messages.create)}</strong>,
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.createProjectDescription)}
      learnMore={{
        url:
          'https://support.atlassian.com/jira-service-desk-cloud/docs/create-a-service-desk-project-using-the-it-service-desk-template/',
        text: intl.formatMessage(messages.createProjectLearnMore),
        inProductHelpArticleId: '245e0LWFwCLJ1M4OnarxVV',
        taskId: TaskId.CreateItsmProject,
      }}
      instructions={[
        makeInstruction(messages.createProjectStep1, keyElements),
        makeInstruction(messages.createProjectStep2, keyElements),
        makeInstruction(messages.createProjectStep3, keyElements),
        makeInstruction(messages.createProjectStep4, keyElements),
        makeInstruction(messages.createProjectStep5, keyElements),
      ]}
    />
  );
};

export const CreateProjectItemCardContent = injectIntl(
  CreateProjectItemCardContentBase,
);
