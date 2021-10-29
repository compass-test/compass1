import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

import messages from './messages';

const actionSubjectIds = {
  changeManagement: 'jsmGettingStartedPanelConnectPipelineChangeManagement',
};

const ConnectPipelineItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const { serviceDeskBaseUrl, projectId, projectKey } = useUrlData();
  const keyElements = {
    projectSettings: (
      <strong>{intl.formatMessage(messages.projectSettings)}</strong>
    ),
    changeManagement: (
      <strong>
        <CrossProductLink
          linkProduct={Product.ServiceDesk}
          url={`${serviceDeskBaseUrl}/servicedesk/admin/${
            projectKey || projectId
          }/change-management`}
          subjectId={actionSubjectIds.changeManagement}
        >
          {intl.formatMessage(messages.changeManagement)}
        </CrossProductLink>
      </strong>
    ),
    connectPipeline: (
      <strong>{intl.formatMessage(messages.connectPipeline)}</strong>
    ),
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.connectPipelineDescription)}
      learnMore={{
        url:
          'https://support.atlassian.com/jira-service-desk-cloud/docs/set-up-change-management-for-your-service-desk/',
        text: intl.formatMessage(messages.connectPipelineLearnMore),
        inProductHelpArticleId: '2d50COIWtbYfaDPPJoMBZn',
        taskId: TaskId.ConnectCiCdPipeline,
      }}
      instructions={[
        makeInstruction(messages.connectPipelineStep1, keyElements),
        makeInstruction(messages.connectPipelineStep2, keyElements),
        makeInstruction(messages.connectPipelineStep3, keyElements),
      ]}
    />
  );
};

export const ConnectPipelineItemCardContent = injectIntl(
  ConnectPipelineItemCardContentBase,
);
