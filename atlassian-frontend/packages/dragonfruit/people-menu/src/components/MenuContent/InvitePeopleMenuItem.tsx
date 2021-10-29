import React, { useContext } from 'react';

import { FormattedMessage } from 'react-intl';
import { useRouterActions } from 'react-resource-router';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { ButtonItem, LinkItem, Section } from '@atlaskit/menu';
import {
  UI_TEAMS_LIST_PAGE,
  UI_TEAMS_LIST_PAGE_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';
import { routes } from '@atlassian/dragonfruit-routes';

import { PeopleMenuContext } from '../../context/PeopleMenuContext';
import { capitaliseFirstLetter } from '../../utils/capitaliseFirstLetter';
import { VOID_FUNC } from '../../utils/constants';
import {
  triggerAnalyticsForClickInvitePeople,
  triggerAnalyticsForViewedAddPeopleModal,
} from '../analytics';
import { messages } from '../i18n';

function InvitePeopleMenuItemInternal(props: WithAnalyticsEventsProps) {
  const { createAnalyticsEvent } = props;
  const {
    product,
    testId,
    togglePeopleMenu = VOID_FUNC,
    toggleInvitePeopleModal = VOID_FUNC,
    userRole,
  } = useContext(PeopleMenuContext);

  const { value: teamsListPageEnabled } = useFeatureFlag<boolean>(
    UI_TEAMS_LIST_PAGE,
    UI_TEAMS_LIST_PAGE_DEFAULT_VALUE,
  );
  const { push } = useRouterActions();

  const handleClickOnInvitePeople = () => {
    triggerAnalyticsForClickInvitePeople(createAnalyticsEvent, {
      product,
    });
    triggerAnalyticsForViewedAddPeopleModal(
      createAnalyticsEvent,
      userRole,
      product,
    );
    toggleInvitePeopleModal(true);
    togglePeopleMenu(false);
  };

  const handleClickOnViewAllTeams = () => {
    push(routes.TEAMS());
    togglePeopleMenu(false);
  };

  return (
    <Section hasSeparator>
      {teamsListPageEnabled && (
        <LinkItem
          onClick={handleClickOnViewAllTeams}
          testId={`${testId}-team-list`}
        >
          <FormattedMessage {...messages.viewAllTeams} />
        </LinkItem>
      )}
      <ButtonItem
        onClick={handleClickOnInvitePeople}
        testId={`${testId}-invite-people`}
      >
        <FormattedMessage
          {...messages.invitePeople}
          values={{ product: capitaliseFirstLetter(product) }}
        />
      </ButtonItem>
    </Section>
  );
}

export const InvitePeopleMenuItem = withAnalyticsEvents()(
  InvitePeopleMenuItemInternal,
);
