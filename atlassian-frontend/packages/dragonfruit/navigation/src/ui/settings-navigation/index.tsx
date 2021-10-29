import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Link, useRouter } from 'react-resource-router';

import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import {
  CustomItem,
  Header,
  HeadingItem,
  NavigationContent,
  NavigationHeader,
  Section,
  SideNavigation,
} from '@atlaskit/side-navigation';
import { routes } from '@atlassian/dragonfruit-routes';

import messages from './messages';
import { HeadingTextWrapper } from './styled';

export const SettingsNavigation = injectIntl((props: InjectedIntlProps) => {
  const {
    intl: { formatMessage },
  } = props;

  const [{ match }] = useRouter();

  const isAppsSelected = match.path.includes(routes.APPS());
  const isScorecardsSelected = match.path.includes(routes.SCORECARD_LIST());

  // Navigation Items

  const Scorecards = (
    <CustomItem
      component={Link}
      href={routes.SCORECARD_LIST()}
      isSelected={isScorecardsSelected}
      testId="dragonfruit-navigations.ui.settings-navigation.scorecards"
    >
      {formatMessage(messages.settingsNavigationScorecards)}
    </CustomItem>
  );

  const Apps = (
    <CustomItem
      component={Link}
      href={routes.APPS()}
      isSelected={isAppsSelected}
      testId="dragonfruit-navigations.ui.settings-navigation.manage-apps"
      iconAfter={
        <ShortcutIcon
          label={'Apps Link'}
          size={'small'}
          testId={
            'dragonfruit-navigations.ui.settings-navigation.apps-link-icon'
          }
        />
      }
    >
      {formatMessage(messages.settingsNavigationManageApps)}
    </CustomItem>
  );

  return (
    <SideNavigation
      label="project"
      testId="dragonfruit-navigations.ui.settings-navigation"
    >
      <NavigationHeader>
        <Header>{formatMessage(messages.settingsNavigationHeader)}</Header>
      </NavigationHeader>
      <NavigationContent>
        <Section>
          <HeadingItem>
            <HeadingTextWrapper>
              {formatMessage(messages.settingsNavigationGeneralHeading)}
            </HeadingTextWrapper>
          </HeadingItem>
          {Scorecards}
          {Apps}
        </Section>
      </NavigationContent>
    </SideNavigation>
  );
});
