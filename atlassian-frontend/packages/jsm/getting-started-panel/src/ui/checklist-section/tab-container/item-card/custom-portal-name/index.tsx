import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

import messages from './messages';

const actionSubjectIds = {
  portalSettings: 'jsmGettingStartedPanelCustomPortalNamePortalSettings',
};

const CustomizePortalNameItemCardContentBase = ({
  intl,
}: InjectedIntlProps) => {
  const { serviceDeskBaseUrl, projectId, projectKey } = useUrlData();
  const keyElements = {
    portalSettings: (
      <strong>
        <CrossProductLink
          linkProduct={Product.ServiceDesk}
          url={`${serviceDeskBaseUrl}/servicedesk/admin/${
            projectKey || projectId
          }/portal-settings`}
          subjectId={actionSubjectIds.portalSettings}
        >
          {intl.formatMessage(messages.portalSettings)}
        </CrossProductLink>
      </strong>
    ),
    projectSettings: (
      <strong>{intl.formatMessage(messages.projectSettings)}</strong>
    ),
    serviceProjectInformation: (
      <strong>{intl.formatMessage(messages.serviceProjectInformation)}</strong>
    ),
    namePortal: <strong>{intl.formatMessage(messages.namePortal)}</strong>,
    savePortal: <strong>{intl.formatMessage(messages.savePortal)}</strong>,
  };

  return (
    <ItemCardContent
      description={intl.formatMessage(messages.customizePortalNameDescription)}
      learnMore={{
        url:
          'https://support.atlassian.com/jira-service-desk-cloud/docs/customize-the-look-and-feel-of-your-help-center-and-portal/',
        text: intl.formatMessage(messages.customizePortalNameLearnMore),
        taskId: TaskId.CustomizePortal,
      }}
      instructions={[
        makeInstruction(messages.customizePortalNameStep1, keyElements),
        makeInstruction(messages.customizePortalNameStep2, keyElements),
        makeInstruction(messages.customizePortalNameStep3, keyElements),
      ]}
    />
  );
};

export const CustomizePortalNameItemCardContent = injectIntl(
  CustomizePortalNameItemCardContentBase,
);
