import React, { useState } from 'react';

import { FormattedHTMLMessage } from 'react-intl';

import Lozenge from '@atlaskit/lozenge';
import PageHeader from '@atlaskit/page-header';
import { Content, Main } from '@atlaskit/page-layout';
import SectionMessage from '@atlaskit/section-message';
import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import { DisplayFeedback } from '@atlassian/dragonfruit-components';
import { SubmitPageLoadMetrics } from '@atlassian/dragonfruit-performance';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { AppsPageLoad } from '../../utils/performance-analytics';

import AppList from './app-list';
import ComingSoonList from './coming-soon-list';
import messages from './messages';
import {
  AppListContainer,
  Byline,
  ClickableContainer,
  HelpText,
  LozengeContainer,
} from './styled';

const DEVELOP_APPS_DAC_LINK = 'https://go.atlassian.com/compass-developer';

export default function Apps() {
  const { formatMessage } = useIntl();
  const { isAdmin: isAdministrator } = useTenantInfo();
  const isAdmin = isAdministrator();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <Content testId="dragonfruit-page-apps.ui.content">
      {isFeedbackModalOpen && (
        <DisplayFeedback onClose={() => setIsFeedbackModalOpen(false)} />
      )}
      <Main
        testId="dragonfruit-page-apps.ui.main"
        id="main"
        skipLinkTitle={formatMessage(messages.mainSkipLinkTitle)}
      >
        <MainContainer>
          <PageHeader>{formatMessage(messages.appManagementHeader)}</PageHeader>

          <Byline>
            {isAdmin ? (
              formatMessage(messages.appManagementByLine)
            ) : (
              <SectionMessage
                title={formatMessage(
                  messages.appManagementAdminRestrictionHeader,
                )}
                testId="dragonfruit-page-apps.ui.app-management.not-admin-msg"
              >
                {formatMessage(messages.appManagementAdminRestrictionBody)}
              </SectionMessage>
            )}
          </Byline>

          <AppListContainer>
            <AppList />
          </AppListContainer>

          <LozengeContainer>
            <Lozenge appearance="new">
              {formatMessage(messages.comingSoon)}
            </Lozenge>
          </LozengeContainer>

          <ComingSoonList />
          <HelpText>
            <FormattedHTMLMessage {...messages.appManagementHelp} />
            <ClickableContainer>
              <a onClick={() => setIsFeedbackModalOpen(true)}>
                {formatMessage(messages.appManagementHelpFeedbackLink)}
              </a>
            </ClickableContainer>
            <FormattedHTMLMessage
              {...messages.appManagementHelpBuildCustomApp}
              values={{
                forgeLink: DEVELOP_APPS_DAC_LINK,
              }}
            />
          </HelpText>
        </MainContainer>
      </Main>
      <SubmitPageLoadMetrics metric={AppsPageLoad} />
    </Content>
  );
}
