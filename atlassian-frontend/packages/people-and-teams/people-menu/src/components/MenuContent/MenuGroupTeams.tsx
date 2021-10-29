import React, { useCallback, useContext } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import { ButtonItem, LinkItem, Section } from '@atlaskit/menu';
import type { Team } from '@atlassian/people-teams/types';

import { PeopleMenuContext } from '../../context/PeopleMenuContext';
import { MAX_TEAMS_IN_MENU, VOID_FUNC } from '../../utils/constants';
import { isModifiedEvent } from '../../utils/keys';
import { getTeamProfilePage } from '../../utils/url';
import {
  triggerAnalyticsForClickCreateNewTeam,
  triggerAnalyticsForClickOnTeam,
} from '../analytics';
import { messages } from '../i18n';

import LoadingSkeletonItem from './LoadingSkeletonItem';
import { ImgIcon } from './utils';

interface PeopleMenuGroupProps {
  teams?: Team[];
  isLoading?: boolean;
  isLoadingPermission?: boolean;
}

export function MenuGroupTeamsInternal(
  props: PeopleMenuGroupProps & InjectedIntlProps & WithAnalyticsEventsProps,
) {
  const {
    teams = [],
    intl,
    createAnalyticsEvent,
    isLoading,
    isLoadingPermission,
  } = props;

  const {
    testId,
    product,
    onClickCreateNewTeam = VOID_FUNC,
    onClickedItem = VOID_FUNC,
    pushRoute = VOID_FUNC,
    togglePeopleMenu = VOID_FUNC,
    toggleTeamCreateDialog = VOID_FUNC,
  } = useContext(PeopleMenuContext);

  const handleClickOnCreateATeam = useCallback(() => {
    triggerAnalyticsForClickCreateNewTeam(createAnalyticsEvent);
    onClickCreateNewTeam();
    togglePeopleMenu(false);
    toggleTeamCreateDialog(true);
  }, [
    createAnalyticsEvent,
    onClickCreateNewTeam,
    togglePeopleMenu,
    toggleTeamCreateDialog,
  ]);

  const handleClickOnTeam = useCallback(
    (id: string) => (event: React.MouseEvent | React.KeyboardEvent) => {
      const isLeftClick = !isModifiedEvent(event);

      triggerAnalyticsForClickOnTeam(createAnalyticsEvent, isLeftClick);
      onClickedItem(id, 'team');

      if (isLeftClick) {
        const teamUrl = getTeamProfilePage(product, id);
        pushRoute(teamUrl);
        event.preventDefault();
      }

      togglePeopleMenu(false);
    },
    [createAnalyticsEvent, onClickedItem, product, pushRoute, togglePeopleMenu],
  );

  return (
    <Section
      title={intl.formatMessage(messages.yourTeams)}
      testId={`${testId}-teams-section`}
    >
      {isLoading &&
        Array(MAX_TEAMS_IN_MENU)
          .fill(undefined)
          .map((_, index) => <LoadingSkeletonItem key={`team-${index}`} />)}

      {!isLoading &&
        teams &&
        teams.slice(0, MAX_TEAMS_IN_MENU).map((team: Team) => (
          <LinkItem
            key={team.id}
            href={getTeamProfilePage(product, team.id)}
            onClick={handleClickOnTeam(team.id)}
            iconBefore={
              <ImgIcon
                src={team.smallAvatarImageUrl || team.smallHeaderImageUrl}
                alt={team.displayName}
              />
            }
            testId={`${testId}-team-item`}
          >
            {team.displayName}
          </LinkItem>
        ))}

      {!isLoadingPermission && (
        <ButtonItem
          onClick={handleClickOnCreateATeam}
          iconBefore={
            <AddIcon
              size="large"
              label={intl.formatMessage(messages.startATeam)}
            />
          }
          testId={`${testId}-create-team`}
        >
          <FormattedMessage {...messages.startATeam} />
        </ButtonItem>
      )}
    </Section>
  );
}

export const MenuGroupTeams = withAnalyticsEvents()(
  injectIntl(MenuGroupTeamsInternal),
);
