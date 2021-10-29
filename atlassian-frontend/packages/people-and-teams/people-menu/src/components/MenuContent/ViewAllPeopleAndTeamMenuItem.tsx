import React, { useCallback, useContext } from 'react';

import { FormattedMessage } from 'react-intl';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { LinkItem, Section } from '@atlaskit/menu';

import { PeopleMenuContext } from '../../context/PeopleMenuContext';
import { VOID_FUNC } from '../../utils/constants';
import { isModifiedEvent } from '../../utils/keys';
import { getPeopleDirectoryHomePage } from '../../utils/url';
import { triggerAnalyticsForClickViewDirectory } from '../analytics';
import { messages } from '../i18n';

function ViewAllPeopleAndTeamMenuItemInternal(
  props: WithAnalyticsEventsProps & { hasSeparator: boolean },
) {
  const { createAnalyticsEvent } = props;

  const {
    testId,
    pushRoute = VOID_FUNC,
    onClickViewPeopleDirectoryLink = VOID_FUNC,
    togglePeopleMenu = VOID_FUNC,
    product,
  } = useContext(PeopleMenuContext);

  const href = getPeopleDirectoryHomePage(product);

  const handleClickOnViewPeopleDirectory = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      const isLeftClick = !isModifiedEvent(event);

      triggerAnalyticsForClickViewDirectory(createAnalyticsEvent, isLeftClick);
      onClickViewPeopleDirectoryLink();

      if (isLeftClick) {
        pushRoute(href);
        event.preventDefault();
      }

      togglePeopleMenu(false);
    },
    [
      createAnalyticsEvent,
      href,
      onClickViewPeopleDirectoryLink,
      pushRoute,
      togglePeopleMenu,
    ],
  );

  return (
    <Section hasSeparator={props.hasSeparator}>
      <LinkItem
        href={href}
        onClick={handleClickOnViewPeopleDirectory}
        testId={`${testId}-view-people-directory`}
      >
        <FormattedMessage {...messages.viewAllPeopleAndTeams} />
      </LinkItem>
    </Section>
  );
}

export const ViewAllPeopleAndTeamMenuItem = withAnalyticsEvents()(
  ViewAllPeopleAndTeamMenuItemInternal,
);
