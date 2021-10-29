import React, { useState } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import { di } from 'react-magnetic-di';

import Button from '@atlaskit/button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { Content, Main, RightSidebar } from '@atlaskit/page-layout';
import {
  FocusState,
  MainContainer,
  RightSidebarContainer,
} from '@atlassian/dragonfruit-common-ui';
import {
  RecentComponentsProvider,
  useRecentComponents,
} from '@atlassian/dragonfruit-component-create-modal';
import { useUpdateComponentOwner } from '@atlassian/dragonfruit-graphql';
import {
  DeleteTeamCheckinModal,
  PastTeamCheckins,
  RecentTeamCheckin,
  TeamCheckinCreateForm,
  TeamCheckinEditForm,
  TeamCheckinsSectionMessage,
} from '@atlassian/dragonfruit-team-checkins';
import { TeamHeader, TeamMemberCard } from '@atlassian/dragonfruit-teams';
import {
  buildAtlassianTeamProfileURL,
  buildTeamAri,
  openInNewTab,
} from '@atlassian/dragonfruit-utils';

import { useTeamCheckinsController } from '../../controllers/use-team-checkins-controller';

import { ComponentsList } from './components-list';
import { useTeamDashboardFlags } from './flags';
import messages from './messages';
import {
  EditProfileWrapper,
  SectionTitle,
  TeamSection,
  TopSection,
} from './styled';
import { TeamComponentPickerModal } from './team-component-picker-modal';

type TeamDashboardProps = {
  teamId: string;
};

