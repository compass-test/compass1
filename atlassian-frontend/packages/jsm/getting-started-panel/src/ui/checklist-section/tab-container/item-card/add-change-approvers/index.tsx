import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

import messages from './messages';

const actionSubjectIds = {
  serviceHub: 'jsmGettingStartedPanelAddChangeApproversServiceRegistry',
};

const AddChangeApproversItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const { serviceDeskBaseUrl, projectId, projectKey } = useUrlData();
  const keyElements = {
    serviceHub: (
      <strong>
        <CrossProductLink
          linkProduct={Product.ServiceDesk}
          url={`${serviceDeskBaseUrl}/jira/servicedesk/projects/${
            projectKey || projectId
          }/services`}
          subjectId={actionSubjectIds.serviceHub}
        >
          {intl.formatMessage(messages.serviceHub)}
        </CrossProductLink>
      </strong>
    ),
    createService: (
      <strong>{intl.formatMessage(messages.createService)}</strong>
    ),
    ellipsis: <strong>{intl.formatMessage(messages.ellipsis)}</strong>,
    editService: <strong>{intl.formatMessage(messages.editService)}</strong>,
    changeApprovers: (
      <strong>{intl.formatMessage(messages.changeApprovers)}</strong>
    ),
    saveService: <strong>{intl.formatMessage(messages.saveService)}</strong>,
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.addChangeApproversDescription)}
      learnMore={{
        url:
          'https://support.atlassian.com/jira-service-desk-cloud/docs/create-a-service-in-your-service-registry/',
        text: intl.formatMessage(messages.addChangeApproversLearnMore),
        inProductHelpArticleId: '2XtrMvH31DKTtIH7ATMzH8',
        taskId: TaskId.AddChangeApprovers,
      }}
      instructions={[
        makeInstruction(messages.addChangeApproversStep1, keyElements),
        makeInstruction(messages.addChangeApproversStep2, keyElements),
        makeInstruction(messages.addChangeApproversStep3, keyElements),
        makeInstruction(messages.addChangeApproversStep4, keyElements),
        makeInstruction(messages.addChangeApproversStep5, keyElements),
      ]}
      noteText={intl.formatMessage(messages.addChangeApproversDescriptionNote)}
    />
  );
};

export const AddChangeApproversItemCardContent = injectIntl(
  AddChangeApproversItemCardContentBase,
);
