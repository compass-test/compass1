import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';

import messages from './messages';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

const actionSubjectIds = {
  serviceHub: 'jsmGettingStartedPanelSetupServicesServiceRegistry',
};

const SetupServicesItemCardContentBase = ({ intl }: InjectedIntlProps) => {
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
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.setupServicesDescription)}
      learnMore={{
        url:
          'https://support.atlassian.com/jira-service-desk-cloud/docs/manage-your-service-registry/',
        text: intl.formatMessage(messages.setupServicesLearnMore),
        inProductHelpArticleId: '3osolPEuol1YCaO4FthXUl',
        taskId: TaskId.SetupServices,
      }}
      instructions={[
        makeInstruction(messages.setupServicesStep1, keyElements),
        makeInstruction(messages.setupServicesStep2, keyElements),
      ]}
    />
  );
};

export const SetupServicesItemCardContent = injectIntl(
  SetupServicesItemCardContentBase,
);
