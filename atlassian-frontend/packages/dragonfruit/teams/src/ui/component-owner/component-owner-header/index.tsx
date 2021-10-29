import React from 'react';

import { di } from 'react-magnetic-di';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { SkeletonItem } from '@atlaskit/menu';
import { gridSize } from '@atlaskit/theme/constants';
import Tooltip from '@atlaskit/tooltip';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { Card } from '@atlassian/dragonfruit-common-ui';
import { CompassComponentDataManager } from '@atlassian/dragonfruit-graphql';
import { useTeamService } from '@atlassian/dragonfruit-rest';
import { routes } from '@atlassian/dragonfruit-routes';
import { openInNewTab, useIntl } from '@atlassian/dragonfruit-utils';

import DeleteOwnerModal from '../../../common/ui/delete-owner-modal';
import teamCommonMessages from '../../../common/ui/messages';
import TeamAvatarGroup from '../../../common/ui/team-avatar-group';
import { TeamsCardError } from '../../../common/ui/teams-cards-error';
import UpdateOwnerModal from '../../../common/ui/update-owner-modal';
import { useDeleteModalController } from '../../../controllers/delete-modal-controller';
import { useUpdateModalController } from '../../../controllers/update-modal-controller';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import ComponentOwnerEmptyState from '../empty-state';

import messages from './messages';
import {
  ActionsWrapper,
  BottomBarWrapper,
  ContainerBody,
  Error,
  Heading,
  Outer,
  StyledLink,
  SubHeading,
  TitleContainer,
  TitleWrapper,
} from './styled';

interface TeamHeaderProps {
  teamId: string;
  link?: boolean;
  componentId: string;
  dataManager?: CompassComponentDataManager;
}

const teamNameSkeletonCssFn = (currentStyles: any) => ({
  ...currentStyles,
  minHeight: `${gridSize() * 3.5}px`,
  width: '250px',
  paddingLeft: '0px',
  '&&::after': {
    // To align with the baseline text
    marginBottom: '-6px',
  },
});

function ComponentOwnerHeader(props: TeamHeaderProps) {
  const { teamId, link = false, componentId, dataManager } = props;
  const { formatMessage } = useIntl();

  const [
    { isEditModalOpen },
    { openEditModal, closeEditModal, updateOwner },
  ] = useUpdateModalController();

  const [
    { isDeleteModalOpen },
    { openDeleteModal, closeDeleteModal, deleteOwner },
  ] = useDeleteModalController();

  di(TeamAvatarGroup);
  di(useTeamService);

  const { data: team, error } = useTeamService(teamId);

  const ErrorContent = (statusCode: number) => {
    switch (statusCode) {
      case 404:
        return (
          <Card data-testid="dragonfruit.teams.component-owner-card">
            <ComponentOwnerEmptyState
              componentId={componentId}
              dataManager={dataManager}
            />
          </Card>
        );

      case 410:
        return (
          <Card data-testid="dragonfruit.teams.component-owner-card">
            <ComponentOwnerEmptyState
              componentId={componentId}
              dataManager={dataManager}
            />
          </Card>
        );

      case 403:
        return (
          <TeamsCardError
            description={formatMessage(
              teamCommonMessages.errorLoadingOrgPermissions,
            )}
          />
        );

      default:
        return (
          <Card data-testid="dragonfruit.teams.component-owner-card">
            <Error>
              <ErrorIcon label={formatMessage(messages.errorLoading)} />
              <span>{formatMessage(messages.errorLoading)}</span>
            </Error>
          </Card>
        );
    }
  };

  const renderDefaultDropdownItems = () => (
    <DropdownItemGroup>
      <DropdownItem onClick={openEditModal}>
        {formatMessage(messages.editOwner)}
      </DropdownItem>
      <DropdownItem onClick={openDeleteModal}>
        {formatMessage(messages.removeOwner)}
      </DropdownItem>
    </DropdownItemGroup>
  );

  const renderDropdownItemsWhenManaged = () => (
    <DropdownItemGroup>
      <DropdownItem
        onClick={() => openInNewTab(dataManager!.externalSourceURL)}
      >
        {formatMessage(messages.editOwnerWithConfigAsCode)}
      </DropdownItem>
    </DropdownItemGroup>
  );

  return (
    <>
      <Card data-testid="dragonfruit.teams.component-owner-card">
        <ContainerBody>
          {!team && !error && (
            <SkeletonItem isShimmering cssFn={teamNameSkeletonCssFn} />
          )}

          {isEditModalOpen && (
            <UpdateOwnerModal
              onCancel={closeEditModal}
              updateOwner={updateOwner}
              defaultValues={team}
              isEditModal={true}
              componentId={componentId}
            />
          )}

          {isDeleteModalOpen && (
            <DeleteOwnerModal
              updateOwner={deleteOwner}
              onCancel={closeDeleteModal}
              componentId={componentId}
            />
          )}

          {team && (
            <Outer data-test-id="dragonfruit-teams.ui.component-owner-card.header">
              <TitleWrapper>
                <TitleContainer>
                  <Heading>
                    {link && (
                      <StyledLink href={routes.TEAM_DETAILS(teamId)}>
                        {team.displayName}
                      </StyledLink>
                    )}
                    {!link && team.displayName}
                    <ActionsWrapper
                      data-testid={`dragonfruit-teams.ui.component-owner-card.actions-wrapper-${teamId}`}
                    >
                      <Tooltip
                        content={formatMessage(messages.actionsTooltip)}
                        hideTooltipOnClick={true}
                      >
                        <DropdownMenu
                          triggerType="button"
                          triggerButtonProps={{
                            appearance: 'subtle',
                            iconBefore: (
                              <MoreIcon
                                label={formatMessage(messages.actionsLabel)}
                                size="medium"
                              />
                            ),
                            spacing: 'compact',
                          }}
                          position="bottom right"
                          data-test-id={`dragonfruit-teams.ui.component-owner-card.dropdown-actions-${teamId}`}
                        >
                          {dataManager
                            ? renderDropdownItemsWhenManaged()
                            : renderDefaultDropdownItems()}
                        </DropdownMenu>
                      </Tooltip>
                    </ActionsWrapper>
                  </Heading>
                  <SubHeading>
                    {formatMessage(CommonMessages.ownerTeam)}
                  </SubHeading>
                </TitleContainer>
              </TitleWrapper>
              <BottomBarWrapper>
                {' '}
                <TeamAvatarGroup teamId={props.teamId} />{' '}
              </BottomBarWrapper>
            </Outer>
          )}
        </ContainerBody>
      </Card>
      {error && ErrorContent(error.statusCode)}
    </>
  );
}

export default ComponentOwnerHeader;
