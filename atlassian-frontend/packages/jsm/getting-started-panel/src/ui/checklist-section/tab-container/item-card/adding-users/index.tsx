import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

import messages from './messages';

const actionSubjectIds = {
  peoplePage: 'jsmGettingStartedPanelAddingUsersPeoplePage',
};

const AddingUsersItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const { serviceDeskBaseUrl, projectId, projectKey } = useUrlData();
  const keyElements = {
    projectSettings: (
      <strong>{intl.formatMessage(messages.projectSettings)}</strong>
    ),
    people: (
      <strong>
        <CrossProductLink
          linkProduct={Product.ServiceDesk}
          url={`${serviceDeskBaseUrl}/plugins/servlet/project-config/${
            projectKey || projectId
          }/people`}
          subjectId={actionSubjectIds.peoplePage}
        >
          {intl.formatMessage(messages.people)}
        </CrossProductLink>
      </strong>
    ),
    add: <strong>{intl.formatMessage(messages.add)}</strong>,
    addPeople: <strong>{intl.formatMessage(messages.addPeople)}</strong>,
  };

  return (
    <ItemCardContent
      description={intl.formatMessage(messages.addingUsersDescription)}
      learnMore={{
        url:
          'https://support.atlassian.com/jira-service-desk-cloud/docs/overview-of-jira-cloud-permissions/',
        text: intl.formatMessage(messages.addingUsersLearnMore),
        inProductHelpArticleId: '3REGXAeAx3gVRhqSwGcRmp',
        taskId: TaskId.AddTeamMember,
      }}
      instructions={[
        makeInstruction(messages.addingUsersStep1, keyElements),
        makeInstruction(messages.addingUsersStep2, keyElements),
        makeInstruction(messages.addingUsersStep3, keyElements),
        makeInstruction(messages.addingUsersStep4, keyElements),
        makeInstruction(messages.addingUsersStep5, keyElements),
        makeInstruction(messages.addingUsersStep6, keyElements),
      ]}
    />
  );
};

export const AddingUsersItemCardContent = injectIntl(
  AddingUsersItemCardContentBase,
);
