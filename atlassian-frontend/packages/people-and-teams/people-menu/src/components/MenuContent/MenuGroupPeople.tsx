import React, { useCallback, useContext } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import { ButtonItem, LinkItem, Section } from '@atlaskit/menu';
import { SpotlightTarget } from '@atlaskit/onboarding';
import type { User } from '@atlassian/people-teams/types';

import { PeopleMenuContext } from '../../context/PeopleMenuContext';
import { PeopleMenuProps } from '../../types';
import { MAX_PEOPLE_IN_MENU, VOID_FUNC } from '../../utils/constants';
import { isModifiedEvent } from '../../utils/keys';
import { getPeopleProfilePage } from '../../utils/url';
import {
  triggerAnalyticsForClickInvitePeople,
  triggerAnalyticsForClickOnPeople,
  triggerAnalyticsForViewedAddPeopleModal,
} from '../analytics';
import { messages } from '../i18n';

import LoadingSkeletonItem from './LoadingSkeletonItem';
import { ImgIcon } from './utils';

interface PeopleMenuGroupProps {
  users?: User[];
  isLoading?: boolean;
  viralSettingsCohort?: PeopleMenuProps['viralSettingsCohort'];
  invitePeopleDrawerMigrationCohort?: PeopleMenuProps['invitePeopleDrawerMigrationCohort'];
}

export function MenuGroupPeopleInternal(
  props: PeopleMenuGroupProps & InjectedIntlProps & WithAnalyticsEventsProps,
) {
  const {
    users,
    intl,
    createAnalyticsEvent,
    isLoading,
    viralSettingsCohort,
    invitePeopleDrawerMigrationCohort,
  } = props;
  const {
    testId,
    product,
    onClickedItem = VOID_FUNC,
    pushRoute = VOID_FUNC,
    togglePeopleMenu = VOID_FUNC,
    toggleInvitePeopleModal = VOID_FUNC,
    userRole,
  } = useContext(PeopleMenuContext);

  const handleClickOnPeople = useCallback(
    (id: string) => (event: React.MouseEvent | React.KeyboardEvent) => {
      const isLeftClick = !isModifiedEvent(event);

      triggerAnalyticsForClickOnPeople(createAnalyticsEvent, isLeftClick);
      onClickedItem(id, 'people');

      if (isLeftClick) {
        const peopleProfilePage = getPeopleProfilePage(product, id);
        pushRoute(peopleProfilePage);
        event.preventDefault();
      }

      togglePeopleMenu(false);
    },
    [createAnalyticsEvent, onClickedItem, product, pushRoute, togglePeopleMenu],
  );

  const handleClickOnInvitePeople = useCallback(() => {
    triggerAnalyticsForClickInvitePeople(createAnalyticsEvent, {
      product,
    });

    if (invitePeopleDrawerMigrationCohort !== 'variation') {
      triggerAnalyticsForViewedAddPeopleModal(
        createAnalyticsEvent,
        viralSettingsCohort,
        userRole,
        product,
      );
    }

    toggleInvitePeopleModal(true);
    togglePeopleMenu(false);
  }, [
    createAnalyticsEvent,
    product,
    toggleInvitePeopleModal,
    togglePeopleMenu,
    viralSettingsCohort,
    invitePeopleDrawerMigrationCohort,
    userRole,
  ]);

  return (
    <Section
      title={intl.formatMessage(messages.yourCollab)}
      testId={`${testId}-people-section`}
    >
      {isLoading &&
        Array(MAX_PEOPLE_IN_MENU)
          .fill(undefined)
          .map((_, index) => <LoadingSkeletonItem key={`user-${index}`} />)}

      {!isLoading &&
        (users || []).slice(0, MAX_PEOPLE_IN_MENU).map((user: User) => (
          <LinkItem
            key={user.id}
            iconBefore={<ImgIcon src={user.avatarUrl} alt={user.fullName} />}
            testId={`${testId}-people-item`}
            href={getPeopleProfilePage(product, user.id)}
            onClick={handleClickOnPeople(user.id)}
          >
            {user.fullName}
          </LinkItem>
        ))}

      <SpotlightTarget name="nav-people-invite-teammates-new">
        <ButtonItem
          onClick={handleClickOnInvitePeople}
          iconBefore={
            <AddIcon
              size="large"
              label={intl.formatMessage(messages.inviteATeammate)}
            />
          }
          testId={`${testId}-invite-people`}
        >
          <FormattedMessage {...messages.inviteATeammate} />
        </ButtonItem>
      </SpotlightTarget>
    </Section>
  );
}

export const MenuGroupPeople = withAnalyticsEvents()(
  injectIntl(MenuGroupPeopleInternal),
);