const TeamDashboardInternal = (
  props: TeamDashboardProps & InjectedIntlProps,
) => {
  di(TeamHeader, TeamMemberCard);
  const { teamId, intl } = props;
  const { formatMessage } = intl;
  const ownerAri = buildTeamAri({ teamId });

  const {
    showCopyOwnerAriFailureFlag,
    showCopyOwnerAriSuccessFlag,
    showUpdateOwnerFailureFlag,
    showUpdateOwnerSuccessFlag,
  } = useTeamDashboardFlags();

  const [isComponentPickerModalOpen, setIsComponentPickerModalOpen] = useState(
    false,
  );
  const [updateOwnerMutation] = useUpdateComponentOwner();
  const [, { addComponent }] = useRecentComponents();

  const teamSitePage = buildAtlassianTeamProfileURL(teamId);

  const teamProfile = () => openInNewTab(teamSitePage);
  const openComponentPickerModal = () => setIsComponentPickerModalOpen(true);
  const closeComponentPickerModal = () => setIsComponentPickerModalOpen(false);
  const copyAri = () => {
    navigator.clipboard
      .writeText(ownerAri)
      .then(function () {
        showCopyOwnerAriSuccessFlag(ownerAri);
      })
      .catch(function () {
        showCopyOwnerAriFailureFlag();
      });
  };

  const {
    teamAri,

    showBanner: showTeamCheckinBanner,
    closeBanner: closeTeamCheckinBanner,

    showRecentTeamCheckin,
    recentTeamCheckin,

    showPastTeamCheckins,
    pastTeamCheckins,

    showCreateButton: showTeamCheckinCreateButton,

    onCreate: onTeamCheckinCreate, // Opens the team checkin create overlay.
    showCreateModal: showTeamCheckinCreateModal,
    closeCreateModal: closeTeamCheckinCreateModal,

    onEdit: onTeamCheckinEdit, // Opens the team checkin edit overlay.
    showEditModal: showTeamCheckinEditModal,
    closeEditModal: closeTeamCheckinEditModal,
    teamCheckinEditFormData,

    showDeleteModal: showTeamCheckinDeleteModal,
    closeDeleteModal: closeTeamCheckinDeleteModal,
    onDelete: onTeamCheckinDelete,
    teamCheckinIdToBeDeleted,
  } = useTeamCheckinsController(teamId);

  const EditProfileButton = () => (
    <Button
      onClick={teamProfile}
      iconAfter={<ShortcutIcon label="" size="small" />}
      testId="dragonfruit-page-team-details.ui.content.edit-profile-button"
    >
      {formatMessage(messages.editTeamProfile)}
    </Button>
  );

  const TeamDropdownMenu = () => (
    <DropdownMenu
      triggerButtonProps={{
        iconBefore: <MoreIcon label="more" />,
        shouldFitContainer: true,
      }}
      triggerType="button"
      position="bottom right"
      testId={'dragonfruit-page-team-details.ui.dropdown-menu'}
    >
      <DropdownItemGroup>
        <DropdownItem
          data-testid={
            'dragonfruit-page-team-details.ui.dropdown-menu-item.add-component'
          }
          onClick={openComponentPickerModal}
        >
          {formatMessage(messages.addComponent)}
        </DropdownItem>
        <DropdownItem
          onClick={copyAri}
          isCompact
          data-testid={
            'dragonfruit-page-team-details.ui.dropdown-menu-item.copy-owner-ari'
          }
        >
          {formatMessage(messages.copyOwnerAri)}
        </DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );

  return (
    <>
      {isComponentPickerModalOpen && (
        <TeamComponentPickerModal
          onFormSubmit={async (
            componentId,
            componentName,
            componentType,
            description,
          ) => {
            const input = {
              id: componentId,
              ownerId: ownerAri,
            };
            const mutationResult = await updateOwnerMutation(input);
            if (mutationResult.errors) {
              showUpdateOwnerFailureFlag();
            } else {
              addComponent({
                id: componentId,
                name: componentName,
                type: componentType,
                description: description,
              });
              showUpdateOwnerSuccessFlag(
                componentId,
                componentName,
                componentType,
              );
            }
            closeComponentPickerModal();
          }}
          ownerId={ownerAri}
          onClose={closeComponentPickerModal}
        />
      )}

      <Content testId="dragonfruit-page-team-details.ui.content">
        <Main
          testId="dragonfruit-page-team-details.ui.main"
          id="main"
          skipLinkTitle={formatMessage(messages.mainSkipLinkTitle)}
        >
          <MainContainer>
            <TopSection>
              <TeamSection>
                <TeamHeader teamId={teamId} />
              </TeamSection>
              {showTeamCheckinCreateButton && (
                <Button
                  appearance="primary"
                  onClick={onTeamCheckinCreate}
                  testId="dragonfruit-page-team-details.ui.content.team-checkin-button"
                >
                  {formatMessage(messages.teamCheckin)}
                </Button>
              )}
              <EditProfileWrapper>
                <EditProfileButton />
              </EditProfileWrapper>
              <TeamDropdownMenu />
            </TopSection>

            {showTeamCheckinBanner && (
              <TeamCheckinsSectionMessage
                onDismiss={closeTeamCheckinBanner}
                onCheckin={onTeamCheckinCreate}
              />
            )}

            {showRecentTeamCheckin && (
              <RecentTeamCheckin
                teamCheckin={recentTeamCheckin}
                onEdit={onTeamCheckinEdit}
                onDelete={onTeamCheckinDelete}
              />
            )}

            <SectionTitle>
              {formatMessage(messages.ownedComponentsSection)}
            </SectionTitle>
            <ComponentsList teamId={teamId} />

            {showPastTeamCheckins && (
              <PastTeamCheckins
                teamCheckins={pastTeamCheckins}
                onEdit={onTeamCheckinEdit}
                onDelete={onTeamCheckinDelete}
              />
            )}
          </MainContainer>
        </Main>

        <RightSidebar
          testId="dragonfruit-page-team-details.ui.right-sidebar"
          id="right-sidebar"
          width={280}
          skipLinkTitle={formatMessage(messages.rightSidebarSkipLinkTitle)}
        >
          <RightSidebarContainer>
            <TeamMemberCard teamId={teamId} />
          </RightSidebarContainer>
        </RightSidebar>
      </Content>

      {showTeamCheckinCreateModal && (
        <FocusState isOpen onClose={closeTeamCheckinCreateModal}>
          <TeamCheckinCreateForm
            teamId={teamAri}
            onCancel={closeTeamCheckinCreateModal}
            onSuccess={closeTeamCheckinCreateModal}
          />
        </FocusState>
      )}

      {showTeamCheckinEditModal && (
        <FocusState isOpen onClose={closeTeamCheckinEditModal}>
          <TeamCheckinEditForm
            teamCheckin={teamCheckinEditFormData!}
            onCancel={closeTeamCheckinEditModal}
            onSuccess={closeTeamCheckinEditModal}
          />
        </FocusState>
      )}

      {showTeamCheckinDeleteModal && (
        <DeleteTeamCheckinModal
          teamCheckinId={teamCheckinIdToBeDeleted}
          onCancel={closeTeamCheckinDeleteModal}
          onSuccess={closeTeamCheckinDeleteModal}
          onFailure={closeTeamCheckinDeleteModal}
        />
      )}
    </>
  );
};

export const TeamDashboard = injectIntl(
  (props: TeamDashboardProps & InjectedIntlProps) => {
    return (
      <RecentComponentsProvider>
        <TeamDashboardInternal {...props} />
      </RecentComponentsProvider>
    );
  },
);
