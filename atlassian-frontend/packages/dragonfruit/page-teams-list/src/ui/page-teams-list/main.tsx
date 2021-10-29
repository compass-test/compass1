import React, { useState } from 'react';

import debounce from 'lodash/debounce';
import { useRouterActions } from 'react-resource-router';

import Breadcrumbs from '@atlaskit/breadcrumbs';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button/button-group';
import { useFlags } from '@atlaskit/flag';
import { ModalBody, ModalTransition } from '@atlaskit/modal-dialog';
import ModalDialog from '@atlaskit/modal-dialog/modal-dialog';
import PageHeader from '@atlaskit/page-header';
import { Content, Main } from '@atlaskit/page-layout';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BreadcrumbsLink,
  MainContainer,
  useModalControls,
} from '@atlassian/dragonfruit-common-ui';
import {
  TeamCreateDialog,
  useAddFlag,
} from '@atlassian/dragonfruit-people-teams';
import { routes } from '@atlassian/dragonfruit-routes';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';
import InvitePeople from '@atlassian/invite-people';

import messages from './messages';
import { SearchFiltering } from './search-filtering';
import { ContentWrapper } from './styled';
import { TeamsList } from './teams-list';
import { PageTeamsListProps } from './types';

export default function PageTeamsList({ testId }: PageTeamsListProps) {
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();
  const { addFlag } = useAddFlag();
  const { cloudId, accountId, orgId } = useTenantInfo();
  const { push } = useRouterActions();

  const dataTestId = testId || 'dragonfruit-page-teams-list.ui';
  const [yourTeamsEnabled, setYourTeamsEnabled] = useState<boolean>(false);
  const [
    { isOpen: inviteVisible },
    { open: openInvite, close: closeInvite },
  ] = useModalControls();

  const [
    { isOpen: startTeamVisible },
    { open: openStartTeam, close: closeStartTeam },
  ] = useModalControls();

  const [searchText, setSearchText] = useState<string>('');

  const DEBOUNCE_TIMER = 300;

  const debouncedSetSearchText = debounce((value: string) => {
    setSearchText(value);
  }, DEBOUNCE_TIMER);

  const actionsContent = (
    <ButtonGroup>
      <Button
        testId={`${dataTestId}.header.invite-compass-button`}
        onClick={openInvite}
      >
        {formatMessage(messages.inviteToCompass)}
      </Button>
      <Button
        testId={`${dataTestId}.header.start-team-button`}
        appearance="primary"
        onClick={openStartTeam}
      >
        {formatMessage(messages.createTeam)}
      </Button>
    </ButtonGroup>
  );

  const continueUrl = `${window.location.protocol}//${
    window.location.host
  }${routes.TEAMS()}`;
  const resourceAri = `ari:cloud:compass::site/${cloudId}`;

  const toggleYourTeamsEnabled = () => {
    setYourTeamsEnabled(curr => !curr);
    setSearchText('');
  };
  const bottomBar = (
    <SearchFiltering
      yourTeamsEnabled={yourTeamsEnabled}
      toggleYourTeamsEnabled={toggleYourTeamsEnabled}
      setSearchText={debouncedSetSearchText}
    />
  );

  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbsLink
        href={routes.TEAMS()}
        text={formatMessage(CommonMessages.teams)}
      />
    </Breadcrumbs>
  );

  return (
    <>
      <Content testId={`${dataTestId}.content`}>
        <ContentWrapper>
          <Main>
            <MainContainer data-testid={testId}>
              <PageHeader
                actions={actionsContent}
                bottomBar={bottomBar}
                breadcrumbs={breadcrumbs}
              >
                {formatMessage(CommonMessages.teams)}
              </PageHeader>
              <TeamsList
                testId={`${dataTestId}.teams-list`}
                yourTeamsEnabled={yourTeamsEnabled}
                searchText={searchText}
              />
            </MainContainer>
          </Main>
        </ContentWrapper>
      </Content>
      <ModalTransition>
        {inviteVisible && (
          <ModalDialog
            width="small"
            onClose={closeInvite}
            testId={`${dataTestId}.teams-list.invite-people-modal`}
          >
            <ModalBody>
              <InvitePeople
                allowAddMoreFields={true}
                defaultNumberOfInputs={3}
                maxNumberOfInputs={10}
                onSendHandler={closeInvite}
                onCancelHandler={closeInvite}
                continueUrl={continueUrl}
                resourceAri={resourceAri}
                showFlag={showFlag}
              />
            </ModalBody>
          </ModalDialog>
        )}
      </ModalTransition>
      {startTeamVisible && (
        <TeamCreateDialog
          principalId={accountId}
          cloudId={cloudId}
          orgId={orgId}
          product="compass"
          onClose={closeStartTeam}
          addFlag={addFlag}
          pushRoute={push}
        />
      )}
    </>
  );
}
