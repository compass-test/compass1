import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

import messages from './messages';

const actionSubjectIds = {
  portalSettings: 'jsmGettingStartedPanelCustomPortalLogoPortalSettings',
};

const CustomizePortalLogoItemCardContentBase = ({
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
    addLogo: <strong>{intl.formatMessage(messages.addLogo)}</strong>,
    uploadAnImage: (
      <strong>{intl.formatMessage(messages.uploadAnImage)}</strong>
    ),
    upload: <strong>{intl.formatMessage(messages.upload)}</strong>,
  };

  return (
    <ItemCardContent
      description={intl.formatMessage(messages.customizePortalLogoDescription)}
      learnMore={{
        url:
          'https://support.atlassian.com/jira-service-desk-cloud/docs/customize-the-look-and-feel-of-your-help-center-and-portal/',
        text: intl.formatMessage(messages.customizePortalLogoLearnMore),
        taskId: TaskId.AddPortalLogo,
      }}
      instructions={[
        makeInstruction(messages.customizePortalLogoStep1, keyElements),
        makeInstruction(messages.customizePortalLogoStep2, keyElements),
        makeInstruction(messages.customizePortalLogoStep3, keyElements),
        makeInstruction(messages.customizePortalLogoStep4, keyElements),
      ]}
    />
  );
};

export const CustomizePortalLogoItemCardContent = injectIntl(
  CustomizePortalLogoItemCardContentBase,
);
