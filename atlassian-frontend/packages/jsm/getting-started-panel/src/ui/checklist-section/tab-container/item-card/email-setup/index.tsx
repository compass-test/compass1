import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

import messages from './messages';

const actionSubjectIds = {
  emailRequests: 'jsmGettingStartedPanelEmailSetupEmailRequests',
};

const EmailSetupItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const { serviceDeskBaseUrl, projectId, projectKey } = useUrlData();
  const keyElements = {
    projectSettings: (
      <strong>{intl.formatMessage(messages.projectSettings)}</strong>
    ),
    emailRequests: (
      <strong>
        <CrossProductLink
          linkProduct={Product.ServiceDesk}
          url={`${serviceDeskBaseUrl}/servicedesk/admin/${
            projectKey || projectId
          }/email-settings`}
          subjectId={actionSubjectIds.emailRequests}
        >
          {intl.formatMessage(messages.emailRequests)}
        </CrossProductLink>
      </strong>
    ),
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.emailSetupDescription)}
      learnMore={{
        url:
          'https://support.atlassian.com/jira-service-desk-cloud/docs/add-an-email-account/',
        text: intl.formatMessage(messages.emailSetupLearnMore),
        inProductHelpArticleId: '2V3Ky3dtElxkKS2YF0e6ws',
        taskId: TaskId.SetupEmailRequests,
      }}
      instructions={[
        makeInstruction(messages.emailSetupStep1, keyElements),
        makeInstruction(messages.emailSetupStep2, keyElements),
      ]}
    />
  );
};

export const EmailSetupItemCardContent = injectIntl(
  EmailSetupItemCardContentBase,
);
